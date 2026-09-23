# Business Rules & Domain Logic (MVP Clube do Pão)

Este documento define as regras de negócio, os domínios do sistema e a lógica de operação do MVP. Todo o desenvolvimento deve obedecer a estas restrições.

## 1. Domínio de Assinaturas (Clientes)
- **BR-1.1 (Plano Único):** Para o MVP, não há variação de planos. A assinatura padrão contempla a entrega diária de um "Kit Pão Quente".
- **BR-1.2 (Ativação Imediata):** Como o fluxo de gateway de pagamento está fora do escopo do MVP, a criação de um cadastro pelo cliente muda seu status automaticamente para `ACTIVE`.
- **BR-1.3 (Dados Obrigatórios):** Um cliente só pode ser registrado se fornecer Nome, Endereço de Entrega e um número de WhatsApp válido.

## 2. Domínio de PCP (Planejamento e Controle da Produção)
- **BR-2.1 (Cálculo de Demanda):** O dashboard da padaria não lida com pedidos avulsos. A demanda de produção diária (`total_production`) é estritamente igual ao número total de clientes com status `ACTIVE` no banco de dados.
- **BR-2.2 (Visão Consolidada):** A tela inicial do administrador deve sempre carregar essa volumetria atualizada em tempo real para orientar a fornada.

## 3. Domínio de Fulfillment e Last-Mile (Despacho)
- **BR-3.1 (Gatilho de Rota):** A ação "Iniciar Rota de Entrega" (disparada pelo padeiro/operador) atua em lote (batch). Ela não muda o status de um pedido individual, mas altera o status operacional do dia.
- **BR-3.2 (Simulação de Notificação):** Ao disparar o gatilho de rota, o backend deve iterar sobre a lista de clientes `ACTIVE` e gerar um evento de notificação. No MVP, este evento será persistido em um log de terminal (simulando a API de mensageria) e mudará o status no frontend do cliente para "Sua fornada está a caminho!".
- **BR-3.3 (Densidade de Rota):** Para fins de demonstração, o sistema assume que todos os clientes cadastrados pertencem à mesma rota otimizada do bairro.

## 4. Glossário do Negócio
- **Assinante/Associado:** Cliente final B2C com cadastro ativo.
- **Kit Pão Quente:** A unidade de medida padrão da entrega diária.
- **Painel Padaria:** A interface B2B onde o produtor visualiza a demanda de PCP e aciona o Fulfillment.
- **Webhook de Rota:** O endpoint da API responsável por receber o sinal da padaria e enfileirar as notificações.