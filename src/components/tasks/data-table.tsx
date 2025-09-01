"use client"

import * as React from "react"
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
} from "@tanstack/react-table"
import { z } from "zod"
import {
  IconCircleCheckFilled,
  IconLoader,
} from "@tabler/icons-react"

export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  duedate: z.string(),
  assignee: z.string(),
})

type DataType = z.infer<typeof schema>

const columns: ColumnDef<DataType>[] = [
  {
    accessorKey: "header",
    header: "Task",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as string
      return (
        <div className="flex items-center gap-1">
          {status === "Done" ? (
            <IconCircleCheckFilled className="w-4 h-4" style={{ color: "var(--color-success)" }} />
          ) : (
            <IconLoader className="w-4 h-4 animate-spin" style={{ color: "var(--color-info)" }} />
          )}
          <span>{status}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "duedate",
    header: "Due Date",
    cell: info => new Date(info.getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: "assignee",
    header: "Assigned To",
  },
]

export function DataTable({ data }: { data: DataType[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 })

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div
      className="overflow-x-auto rounded-lg border border-var-border-light dark:border-var-border-dark"
      style={{ width: "100%" }}
    >
      <table className="min-w-full divide-y divide-var-border-light dark:divide-var-border-dark table-fixed rounded-lg">
        <thead
          className="bg-var-background-alt dark:bg-var-background"
          style={{ backgroundColor: "var(--background-alt)" }}
        >
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  scope="col"
                  className="px-4 py-2 text-left text-sm font-semibold text-var-foreground-light dark:text-var-foreground"
                  style={{
                    cursor: header.column.getCanSort() ? "pointer" : "default",
                  }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : header.column.columnDef.header}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-var-background-light dark:bg-var-background-dark divide-y divide-var-border-light dark:divide-var-border-dark">
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                className={`${
                  i === table.getRowModel().rows.length - 1 ? "rounded-b-lg" : ""
                } bg-var-background-light dark:bg-var-background-dark hover:bg-var-muted-light dark:hover:bg-var-muted-dark`}
                style={{
                  borderRadius: i === 0 ? "0.5rem 0.5rem 0 0" : undefined,
                }}
              >
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 text-sm text-var-foreground-light dark:text-var-foreground truncate"
                  >
                    {cell.column.columnDef.cell
                      ? typeof cell.column.columnDef.cell === "function"
                        ? cell.column.columnDef.cell(cell.getContext())
                        : cell.column.columnDef.cell
                      : cell.getValue()}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-4 py-4 text-center text-var-muted-foreground">
                No results.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-3 p-3">
        <button
          className="rounded border border-var-border px-3 py-1 text-var-foreground hover:bg-var-muted-light dark:hover:bg-var-muted-dark disabled:opacity-50"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="rounded border border-var-border px-3 py-1 text-var-foreground hover:bg-var-muted-light dark:hover:bg-var-muted-dark disabled:opacity-50"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <span className="text-sm text-var-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          className="rounded border border-var-border px-3 py-1 text-var-foreground hover:bg-var-muted-light dark:hover:bg-var-muted-dark disabled:opacity-50"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="rounded border border-var-border px-3 py-1 text-var-foreground hover:bg-var-muted-light dark:hover:bg-var-muted-dark disabled:opacity-50"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
      </div>
    </div>
  )
}
