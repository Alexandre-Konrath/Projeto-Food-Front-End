import { useContext } from "react";
import { CartContext } from "../../contexts/cartContext";

import "./styles.css";

function Produtocart(props) {
  const { AddItemCart, RemoveItemCart } = useContext(CartContext)

  function AddItem() {

    const item = {
      id: props.id,
      nome: props.nome,
      preco: props.preco,
      foto: props.foto,
      qtd: 1
    }

    AddItemCart(item)
  }

  // quando eu clico no botao ela chama a função global e passa o id do produto que eu cliquei e consequentemente quero apagar
  function RemoveItem() {
    RemoveItemCart(props.id)
  }

  return (
    <div className="produto-card-box">
      <img src={props.foto} alt="hamburguer" />

      <div className="container">
        <p className="produto-card-nome">{props.nome}</p>
        <p className="produto-card-preco">
          {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
          .format(props.preco)}
        </p>

        <div className="footer-produto-cart">
            <button onClick={RemoveItem} className="btn footer-produto-btn">-</button>
            <span className="footer-produto-qtd">{props.qtd}</span>
            <button onClick={AddItem} className="btn footer-produto-btn">+</button>

          <p className="footer-produto-preco">
            {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(props.preco * props.qtd)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Produtocart;
