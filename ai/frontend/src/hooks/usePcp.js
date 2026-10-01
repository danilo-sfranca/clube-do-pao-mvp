import { useEffect, useState } from 'react'

const apiUrl = 'http://localhost:3000/api'

export function usePcp() {
  const [demand, setDemand] = useState(null)
  const [deliveryRoute, setDeliveryRoute] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDispatching, setIsDispatching] = useState(false)
  const [isClearing, setIsClearing] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')

  async function loadDashboard() {
    setIsLoading(true)
    setError('')
    try {
      const [demandResponse, routeResponse] = await Promise.all([
        fetch(`${apiUrl}/pcp/demanda`),
        fetch(`${apiUrl}/pcp/rota`),
      ])
      const [demandData, routeData] = await Promise.all([demandResponse.json(), routeResponse.json()])
      if (!demandResponse.ok) throw new Error(demandData.error || 'Não foi possível carregar a demanda.')
      if (!routeResponse.ok) throw new Error(routeData.error || 'Não foi possível carregar a rota.')
      setDemand(demandData)
      setDeliveryRoute(routeData.rota)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { loadDashboard() }, [])

  async function clearCustomers() {
    const confirmed = window.confirm('Tem certeza que deseja excluir todos os clientes cadastrados? Esta ação não pode ser desfeita.')
    if (!confirmed) return

    setIsClearing(true)
    setError('')
    try {
      const response = await fetch(`${apiUrl}/clientes`, { method: 'DELETE' })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Não foi possível limpar a base de clientes.')
      setToast(`Base limpa: ${data.deleted_customers} clientes removidos.`)
      window.setTimeout(() => setToast(''), 4500)
      await loadDashboard()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsClearing(false)
    }
  }

  async function startRoute() {
    setIsDispatching(true)
    setError('')
    try {
      const response = await fetch(`${apiUrl}/pcp/despacho`, { method: 'POST' })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Não foi possível iniciar a rota.')
      setToast(`${data.notifications_sent} notificações enviadas. A rota começou!`)
      window.setTimeout(() => setToast(''), 4500)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsDispatching(false)
    }
  }

  return {
    demand,
    deliveryRoute,
    isLoading,
    isDispatching,
    isClearing,
    error,
    toast,
    loadDashboard,
    clearCustomers,
    startRoute,
  }
}
