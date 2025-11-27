'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Kiểm tra localStorage khi component mount
    const storedUser = localStorage.getItem('htkd_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem('htkd_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Lấy danh sách users từ localStorage
    const users = JSON.parse(localStorage.getItem('htkd_users') || '[]')
    
    // Tìm user
    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    )

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
      }
      setUser(userData)
      localStorage.setItem('htkd_user', JSON.stringify(userData))
      return true
    }

    return false
  }

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    // Kiểm tra email đã tồn tại chưa
    const users = JSON.parse(localStorage.getItem('htkd_users') || '[]')
    
    if (users.some((u: any) => u.email === email)) {
      return false // Email đã tồn tại
    }

    // Tạo user mới
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // Trong thực tế nên hash password
    }

    users.push(newUser)
    localStorage.setItem('htkd_users', JSON.stringify(users))

    // Tự động login sau khi đăng ký
    const userData = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    }
    setUser(userData)
    localStorage.setItem('htkd_user', JSON.stringify(userData))

    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('htkd_user')
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

