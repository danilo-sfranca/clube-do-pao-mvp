import { countActiveCustomers, findActiveCustomers } from '../repositories/customer-repository.js'

export async function getProductionDemand(_request, response) {
  try {
    const { total_customers: totalCustomers, total_production: totalProduction } = await countActiveCustomers()
    response.json({
      total_customers: totalCustomers,
      total_production: totalProduction,
    })
  } catch (error) {
    console.error('Erro ao consultar demanda do PCP:', error)
    response.status(500).json({ error: 'Nao foi possivel consultar a demanda.' })
  }
}

export async function dispatchRoute(_request, response) {
  try {
    const activeCustomers = await findActiveCustomers()

    activeCustomers.forEach((customer) => {
      console.log(`\n╔══════════════════════════════════════════════════╗`)
      console.log(`║  WHATSAPP SIMULADO | CLIENTE #${String(customer.id).padEnd(21)}║`)
      console.log(`║  Para: ${customer.nome.padEnd(38)}║`)
      console.log(`║  Número: ${customer.whatsapp.padEnd(36)}║`)
      console.log(`║  Horário: ${customer.horario_entrega.padEnd(35)}║`)
      console.log(`║  Mensagem: A fornada saiu!${' '.repeat(23)}║`)
      console.log(`╚══════════════════════════════════════════════════╝`)
    })

    response.json({
      message: 'Rota de entrega iniciada.',
      notifications_sent: activeCustomers.length,
    })
  } catch (error) {
    console.error('Erro ao iniciar despacho:', error)
    response.status(500).json({ error: 'Nao foi possivel iniciar o despacho.' })
  }
}

export async function getDeliveryRoute(_request, response) {
  try {
    const route = await findActiveCustomers()
    response.json({ rota: route })
  } catch (error) {
    console.error('Erro ao consultar rota de entrega:', error)
    response.status(500).json({ error: 'Nao foi possivel consultar a rota de entrega.' })
  }
}
