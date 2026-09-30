import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  it('renders the home page with core calls to action', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByText(/O seu dia começa com pão/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Sou Cliente/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Acessar Painel da Padaria/i })).toBeInTheDocument()
  })

  it('submits the customer form and shows a success message', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ cliente: { id: 1, nome: 'Ana Souza' } }),
    })

    render(
      <MemoryRouter initialEntries={['/cliente']}>
        <App />
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText(/Nome completo/i), { target: { value: 'Ana Souza' } })
    fireEvent.change(screen.getByLabelText(/Endereço de entrega/i), { target: { value: 'Rua das Flores, 10' } })
    fireEvent.change(screen.getByLabelText(/WhatsApp/i), { target: { value: '(11) 98888-1234' } })
    fireEvent.change(screen.getByLabelText(/Quantidade de pães/i), { target: { value: '3' } })
    fireEvent.change(screen.getByRole('combobox', { name: /Faixa de horário/i }), { target: { value: '06:00-06:30' } })

    fireEvent.click(screen.getByRole('button', { name: /Quero meu pão quente/i }))

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/Assinatura Ativa!/i)
    })
  })
})
