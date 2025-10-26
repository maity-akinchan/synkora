"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ThemeToggle } from "@/components/ui/theme";
function ThemeSelect(){ return <ThemeToggle /> }

function toCSV(data: string[][]) {
  return data.map(r => r.map(c => `"${(c ?? "").replaceAll('"', '""')}"`).join(",")).join("\n");
}

function fromCSV(csv: string): string[][] {
  // Very simple CSV parser (no multiline support)
  return csv.split(/\r?\n/).filter(Boolean).map(line => {
    const out: string[] = [];
    let cur = '';
    let inQ = false;
    for (let i=0;i<line.length;i++) {
      const ch = line[i];
      if (inQ) {
        if (ch === '"' && line[i+1] === '"') { cur += '"'; i++; }
        else if (ch === '"') { inQ = false; }
        else cur += ch;
      } else {
        if (ch === '"') inQ = true;
        else if (ch === ',') { out.push(cur); cur = ''; }
        else cur += ch;
      }
    }
    out.push(cur);
    return out;
  });
}

function colLabel(idx: number) {
  // A, B, ... Z, AA, AB...
  let s = '';
  idx++;
  while (idx > 0) {
    const rem = (idx - 1) % 26;
    s = String.fromCharCode(65 + rem) + s;
    idx = Math.floor((idx - 1) / 26);
  }
  return s;
}

function parseRef(ref: string) {
  // A1 -> {col,row}
  const m = ref.match(/([A-Z]+)(\d+)/i);
  if (!m) return null;
  const col = m[1].toUpperCase().split('').reduce((acc, ch) => acc*26 + (ch.charCodeAt(0)-64), 0) - 1;
  const row = parseInt(m[2], 10) - 1;
  return { col, row };
}

function evalCell(raw: string, get: (r:number,c:number)=>number|string): number|string {
  if (!raw?.startsWith('=')) return raw ?? '';
  const expr = raw.slice(1).trim();
  // Support: SUM(A1:B3) and simple refs like A1 + B2
  const sumMatch = expr.match(/^SUM\(([^)]+)\)$/i);
  if (sumMatch) {
    const [a,b] = sumMatch[1].split(':').map(s=>s.trim());
    const ra = parseRef(a); const rb = parseRef(b);
    if (!ra || !rb) return '#REF!';
    let s = 0;
    for (let r=Math.min(ra.row, rb.row); r<=Math.max(ra.row, rb.row); r++)
      for (let c=Math.min(ra.col, rb.col); c<=Math.max(ra.col, rb.col); c++) {
        const v = Number(get(r,c));
        if (!isNaN(v)) s += v;
      }
    return s;
  }
  // Simple A1 [+|-|*|/] B2
  const bin = expr.match(/^([A-Z]+\d+)\s*([+\-*/])\s*([A-Z]+\d+)$/i);
  if (bin) {
    const ra = parseRef(bin[1]); const rb = parseRef(bin[3]); const op = bin[2];
    if (!ra || !rb) return '#REF!';
    const a = Number(get(ra.row, ra.col));
    const b = Number(get(rb.row, rb.col));
    if (isNaN(a) || isNaN(b)) return '#NaN';
    switch (op) {
      case '+': return a+b;
      case '-': return a-b;
      case '*': return a*b;
      case '/': return b===0 ? '#DIV/0!' : a/b;
    }
  }
  return '#ERR';
}

const LS_KEY = 'synkora:sheet:default';

export default function SheetPage() {
  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(8);
  const [data, setData] = useState<string[][]>(() => {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; }
  });

  useEffect(() => {
    if (data.length === 0) {
      setData(Array.from({length: rows}, ()=>Array.from({length: cols}, ()=>'')));
    }
  }, []);

  const get = (r:number,c:number) => (data[r]?.[c] ?? '');
  const set = (r:number,c:number,v:string) => {
    setData(prev => {
      const next = prev.map(row => row.slice());
      while (next.length <= r) next.push(Array.from({length: cols}, ()=>''));
      while ((next[r] ?? []).length <= c) next[r].push('');
      next[r][c] = v;
      return next;
    });
  }

  const addRow = () => { setData(prev => [...prev, Array.from({length: cols}, ()=>'' )]); setRows(r=>r+1); };
  const addCol = () => { setData(prev => prev.map(row => [...row, '' ])); setCols(c=>c+1); };

  const save = () => { localStorage.setItem(LS_KEY, JSON.stringify(data)); };

  const importCSV = (text: string) => {
    const d = fromCSV(text);
    setRows(d.length);
    setCols(Math.max(...d.map(r=>r.length), 1));
    setData(d);
  };

  const exportCSV = () => {
    const csv = toCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'sheet.csv'; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <nav className="flex items-center gap-2 p-2 border-b" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
        <span className="font-semibold pr-4">Spreadsheet</span>
        <button className="px-2 py-1 bg-white/10 rounded" onClick={addRow}>+ Row</button>
        <button className="px-2 py-1 bg-white/10 rounded" onClick={addCol}>+ Column</button>
        <button className="px-2 py-1 bg-white/10 rounded" onClick={save}>Save</button>
        <button className="px-2 py-1 bg-white/10 rounded" onClick={exportCSV}>Export CSV</button>
        <label className="px-2 py-1 bg-white/10 rounded cursor-pointer">
          Import CSV
          <input type="file" accept=".csv,text/csv" className="hidden" onChange={async e=>{
            const f = e.target.files?.[0]; if (!f) return; const t = await f.text(); importCSV(t);
          }} />
        </label>
      </nav>
      <div className="flex-1 overflow-auto">
        <table className="min-w-max text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 border">#</th>
              {Array.from({length: cols}).map((_,c)=>(<th key={c} className="px-2 py-1 border">{colLabel(c)}</th>))}
            </tr>
          </thead>
          <tbody>
            {Array.from({length: rows}).map((_,r)=> (
              <tr key={r}>
                <td className="px-2 py-1 border bg-[var(--background-alt)]">{r+1}</td>
                {Array.from({length: cols}).map((_,c)=>{
                  const raw = get(r,c);
                  const display = evalCell(raw, (rr,cc)=>evalCell(get(rr,cc), ()=>''));
                  return (
                    <td key={c} className="border min-w-[120px]">
                      <input
                        className="w-full px-2 py-1 bg-transparent outline-none"
                        value={raw}
                        onChange={e=>set(r,c,e.target.value)}
                      />
                      {String(raw).startsWith('=') && (
                        <div className="px-2 pb-1 text-[10px] opacity-60">{String(display)}</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
