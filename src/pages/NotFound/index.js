import './notFound.css'
import { Link } from 'react-router-dom'

export default function NotFound(){
    return(
        <div className="not-Found">
            <h1> 404 </h1>
            <h2> Pagina Não Encontrada! </h2>
            <Link to="/"> Veja nossos Produtos! </Link>
        </div>
    )
}