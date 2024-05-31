import { useContext, useState } from "react";
import { CartContext } from "../../contexts/cartContext";
import Navbar from "../../components/navbar/navbar"

import "./styles.css";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function Checkout() {
  // chamar nosso contexto
  const { totalCart, cartItem, setCartItem, setTotalCart } = useContext(CartContext)

  // constante de navegação
  const navigate = useNavigate()

  // constantes que irão armazenar os dados de campos digitados
  const [ nome, setNome ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ fone, setFone ] = useState('')

  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUF] = useState('');

  function FinalizarPedido() {

    // monta os intens para enviar para a api
    let produtos = []

    // percorre o array de carrinho para montar os dados formatados para o banco de dados

    for( var prod of cartItem ) {
      produtos.push({
        id_produto: prod.id,
        qtd: prod.qtd,
        vl_unitario: prod.preco,
        vl_total: prod.preco * prod.qtd,
      })
    }

    const params = {
      id_usuario: 1,
      nome,
      email,
      fone,
      endereco,
      bairro,
      cidade,
      uf,
      cep,
      total: totalCart,

      itens: produtos
    }

    console.log(params)

    // post para a API
    api.post('/pedidos', params)
    .then((resp) => {
      setCartItem([])
      setTotalCart(0)

      navigate('/historico')
    })
    .catch((err) => {
      alert('deu merda')
    })

  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="titulo text-center">
          <h1>Finalizar Pedido</h1>
        </div>

        <div className="col-3">
          <div className="box-checkout">
            <h3>Dados Pessoais</h3>

            <div className="input-group">
              <p>Nome Completo</p>
              <input type="text" id="name" onChange={(e) => setNome(e.target.value)}/>
            </div>

            <div className="input-group">
              <p>E-mail</p>
              <input type="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="input-group">
              <p>Telefone</p>
              <input type="text" id="fone" onChange={(e) => setFone(e.target.value)}/>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="box-checkout">
            <h3>Enderoço de Entrega</h3>

            <div className="input-group">
              <p>CEP</p>
              <input type="text" id="cep" onChange={(e) => setCep(e.target.value)}/>
            </div>

            <div className="input-group">
              <p>Endereço</p>
              <input type="text" id="endereco" onChange={(e) => setEndereco(e.target.value)}/>
            </div>

            <div className="input-group">
              <p>Bairro</p>
              <input type="text" id="bairro" onChange={(e) => setBairro(e.target.value)}/>
            </div>

            <div className="input-group">
              <p>Cidade</p>
              <input type="text" id="cidade" onChange={(e) => setCidade(e.target.value)}/>
            </div>

            <div className="input-group">
              <p>UF</p>
              <select id="uf" onChange={(e) => setUF(e.target.value)}>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
                <option value="EX">Estrangeiro</option>
              </select>
            </div>
          </div>
        </div>

        <div className="col-3">
          <div className="box-checkout">
            <h3>Valores</h3>

            <div className="checkout-valores">
              <span>Total</span>
              <span><strong>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
          .format(totalCart)}</strong></span>
            </div>

            <div className="checkout_button">
              <button onClick={FinalizarPedido} className="btn btn-checkout">Finalizar Pedido</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout;
