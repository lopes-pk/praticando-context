import { createContext, useContext, useEffect, useState } from "react";
import { usePagamentoContext } from "./Pagamento";
import { UserContext } from "./User";

export const CarrinhoContext = createContext()
CarrinhoContext.displayName = 'Carrinho'

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([])
  const [quantidadeProdutos, setQuantidadeProdutos] = useState(0)
  const [valorCarrinho, setValorCarrinho] = useState(0)
  return (
    <CarrinhoContext.Provider value={{ carrinho, setCarrinho, quantidadeProdutos, valorCarrinho, setValorCarrinho, setQuantidadeProdutos }}>
      {children}
    </CarrinhoContext.Provider>
  )
}
export const useCarrinhoContext = () => {

  const { carrinho, setCarrinho, quantidadeProdutos, setQuantidadeProdutos, valorCarrinho, setValorCarrinho } = useContext(CarrinhoContext)
  const { pagamentoSelecionado } = usePagamentoContext()
  const {setSaldo} = useContext(UserContext)

  function mudarQuantidade(id, quantidade) {
    return carrinho.map((item) => {
      if (item.id === id) item.quantidade += quantidade;
      return item;
    })
  }

  function adicionarProduto(novoProduto) {
    const temOProduto = carrinho.some(itemNoCarrinho => itemNoCarrinho.id === novoProduto.id)
    //Caso não tenha o produto ele é adicionado nesse if
    if (!temOProduto) {
      novoProduto.quantidade = 1
      return (
        setCarrinho(carrinho => [...carrinho, novoProduto])
      )
    }
    //Se têm o produto, logo a função acima não funcionará e pulará para essa que está setando a quantidade do produto que já têm no carrinho
    setCarrinho(mudarQuantidade(novoProduto.id, 1))
  }

  function removerProduto(id) {
    const produto = carrinho.find(carrinho => carrinho.id === id)
    const eOUltimo = produto.quantidade === 1;

    if (eOUltimo) {
      return setCarrinho(carrinho => carrinho.filter(itensCarrinho => itensCarrinho.id !== id))
    }

    setCarrinho(mudarQuantidade(id, -1))
  }

  function efetuarCompra() {
    setCarrinho([])
    setSaldo(saldoAtual => saldoAtual - valorCarrinho)
  }

  useEffect(() => {
    const { valorNoCarrinho, quantidadeCarrinho } = carrinho.reduce((contador, produto) => ({
      quantidadeCarrinho: contador.quantidadeCarrinho + produto.quantidade,
      valorNoCarrinho: contador.valorNoCarrinho + (produto.valor * produto.quantidade)
    }), {
      quantidadeCarrinho: 0,
      valorNoCarrinho: 0
    });
    setValorCarrinho(valorNoCarrinho * pagamentoSelecionado.juros)
    setQuantidadeProdutos(quantidadeCarrinho);
  }, [carrinho, setQuantidadeProdutos, setValorCarrinho, pagamentoSelecionado])
  return {
    adicionarProduto,
    carrinho,
    removerProduto,
    quantidadeProdutos,
    efetuarCompra,
    valorCarrinho
  }
}
