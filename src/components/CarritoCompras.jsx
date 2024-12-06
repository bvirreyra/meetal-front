import PropTypes from "prop-types";
// import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from "@mantine/core";

const ShoppingCart = ({ cartItems, onRemoveFromCart, onClearCart, onPay }) => {
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePay = () => {
    // Aquí puedes hacer una llamada al backend para procesar el pago.
    onPay(); // Llama la función para mostrar el formulario de pago
  };

  return (
    <div className="shopping-cart">
      <h2>Carrito de Compras</h2>
      {cartItems.length > 0 ? (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <span>{item.name}</span> - ${item.price} x {item.quantity}
                <button onClick={() => onRemoveFromCart(item.id)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <span>Total: ${total.toFixed(2)}</span>
          </div>
          <div className="cart-actions">
            <Button onClick={handlePay}>Confirmar</Button>
            <Button onClick={onClearCart}>Limpiar</Button>
          </div>
        </div>
      ) : (
        <p>No tienes productos en el carrito.</p>
      )}
    </div>
  );
};

ShoppingCart.propTypes = {
  cartItems: PropTypes.array.isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
  onClearCart: PropTypes.func.isRequired,
  onPay: PropTypes.func.isRequired,
};

export default ShoppingCart;
