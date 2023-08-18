
import { useEffect, useState } from 'react';
import './home.scss';
import axios from 'axios';
import {toast} from 'react-toastify'
import { AiOutlineCheck } from 'react-icons/ai'

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  let wishlist = 'wishlist'
  

  useEffect(()=>{
    //UseEffect para nos trazer os itens da API utilizando AXIOS
    function loadProdutos(){
      // eslint-disable-next-line no-unused-vars
      const api = axios.get("./products.json")
      .then((response) => { 
        //console.log(response.data.products)       
        setProdutos(response.data.products);
      }).catch((err) => {
         console.log(err)
      })
    }

    loadProdutos();
  }, []);

// Criação do localstorage para o carrinho e wishlist
useEffect(() => {
  const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  setFavorites(storedFavorites);
  const storedCart = JSON.parse(localStorage.getItem('produtos')) || [];
  setCart(storedCart);
}, []);


// Atualiza o localstorage toda vez os states são alterados
useEffect(() => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
  localStorage.setItem('produtos', JSON.stringify(cart));
}, [favorites, cart]);


// Adiciona ou remove os itens no localstorage, com validação se o produto ja esta no mesmo
const handleAddToFavorites = (productId, param) => {
  if( param === wishlist){
      if (favorites.includes(productId)) {
        setFavorites(favorites.filter(id => id !== productId));
        toast.info('Produto removido da lista de desejos :(');
      } else {
        setFavorites([...favorites, productId]);
        toast.success('Produto Adicionado a lista de desejos :)');
      }
    } else {
      if (cart.includes(productId)) {
        setCart(cart.filter(id => id !== productId));
        toast.info('Produto removido do carrinho :(');
      } else {
        setCart([...cart, productId]);
        toast.success('Produto Adicionado ao carrinho :)');
      }
    }
}


const isFavorite = (productId) => {
  return favorites.includes(productId);
};
const inCart = (productId) => {
  return cart.includes(productId);
};


  return (
    <div className="section">
      <div className="container">
        {produtos.map((produto)=>{
          return(
            <div className="card" key={produto.id}>

              <img className="productImage" src={produto.imageUrl} alt={produto.name} /> 

               <button className="wishList" type="button" onClick={() => handleAddToFavorites(produto.id, wishlist)}> 
                <span className={isFavorite(produto.id) ? 'iconActive' : 'icon' }>  
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="24" fill="#F2F3F6"/>
                    <path d="M34.1494 16.8566C33.5629 16.268 32.8667 15.8011 32.1003 15.4825C31.334 15.164 30.5126 15 29.6831 15C28.8535 15 28.0321 15.164 27.2658 15.4825C26.4994 15.8011 25.8032 16.268 25.2167 16.8566L23.9997 18.0775L22.7826 16.8566C21.5981 15.6682 19.9915 15.0006 18.3163 15.0006C16.6411 15.0006 15.0346 15.6682 13.85 16.8566C12.6655 18.0449 12 19.6566 12 21.3372C12 23.0177 12.6655 24.6295 13.85 25.8178L15.0671 27.0387L23.9997 36L32.9323 27.0387L34.1494 25.8178C34.7361 25.2295 35.2015 24.531 35.519 23.7622C35.8366 22.9934 36 22.1694 36 21.3372C36 20.505 35.8366 19.681 35.519 18.9122C35.2015 18.1434 34.7361 17.4449 34.1494 16.8566Z" fill="#F2F3F6" stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button> 

              <div className="info"> 
                  <span className="productName"> {produto.name} </span>
                  <div className="priceDetails"> 
                    <span className="sellingPrice"> {produto.productSellingPrice} </span>
                    <span className="listPrice"> R$ {produto.productListPrice }</span>
                    <p className="installments"> 
                      em até 
                      <span className="installmentsValue">{produto.productInstallments}</span> 
                      sem juros
                    </p>
                  </div>
              </div>
              
              <button className={inCart(produto.id) ? 'btn' : 'btnActive'} type="button" onClick={() => handleAddToFavorites(produto.id, cart)}> 
                {inCart(produto.id) 
                ? <><AiOutlineCheck size={24} color="#000" id="checked" /><span>Adicionado</span></>  
                : <span>Adicionar</span>
                }
              </button>
            </div>
          )
        })} 
      </div>
    </div>
  );
 }