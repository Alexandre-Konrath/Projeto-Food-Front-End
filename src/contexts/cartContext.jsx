import { createContext, useState } from "react";

//* instanciando o contexto
const CartContext = createContext()

//* provedor de dados para o contexto
function CardProvider(props) {
  // abrir ela para toda a minha aplicação
  const [ cartItem, setCartItem ] = useState([])
  const [ totalCart, setTotalCart ] = useState(0)

  function AddItemCart(item) {
    //? novo array criado com base nos items que foi encontrado
    let cartItensNovo = []
    //? verifica se consguiu encontrar o item no carrinho
    let findItem = false

    //? verificar se o item esta no carrinho
    for ( var prod of cartItem) {
      // encontrou, pega a quantidade dele mais 1
      if(prod.id === item.id) {
        item.qtd = prod.qtd + 1
        // conseguiu encontrar = true
        findItem = true

        // insiro ele no carrinho novo
        cartItensNovo.push(item)
      } else {
        // simplesmente insere o item
        cartItensNovo.push(prod)
      }
    }

    // se ele nao encontrou o item ou é o primeiro item a ser inserido
    if ((findItem === false) || (cartItem.length === 0)) {
      cartItensNovo.push(item)
    }

    //? insere os dados na lista de carrinhos
    setCartItem(cartItensNovo)
    CalcularTotal(cartItensNovo)
  }

  //* remove o item pelo id
  function RemoveItemCart(id) {

    // declarando outra variavel para conseguir manipular
    let cartItensNovo = []

    for ( var prod of cartItem) {
      // encontrou o produto que eu quero apagar
      if(prod.id === id) {
        prod.qtd = prod.qtd - 1
      }

      cartItensNovo.push(prod)
    }

    // remove os itens zerados
    // filtrar as quantidade maiores que 0
    cartItensNovo = cartItensNovo.filter((item) => {
      return item.qtd > 0
    })

    //? atualiza a lista do carrinho
    setCartItem(cartItensNovo)
    CalcularTotal(cartItensNovo)
  }

  //* calcular o tetal da lista de itens
  function CalcularTotal(items) {
    let tot = 0

    // pega o item da tabela e mulitiplica a quantidade e o preco
    for(var item of items)
      tot = tot + (item.preco * item.qtd)

      setTotalCart(tot)
  }

  //? retornar os elementos
  return (
    <CartContext.Provider value={{cartItem, totalCart, setCartItem, AddItemCart, RemoveItemCart, setTotalCart}}>
      {/* as props armazena os dados de children = filho = toda a minha aplicação */}
      {props.children}
    </CartContext.Provider>
  )
}

export { CartContext, CardProvider }
