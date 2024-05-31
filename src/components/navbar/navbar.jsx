import { useContext } from "react";
import { CartContext } from "../../contexts/cartContext";

import {Link} from "react-router-dom";

import Cart from "../cart/cart";

import logo from "../../assets/logo.png";
import bag from "../../assets/bag.png";

import "./styles.css";

function Navbar(props){

  const { cartItem } = useContext(CartContext)

  function openSidebar(){
    //! criar um avento para acessar a variável[show] do componente Cart
    const event = new CustomEvent('openSidebar');
    window.dispatchEvent(event);
  }

  return (
    <div className="navbar">
      <Link to="/">
          <img src={logo} className="logotipo" alt="Logotipo" />
      </Link>

      {/* propriedade para exibir os botões ou não */}
      {props.showMenu &&
        <div className="menu">
        <Link to="/historico">Histórico</Link>
        <button onClick={openSidebar} className="btn btn-red">
          <img src={bag} className="icon"/>
          Sacola
          {cartItem.length > 0 && <span className="icon-quantidade">{cartItem.length}</span>}
        </button>
        </div>
      }

      <Cart />
    </div>
  )
}

export default Navbar;
