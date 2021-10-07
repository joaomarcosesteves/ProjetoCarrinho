
import './header.css';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { FaPlusCircle } from 'react-icons/fa'
import { useEffect, useState } from 'react'

export default function Header(){
  const [carrinho, setCarrinho] = useState([]);

  useEffect(()=>{

    //Função para verificar se existe algum item no carrinho...
    function verify(){
      const prodList = localStorage.getItem('produtos');
      let carr = JSON.parse(prodList)
    
      setCarrinho(carr);
    }

    verify();

  }, []);

  //Dentro do return fazemos uma renderização condicional se houver algum item no carrinho ou não....
  //Se tiver, retorna um icone a mais pro usuário indicando que tem itens no carrinho...
  //Se não tiver, retorna apenas o icone do carrinho...
  return(  
    <header>
      {carrinho ? ( <Link className="carrinho" to="/carrinho" >
      <AiOutlineShoppingCart  size={25} color="#FFF" id="salvar" /> 
      Meu Carrinho 
      <div className="carrinho-cheio"> <FaPlusCircle size={12} color="#FFF" /> </div> </Link>  ) : (
        <Link className="carrinho" to="/carrinho" > <AiOutlineShoppingCart size={25} color="#FFF" id="salvar" /> Meu Carrinho</Link> 
      )}
        
    </header>
  )
}