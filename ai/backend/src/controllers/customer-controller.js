import { createCustomer, deleteAllCustomers } from '../repositories/customer-repository.js'

const allowedDeliverySlots = [
  '05:30-06:00',
  '06:00-06:30',
  '06:30-07:00',
  '07:00-07:30',
  '07:30-08:00',
]

function isValidWhatsapp(whatsapp) {
  if (typeof whatsapp !== 'string') {
    return false
  }

  const digits = whatsapp.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}

function isValidQuantity(quantidade) {
  return Number.isInteger(quantidade) && quantidade > 0
}

export async function registerCustomer(request, response) {
  const { nome, endereco, whatsapp, quantidade, horario_entrega: horarioEntrega } = request.body ?? {}

  if (
    !nome?.trim()
    || !endereco?.trim()
    || !isValidWhatsapp(whatsapp)
    || !isValidQuantity(quantidade)
    || !allowedDeliverySlots.includes(horarioEntrega)
  ) {
    response.status(400).json({
      error: 'Nome, endereco, WhatsApp, quantidade inteira positiva e horario de entrega valido sao obrigatorios.',
    })
    return
  }

  try {
    const customer = await createCustomer({
      nome: nome.trim(),
      endereco: endereco.trim(),
      whatsapp: whatsapp.trim(),
      quantidade,
      horarioEntrega,
    })

    response.status(201).json({ cliente: customer })
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error)
    response.status(500).json({ error: 'Nao foi possivel cadastrar o cliente.' })
  }
}

export async function deleteCustomers(_request, response) {
  try {
    const deletedCustomers = await deleteAllCustomers()
    response.json({ deleted_customers: deletedCustomers })
  } catch (error) {
    console.error('Erro ao limpar base de clientes:', error)
    response.status(500).json({ error: 'Nao foi possivel limpar a base de clientes.' })
  }
}
