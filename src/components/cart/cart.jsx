import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../contexts/cartContext";
import { useNavigate } from "react-router-dom";
// Dock carrinho que aparece ou desaparece em função do click do botao
import { Dock } from "react-dock";

import Produtocart from "../produtoCart/produtoCart";

import back from "../../assets/back.png";
import "./styles.css";

function Cart(){
  // armazena o valor e executa uma função
  const [ show, setShow ] = useState(false)
  const navigate = useNavigate()
  // uso o contexto
  const { cartItem, totalCart } = useContext(CartContext)

  //! evento que escuta o click do botao la do componete de Navbar
  useEffect(() => {
    window.addEventListener('openSidebar', () => setShow(true))

    // setCartitem(carrinho)
  }, [])

  function checkout() {
    navigate('/checkout')
  }

  return (
  <Dock
    position="right"
    isVisible={show}
    fluid={false}
    size={360}
    onVisibleChange={(visible) => {setShow(visible)}}>
      <div className="text-center">
        <img onClick={(e) => setShow(false)} src={back} className="cart-btn-close" />
        <h1>Meu Pedido</h1>
      </div>

      <div className="lista-produtos">
        {cartItem.map((item) => {
          return <Produtocart
            key={item.id}
            id={item.id}
            foto={item.foto}
            nome={item.nome}
            qtd={item.qtd}
            preco={item.preco}
          />
        })}
      </div>

      <div className="footer-cart">
        <div className="footer-cart-valor">
          <span>Total</span>
          <span><strong>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
          .format(totalCart)}</strong></span>
        </div>
        <div>
          <button onClick={checkout} className="btn-checkout">Finalizar Pedido</button>
        </div>
      </div>
    </Dock>
  )
}

export default Cart;
