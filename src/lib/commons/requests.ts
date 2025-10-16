
export type SetErrorState = (v: number) => void
export type SetErrorMessage = (s: string) => void

export interface LoginResponse {
  success?: boolean
  token?: string
  user?: unknown
  message?: string
}

export interface Response {
  success?: boolean
  id?: string
  message?: string
}

export async function postJson<T = unknown>(url: string, body: unknown) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, data: data as T }
}

export async function putJson<T = unknown>(url: string, body: unknown) {
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, data: data as T }
}

export async function getJson<T = unknown>(url: string, body: unknown) {
  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  const data = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, data: data as T }
}

export function getErrorMessage(err: unknown): string {
  if (typeof err === 'object' && err !== null && 'message' in err) {
    const maybe = err as { message?: unknown }
    if (typeof maybe.message === 'string') return maybe.message
  }
  return String(err)
}