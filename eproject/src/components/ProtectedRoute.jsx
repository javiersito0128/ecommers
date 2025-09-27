import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { useEffect } from 'react'

const ProtectedRoute = ({ children }) => {
  const { user, loading, subscribe } = useAuthStore()

  useEffect(() => {
    subscribe()
  }, [subscribe])

  if (loading) return <p>Cargando...</p>
  return user ? children : <Navigate to="/login" />
}

export default ProtectedRoute