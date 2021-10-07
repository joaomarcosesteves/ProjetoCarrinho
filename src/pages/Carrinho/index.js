import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './carrinho.css'
import {toast} from 'react-toastify'
import { FaArrowLeft, FaTrashAlt } from 'react-icons/fa'


export default function Carrinho(){
    const [valor, setValor] = useState();
    const [produtos, setProdutos] = useState([]);
    const price = "2.50";

    useEffect(()=>{

            //Aqui fazemos a consulta no LocalStorage para nos retornar os produtos no carrinho
            const listaCarrinho = localStorage.getItem('produtos');
            setProdutos(JSON.parse(listaCarrinho) || []);
                
            setValor(produtos.length * 2.50);        
    }, [produtos.length]);

    function deleteProduto(id){
        //Função para remover item do carrinho
        let filterProduto = produtos.filter((item) => {
            return (item.id !== id)
        })

        setProdutos(filterProduto);
        localStorage.setItem('produtos', JSON.stringify(filterProduto))
        toast.success('Produto removido do carrinho!');
    }
    return(
        <div id="meu-carrinho">
            <div className="back"> <Link to="/">  <FaArrowLeft  size={25} color="black" /> <p id="text-back"> Voltar </p> </Link> </div>

            <h1> Meu Carrinho </h1>
            
            {/* Renderização condicional se caso não houver nenhum item dentro do carrinho */}
            {produtos.length === 0 &&
             <span className="carrinho-vazio"> Você não possui nenhum produto no carrinho! :( <br></br> 
             <Link id="redirect" to={"/"}> Veja nossos Produtos! </Link> </span>
             }

            <ul>
                  {/* Se tiver item no carrinho, percorremos o array de produtos e exibimos cada item da lista */}
                {produtos.map((item)=>{
                    return(
                    
                    <div key={item.id}>
                        <div className="carrinho">
                            <img src={item.imageUrl} alt={item.name} /> 
                            <div className="flex"> 
                                <strong> {item.name} </strong>
                                <p> {item.skuName} </p>
                                <h4> R$ {price }</h4>          
                            </div>

                            <div className="flex-right">
                                <button onClick={() => deleteProduto(item.id)}>  <FaTrashAlt  size={25} color="black"  /> </button>
                            </div>
                        </div>
                    </div>
                    )
                })}
            </ul>
            <div className="total">
                <strong> Total </strong>
                <h3> R$ {valor} </h3> 
            </div>


            {/* Renderização condicional, se o valor total dos produtos for maior ou igual a 10, usuario ganha frete grátis */}
            {valor >= 10 &&
             <div className="frete-gratis"> <span> Parabéns, sua compra tem frete grátis !</span> </div>
            }
        </div>
    )
};