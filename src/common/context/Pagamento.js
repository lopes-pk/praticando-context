import { createContext, useContext, useState } from 'react'

export const PagamentoContext = createContext()
PagamentoContext.displayName = 'Pagamento'

export const PagamentoProvider = ({ children }) => {
  const tiposDePagamento = [
    {
      nome: "Boleto",
      id: 1,
      juros: 1
    },
    {
      nome: "Cartão de Crédio",
      id: 2,
      juros: 1.3
    },
    {
      nome: "PIX",
      id: 3,
      juros: 1
    }
  ]
  const [pagamentoSelecionado, setPagamentoSelecionado] = useState(tiposDePagamento[0])
  return (
    <PagamentoContext.Provider value={{ tiposDePagamento, pagamentoSelecionado, setPagamentoSelecionado }}>
      {children}
    </PagamentoContext.Provider>
  )
}

export const usePagamentoContext = () => {
  const { tiposDePagamento, pagamentoSelecionado, setPagamentoSelecionado } = useContext(PagamentoContext)

  function selecionaPagamento(id) {
    const pagamentoEscolhido = tiposDePagamento.find(pagamento => pagamento.id === id)
    setPagamentoSelecionado(pagamentoEscolhido)
  }
  return {
    tiposDePagamento,
    selecionaPagamento,
    pagamentoSelecionado
  }
}

