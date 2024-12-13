import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./Input";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Button from "./UI/Button";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartContxt = useContext(CartContext); // Accessing CartContext
  const UserProgressContxt = useContext(UserProgressContext); // Accessing UserProgressContext

  // Using custom hook to send HTTP requests
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  // Calculate total cart amount
  const cartTotal = cartContxt.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  // Handle closing the checkout modal
  function handleCloseCheckout() {
    UserProgressContxt.hideCheckout();
    console.log("Go To Checkout clicked");
  }

  // Handle finishing the checkout process
  function handleFinish() {
    UserProgressContxt.hideCheckout();
    cartContxt.clearCart(); // Clear the cart
    clearData(); // Clear request data
  }

  // Handle the form submission
  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target); // Create FormData from the form
    const customerData = Object.fromEntries(fd.entries()); // Convert FormData to an object
    console.log("Customer Data:", customerData); // Log customer data for debugging

    // Sending request with custom hook
    sendRequest(
      JSON.stringify({
        order: {
          items: cartContxt.items,
          customer: customerData,
        },
      })
    );

    // Alternative: Sending request without custom hook
    // fetch('http://localhost:3000/orders', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         order: {
    //             items: cartContxt.items,
    //             customer: customerData
    //         }
    //     })
    // });
  }

  // Define modal actions dynamically based on loading state
  let actions = (
    <>
      <Button type="button" textOnly onClick={handleCloseCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  // Render success modal if data is present and there is no error
  if (data && !error) {
    return (
      <Modal open={UserProgressContxt.progress === "checkout"} onClose={handleFinish}>
        <h2>Success</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button type="button" onClick={handleFinish}>
            Okay
          </Button>
        </p>
      </Modal>
    );
  }

  // Render the checkout form
  return (
    <Modal
      open={UserProgressContxt.progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {/* Show error message if there's an error */}
        {error && <Error title="Failed to submit order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
