import { useContext } from "react";
import { CartContext } from "../../contexts/cartContext";

import bag from "../../assets/bag-black.png";

import "./styles.css";

function ProdutoVitrine(props) {
  // acessando meu context global
  const { AddItemCart } = useContext(CartContext)

  function AddItem() {
    // monta um objeto contendo os dados do produto que a pessoa clicou
    const item = {
      id: props.id,
      nome: props.nome,
      preco: props.preco,
      foto: props.foto,
      qtd: 1
    }
    AddItemCart(item)
  }

  return (
    <div className="produto-box text-center">
      <img src={props.foto} alt="hambúrguer" />
      <div>
        <h2>{props.nome}</h2>
        <p className="prod-vitrine-desclicao">{props.descricao}</p>
        <p className="prod-vitrine-preco">{new Intl.NumberFormat('pt-BR',
          { style: 'currency', currency: "BRL" }).format(props.preco)}</p>
      </div>

      <div>
        <button onClick={AddItem} className="btn btn-cart">
          <img  src={bag} alt="Adicionar ao carrinho" className="icon" />
          Adicionar
        </button>
      </div>
    </div>
  )
}

export default ProdutoVitrine;
