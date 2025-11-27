// Utility functions để quản lý localStorage

export const StorageKeys = {
  PRODUCTS: 'htkd_products',
  CUSTOMERS: 'htkd_customers',
  ORDERS: 'htkd_orders',
  USERS: 'htkd_users',
  USER: 'htkd_user',
}

// Generic storage functions
export function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error)
    return defaultValue
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error)
  }
}

export function removeStorageItem(key: string): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error)
  }
}

// Clear all HTKD data
export function clearAllData(): void {
  removeStorageItem(StorageKeys.PRODUCTS)
  removeStorageItem(StorageKeys.CUSTOMERS)
  removeStorageItem(StorageKeys.ORDERS)
  // Giữ lại USERS và USER để không mất tài khoản đăng nhập
}

