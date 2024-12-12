// import PropTypes from "prop-types";
// // import jsPDF from "jspdf";
// import "jspdf-autotable";
// import { Button } from "@mantine/core";

// const ShoppingCart = ({ cartItems, onRemoveFromCart, onClearCart, onPay }) => {
//   const total = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   const handlePay = () => {
//     // Aquí puedes hacer una llamada al backend para procesar el pago.
//     onPay(); // Llama la función para mostrar el formulario de pago
//   };

//   return (
//     <div className="shopping-cart">
//       <h2>Carrito de Compras</h2>
//       {cartItems.length > 0 ? (
//         <div>
//           <ul>
//             {cartItems.map((item) => (
//               <li key={item.id}>
//                 <span>{item.name}</span> - ${item.price} x {item.quantity}
//                 <button onClick={() => onRemoveFromCart(item.id)}>
//                   Eliminar
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <div className="cart-total">
//             <span>Total: ${total.toFixed(2)}</span>
//           </div>
//           <div className="cart-actions">
//             <Button onClick={handlePay}>Confirmar</Button>
//             <Button onClick={onClearCart}>Limpiar</Button>
//           </div>
//         </div>
//       ) : (
//         <p>No tienes productos en el carrito.</p>
//       )}
//     </div>
//   );
// };

// ShoppingCart.propTypes = {
//   cartItems: PropTypes.array.isRequired,
//   onRemoveFromCart: PropTypes.func.isRequired,
//   onClearCart: PropTypes.func.isRequired,
//   onPay: PropTypes.func.isRequired,
// };

// export default ShoppingCart;
import PropTypes from "prop-types";
import "jspdf-autotable";
import { Button, Table, Text, Group } from "@mantine/core";

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
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Carrito de Compras</h2>
      {cartItems.length > 0 ? (
        <div>
          <Table
            striped
            highlightOnHover
            withBorder
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              marginBottom: "20px",
              borderCollapse: "collapse", // Asegura que los bordes no se dupliquen
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#4B0082", borderBottom: "2px solid #ddd" }}>
                <th style={{ padding: "10px", textAlign: "left" }}>Producto</th>
                <th style={{ padding: "10px", textAlign: "center" }}>Precio</th>
                <th style={{ padding: "10px", textAlign: "center" }}>Cantidad</th>
                <th style={{ padding: "10px", textAlign: "center" }}>Total</th>
                <th style={{ padding: "10px", textAlign: "center" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr
                  key={item.id}>
                  <td style={{ padding: "10px" }}>{item.name}</td>
                  <td style={{ padding: "10px", textAlign: "center" }}>${item.price.toFixed(2)}</td>
                  <td style={{ padding: "10px", textAlign: "center" }}>{item.quantity}</td>
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    <Button
                      variant="outline"
                      color="red"
                      onClick={() => onRemoveFromCart(item.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div style={{ textAlign: "right", marginTop: "10px" }}>
            <Text size="lg">
              <strong>Total: </strong>${total.toFixed(2)}
            </Text>
          </div>

          <Group position="right" style={{ marginTop: "20px" }}>
            <Button onClick={handlePay} color="green" size="md">
              Confirmar
            </Button>
            <Button onClick={onClearCart} color="gray" size="md">
              Limpiar
            </Button>
          </Group>
        </div>
      ) : (
        <p style={{ textAlign: "center", fontStyle: "italic" }}>
          No tienes productos en el carrito.
        </p>
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

