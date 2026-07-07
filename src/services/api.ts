import axios from 'axios'
import { Platform } from 'react-native'

// Resolve API base URL from multiple possible sources in RN/Expo:
// 1) expo-constants extra (recommended for Expo builds)
// 2) runtime-global process env (when available in some dev setups)
// 3) fallback to emulator/localhost defaults
function resolveApiBase(): string {
  // 1) Try expo-constants (works in Expo apps when configured)
  try {
    // Use require to avoid hard dependency when not running in Expo
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Constants = require('expo-constants')
    const extra = Constants?.default?.expoConfig?.extra || Constants?.expoConfig?.extra
    const fromConstants = extra?.API_BASE_URL
    if (fromConstants && String(fromConstants).trim() !== '') {
      return String(fromConstants).trim()
    }
  } catch (e) {
    // ignore if expo-constants is not available
  }

  // 2) Try global/process env (some dev setups populate this)
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const maybe = (globalThis as any)?.process?.env?.API_BASE_URL

    if (maybe && String(maybe).trim() !== '') return String(maybe).trim()
  } catch (e) {}


  // 3) Fallback defaults for emulator / localhost
  return 'https://super-duper-succotash-qg5597j6794f4r5w-8000.app.github.dev'
}

const BASE_URL = resolveApiBase()

const api = axios.create({
  baseURL: `${BASE_URL}/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Small helper to log axios activity during development
function attachInterceptors(instance: ReturnType<typeof axios.create>) {
  instance.interceptors.request.use((config: any) => {
    // eslint-disable-next-line no-console
    console.debug('[api] Request', config.method, config.url)
    return config
  })


  instance.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      // eslint-disable-next-line no-console
      console.warn('[api] Response error', error?.response?.status, error?.message)
      return Promise.reject(error)
    }
  )

}

// Attach simple interceptors for development/debugging
attachInterceptors(api)

export type Client = {
  id: number
  nome: string
  email: string
  telefone: string
  bairro: string
  logradouro: string
  numero: string
}

export type Product = {
  id: number
  nome: string
  valor: number
  descricao: string
}

// Frontend payload shapes (used in forms/contexts)
export type NewClientPayload = {
  nome?: string
  telefone?: string
  endereco?: {
    bairro?: string
    logradouro?: string
    numero?: string
  }
  email?: string
}

export type NewProductPayload = {
  id?: number
  nome?: string
  valor?: number
  descricao?: string
}

export type UserProfile = {
  id: number
  nome: string
  email: string
  criado_em: string
  saldo_fisico: string
  saldo_online: string
}

export type RegisterUserPayload = {
  nome?: string
  email?: string
  senha?: string
}

export type UpdateMePayload = {
  nome?: string
  email?: string
  senha?: string
  saldo_fisico?: number | string
  saldo_online?: number | string
}

export async function getClients(search?: string, ordering?: string): Promise<Client[]> {
  const params: any = {}

  if (search) params.search = search
  if (ordering) params.ordering = ordering

  const response = await api.get<{ results: Client[] }>('clientes/', { params })
  return response.data.results
}


export async function createClient(payload: NewClientPayload): Promise<Client> {
  const body = {
    nome: payload.nome || '',
    telefone: payload.telefone || '',
    bairro: payload.endereco?.bairro || '',
    logradouro: payload.endereco?.logradouro || '',
    numero: payload.endereco?.numero || '',
    email: payload.email || '',
  }
  const response = await api.post<Client>('clientes/', body)
  return response.data
}

export async function updateClient(
  id: number,
  payload: NewClientPayload
): Promise<Client> {

  const body = {
    nome: payload.nome || '',
    telefone: payload.telefone || '',
    bairro: payload.endereco?.bairro || '',
    logradouro: payload.endereco?.logradouro || '',
    numero: payload.endereco?.numero || '',
    email: payload.email || '',
  }

  const response = await api.put<Client>(
    `clientes/${id}/`,
    body
  )

  return response.data
}

export async function deleteClient(id: number): Promise<void> {

  await api.delete(
    `clientes/${id}/`
  )

}

export async function getProducts(
  search?: string,
  ordering?: string,
): Promise<Product[]> {
  const params: any = {}

  if (search) params.search = search
  if (ordering) params.ordering = ordering
  
  const response = await api.get<{ results: Product[] }>("produtos/", { params, })
  return response.data.results
}

export async function updateProduct(
  id: number,
  payload: NewProductPayload
): Promise<Product> {

  const body = {
    nome: payload.nome || '',
    valor: payload.valor ?? 0,
    descricao: payload.descricao || '',
  }

  const response = await api.put<Product>(
    `produtos/${id}/`,
    body
  )

  return response.data
}

export async function deleteProduct(id: number): Promise<void> {

  await api.delete(
    `produtos/${id}/`
  )

}

export async function registerUser(payload: RegisterUserPayload): Promise<UserProfile & { message?: string }> {
  const body = {
    nome: payload.nome || '',
    email: payload.email || '',
    senha: payload.senha || '',
  }
  const response = await api.post<UserProfile & { message?: string }>('users/', body)
  return response.data

}

export async function getMe(): Promise<UserProfile> {
  const response = await api.get<UserProfile>('users/me/')
  return response.data
}

export async function updateMe(payload: UpdateMePayload): Promise<UserProfile & { message?: string }> {
  const response = await api.put<UserProfile & { message?: string }>('users/me/', payload)
  return response.data
}


export async function createProduct(payload: NewProductPayload): Promise<Product> {
  const body = {
    nome: payload.nome || '',
    valor: payload.valor ?? 0,
    descricao: payload.descricao || '',
  }
  const response = await api.post<Product>('produtos/', body)
  return response.data
}
