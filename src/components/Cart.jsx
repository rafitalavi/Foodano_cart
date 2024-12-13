import { useContext } from "react"
import CartContext from '../store/CartContext'
import Modal from "./UI/Modal";
import {currencyFormatter} from '../util/formatting'
import Button from './UI/Button.jsx'
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart(){
    const UserProgressContxt = useContext(UserProgressContext);
    const cartContxt = useContext(CartContext);
    const cartTotal = cartContxt.items.reduce((totalPrice, item) => 
        totalPrice + item.quantity * item.price, 
      0);
    console.log("UserProgressContxt value:", UserProgressContxt.progress);  
    function handleCloseCart(){
        UserProgressContxt.hideCart()
        console.log("hanldeclose hit")
    }
    function handleGotoCheckout(){
        UserProgressContxt.showCheckout(); // Ensure this triggers the correct state change
        console.log("hanldGotoCart hit")
       
    }
      
  return(
        <Modal className="cart" open={UserProgressContxt.progress === 'cart'} onClose={UserProgressContxt.progress === 'cart' ? handleCloseCart: null}>
            <h2>Your Cart</h2>
            
            <ul>
                {cartContxt.items.map((item)=>(
                    <CartItem 
                    key={item.id} 
                    name={item.name}
                    quantity={item.quantity} 
                    price={item.price}
                    onIncrease={()=>cartContxt.addItem(item)}
                    onDecrease={()=>cartContxt.removeItem(item.id)}/>
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-action">
                <Button textOnly onClick = {handleCloseCart}> Close</Button>
                {cartContxt.items.length > 0 && (
  <Button onClick={handleGotoCheckout}>Go To Checkout</Button>
)}

            </p>
        </Modal>

  )  
}