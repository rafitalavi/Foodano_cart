import applogo from '../assets/logo.jpg'
import Button from './UI/Button'
import { useContext } from 'react'
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext'
export default function Header(){
    const CartContxt = useContext(CartContext)
    const UserProgressContxt = useContext(UserProgressContext)
    const totalCartItems = CartContxt.items.reduce((totalnumberOfItems, item)=>{
        return totalnumberOfItems + item.quantity;
    },0)
    function handleShowCart(){
        UserProgressContxt.showCart();
    }
    return(
    <header id = "main-header">
        <div id ="title">
            <img src={applogo}/>
            <h1>Food Ano</h1>
        </div>
        <nav>
            <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
        </nav>
    </header>)
}