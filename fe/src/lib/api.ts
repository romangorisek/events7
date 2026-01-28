import { useAuthStore } from '@/stores/auth'

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

export async function api(url: string, options: RequestInit = {}): Promise<Response> {
  const authStore = useAuthStore()

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (authStore.token) {
    defaultHeaders['Authorization'] = `Bearer ${authStore.token}`
  }

  let response = await fetch(`${backendUrl}${url}`, {
    ...options,
    headers: defaultHeaders,
  })

  if (response.status === 401) {
    try {
      await authStore.login()
      // update header with new token
      if (authStore.token) {
        defaultHeaders['Authorization'] = `Bearer ${authStore.token}`
      }
      // retry the request
      response = await fetch(`${backendUrl}${url}`, {
        ...options,
        headers: defaultHeaders,
      })
    } catch (e) {
      // if login fails, we should probably redirect to a login page
      // for now, we just throw the error
      throw new Error('Login failed')
    }
  }

  return response
}
