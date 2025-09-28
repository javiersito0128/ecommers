import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { useEffect } from 'react'

const ProtectedRoute = ({ children }) => {
  const { user, loading, subscribe } = useAuthStore()

  useEffect(() => {
    const unsubscribe = subscribe()
    return unsubscribe
  }, [subscribe])

  if (loading) return <p>Cargando autenticación...</p>
  return user ? children : <Navigate to="/login" />
}

export default ProtectedRoute