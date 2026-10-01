import { useState } from 'react'

const apiUrl = 'http://localhost:3000/api'

export function useCustomer() {
  const [form, setForm] = useState({ nome: '', endereco: '', whatsapp: '', quantidade: '1', horario_entrega: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch(`${apiUrl}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, quantidade: Number(form.quantidade) }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Não foi possível concluir sua assinatura.')
      setIsSuccess(true)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    form,
    isSubmitting,
    error,
    isSuccess,
    handleChange,
    handleSubmit,
  }
}
