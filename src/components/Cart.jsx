import { useContext } from "react"
import CartContext from '../store/CartContext'
import Modal from "./UI/Modal";
import {currencyFormatter} from '../util/formatting'
import Button from './UI/Button.jsx'
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Cart(){
    const UserProgressContxt = useContext(UserProgressContext);
    const cartContxt = useContext(CartContext);
    const cartTotal = cartContxt.items.reduce((totalPrice, item) => 
        totalPrice + item.quantity * item.price, 
      0);
    function handleCloseCart(){
        UserProgressContxt.hideCart()
    }
      
  return(
        <Modal className="cart" open={UserProgressContxt.progress === 'cart'}>
            <h2>Your Cart</h2>
            <ul>
                {cartContxt.items.map((item)=>(
                    <li key={item.id}>
                        {item.name} - Quantity: {item.quantity}
                    </li>
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-action">
                <Button textOnly onClick = {handleCloseCart}> Close</Button>
                <Button > Go To Checkout</Button>
            </p>
        </Modal>

  )  
}