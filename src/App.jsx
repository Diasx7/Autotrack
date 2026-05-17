import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

import Login from './pages/Login'
import Vehicles from './pages/Vehicles'
import Dashboard from './pages/Dashboard'
import FuelLog from './pages/FuelLog'
import Parts from './pages/Parts'
import Maintenance from './pages/Maintenance'
import IdleLog from './pages/IdleLog'

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // verifica se já tem alguém logado quando o app abre
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // fica escutando login e logout
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (loading) return null

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!session ? <Login /> : <Navigate to="/" />} />
        <Route path="/" element={session ? <Vehicles /> : <Navigate to="/login" />} />
        <Route path="/dashboard/:id" element={session ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/dashboard/:id/abastecimento" element={session ? <FuelLog /> : <Navigate to="/login" />} />
        <Route path="/dashboard/:id/pecas" element={session ? <Parts /> : <Navigate to="/login" />} />
        <Route path="/dashboard/:id/manutencao" element={session ? <Maintenance /> : <Navigate to="/login" />} />
        <Route path="/dashboard/:id/motor-parado" element={session ? <IdleLog /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}