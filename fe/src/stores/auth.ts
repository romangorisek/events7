import { defineStore } from 'pinia'
import { ref } from 'vue'

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const JWT_STORAGE_KEY = 'jwt_token'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem(JWT_STORAGE_KEY))

  async function login() {
    try {
      const response = await fetch(`${backendUrl}/auth/login`, {
        method: 'POST',
      })
      if (!response.ok) {
        throw new Error('Failed to login')
      }
      const data = await response.json()
      token.value = data.access_token
      localStorage.setItem(JWT_STORAGE_KEY, data.access_token)
    } catch (error) {
      console.error('Error logging in:', error)
      throw new Error('Failed to login')
    }
  }

  function logout() {
    token.value = null
    localStorage.removeItem(JWT_STORAGE_KEY)
  }

  return {
    token,
    login,
    logout,
  }
})
