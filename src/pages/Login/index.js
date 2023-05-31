import { Button, Input, InputAdornment, InputLabel } from '@material-ui/core';
import { UserContext } from 'common/context/User';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import {
  Container,
  InputContainer,
  Titulo
} from './styles';

function Login() {
  const { setUsuario, usuario, saldo, setSaldo } = useContext(UserContext)
  const history = useHistory()
  return (
    <Container>
      <Titulo>
        Insira o seu nome
      </Titulo>
      <InputContainer>
        <InputLabel>
          Nome
        </InputLabel>
        <Input

          onChange={(event) => {setUsuario(event.target.value)}}
          value={usuario}
          type="text"
        />
      </InputContainer>
      <InputContainer>
        <InputLabel>
          Saldo
        </InputLabel>
        <Input
          onChange={(event) => {setSaldo(event.target.value)}}
          value={saldo}
          type="number"
          startAdornment={
            <InputAdornment position="start">
              R$
            </InputAdornment>
          }
        />
      </InputContainer>
      <Button
        variant="contained"
        color="primary"
        disabled={usuario.length === 0}
        onClick={() => {
          history.push('/feira')
        }}
      >
        Avançar
      </Button>
    </Container>
  )
};

export default Login;