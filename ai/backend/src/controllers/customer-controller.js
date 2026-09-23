import { createCustomer } from '../repositories/customer-repository.js'

function isValidWhatsapp(whatsapp) {
  if (typeof whatsapp !== 'string') {
    return false
  }

  const digits = whatsapp.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}

export async function registerCustomer(request, response) {
  const { nome, endereco, whatsapp } = request.body ?? {}

  if (!nome?.trim() || !endereco?.trim() || !isValidWhatsapp(whatsapp)) {
    response.status(400).json({
      error: 'Nome, endereco e um WhatsApp valido sao obrigatorios.',
    })
    return
  }

  try {
    const customer = await createCustomer({
      nome: nome.trim(),
      endereco: endereco.trim(),
      whatsapp: whatsapp.trim(),
    })

    response.status(201).json({ cliente: customer })
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error)
    response.status(500).json({ error: 'Nao foi possivel cadastrar o cliente.' })
  }
}
