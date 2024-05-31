import { useState, useEffect } from "react";

import Navbar from "../../components/navbar/navbar";
import api from "../../services/api";

import "./styles.css";

function Historico() {
  const [ pedidos, setPedidos ] = useState([])

  useEffect(() => {
    api.get('/pedidos')
    .then((resp) => {
      setPedidos(resp.data)
    })
    .catch((err) => {
      alert('Erro ao carregar os pedidos');
    })
  }, [])


  return (
    <>
      <Navbar showMenu />

      <div className="container">
        <div className="titulo text-center">
          <h1>Histórico de Pedidos</h1>
        </div>

        <div className="box-pedidos">
          <table className="table">
            {/* fazer um looping dentro de um array */}
            {pedidos.map((ped) => {
              return (
                <tr className="table-tr" key={ped.id_pedido}>
                  <td><strong>Pedidos {ped.id_pedido}</strong></td>
                  <td className="text-light">{ped.dt_pedido}</td>
                  {/* formatar o preço moeda BR */}
                  <td className="text-red">{new Intl.NumberFormat('pt-BR',
                    { style: 'currency', currency: "BRL" }).format(ped.total)}</td>
                </tr>
              )
            })}
          </table>
        </div>
      </div>

    </>
  )

}

export default Historico;
