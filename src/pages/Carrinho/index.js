import { Button, InputLabel, MenuItem, Select, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useCarrinhoContext } from 'common/context/Carrinho';
import { usePagamentoContext } from 'common/context/Pagamento';
import { UserContext } from 'common/context/User';
import Produto from 'components/Produto';
import { useContext, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { Container, PagamentoContainer, TotalContainer, Voltar } from './styles';


function Carrinho() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { carrinho, efetuarCompra,valorCarrinho } = useCarrinhoContext()
  const { tiposDePagamento, pagamentoSelecionado, selecionaPagamento } = usePagamentoContext()
  const history = useHistory()
  const {saldo} = useContext(UserContext)
  const saldoTotal = useMemo(()=> saldo - valorCarrinho, [saldo, valorCarrinho])
  return (
    <Container>
      <Voltar
        onClick={() => history.goBack()} />
      <h2>
        Carrinho
      </h2>
      {carrinho.map(produto => (
        <Produto
          {...produto}
          key={produto.id}
        />
      ))}
      <PagamentoContainer>
        <InputLabel>Forma de Pagamento</InputLabel>
        <Select
          onChange={event => selecionaPagamento(event.target.value)}
          value={pagamentoSelecionado.id}
        >
          {tiposDePagamento.map(pagamento => (
            <MenuItem key={pagamento.id} value={pagamento.id}>
              {pagamento.nome}
            </MenuItem>
          ))}
        </Select>
      </PagamentoContainer>
      <TotalContainer>
        <div>
          <h2>Total no Carrinho: </h2>
          <span>R$ {valorCarrinho.toFixed(2)}</span>
        </div>
        <div>
          <h2> Saldo: </h2>
          <span> R$ {Number(saldo).toFixed(2)}</span>
        </div>
        <div>
          <h2> Saldo Total: </h2>
          <span> R$ {saldoTotal.toFixed(2)}</span>
        </div>
      </TotalContainer>
      <Button
        onClick={() => {
          setOpenSnackbar(true);
          efetuarCompra()
        }}
        color="primary"
        variant="contained"
        disabled={saldo < valorCarrinho || carrinho.length === 0}
      >
        Comprar
      </Button>
      <Snackbar
        anchorOrigin={
          {
            vertical: 'top',
            horizontal: 'right'
          }
        }
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
        >
          Compra feita com sucesso!
        </MuiAlert>
      </Snackbar>
    </Container>
  )
}

export default Carrinho;