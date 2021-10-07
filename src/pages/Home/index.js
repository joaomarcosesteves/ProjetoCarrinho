
import { useEffect, useState } from 'react';
import './home.css';
import axios from 'axios';

import {toast} from 'react-toastify'
import { FaCartPlus } from 'react-icons/fa'

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const price = "2,50";
  
  useEffect(()=>{
    //UseEffect para nos trazer os itens da API utilizando AXIOS
    function loadProdutos(){
      const api = axios.get("./acima10.json")
      .then((response) => {        
        setProdutos(response.data.itemMetadata.items);
      }).catch((err) => {
         console.log(err)
      })
    }

    loadProdutos();

  }, []);

  function salvaProduto(produto){

      //Função para salvar produto no carrinho - LocalStorage
       const myList = localStorage.getItem('produtos');
       let produtosSalvos = JSON.parse(myList) || [];


      //Verifica se o produto ja esta no carrinho
       const hasFilme = produtosSalvos.some((produtoSalvo) => produtoSalvo.id === produto.id)
       if(hasFilme){
           toast.warn('Este produto ja está no carrinho!')
           return;
       }
   
       produtosSalvos.push(produto);
       localStorage.setItem('produtos', JSON.stringify(produtosSalvos));
       toast.success('Produto adicionado no carrinho!')
   }

  return (
    <div className="container">
      <div className="lista-produtos">
        <h2> Lista de Produtos </h2>
        {produtos.map((produto)=>{
          return(
            <div className="flex-container" key={produto.id}>
              <img id="photo" src={produto.imageUrl} alt={produto.name} /> 
              <div className="flex"> 
                  <strong id="name"> {produto.name} </strong>
                  <p id="skuname"> {produto.skuName} </p>
                  <h4 id="price"> R$ {price }</h4>
                  <button id="btn" type="button" onClick={() => salvaProduto(produto)}> 
                    <FaCartPlus  size={17} color="#FFF" /> 
                    <text id="frete-gratis">Adicionar ao carrinho</text>
                  </button>
              </div>
            </div>
          )
        })} 
      </div>
    </div>
  );
 }