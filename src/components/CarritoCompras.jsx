import PropTypes from "prop-types";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from "@mantine/core";
const ShoppingCart = ({ cartItems, onRemoveFromCart, onClearCart, onPay }) => {
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePay = () => {
    // Aquí podrías hacer una llamada al backend para procesar el pago.
    onPay();
  };

  const generatePDF = (cartItems) => {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text("Meetal SuperMercado", 14, 20);

    // Información General
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Time: ${new Date().toLocaleTimeString()}`, 14, 36);

    // Configurar Tabla
    const tableData = cartItems.map((item, index) => [
      index + 1,
      item.name,
      item.quantity,
      `$${item.price.toFixed(2)}`,
      `$${(item.price * item.quantity).toFixed(2)}`,
    ]);

    doc.autoTable({
      head: [["#", "Producto", "Cantidad", "Precio", "Subtotal"]],
      body: tableData,
      startY: 50,
    });

    // Total
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    doc.setFontSize(14);
    doc.text(`Total: $${total.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);

    // Guardar el PDF
    doc.save("Meetal-Factura.pdf");
  };

  return (
    <div className="shopping-cart">
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>
                  <button onClick={() => onRemoveFromCart(item.id)}>
                    Quitar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="total">
        <p>
          <strong>Total: Bs. {total.toFixed(2)}</strong>
        </p>
      </div>
      {total > 0 && (
        <div className="cart-actions">
          <Button
            variant="filled"
            color="rgba(157, 102, 212, 1)"
            size="xs"
            radius="md"
            onClick={onClearCart}
          >
            Vaciar Carrito
          </Button>
          <Button
            variant="filled"
            color="rgba(157, 102, 212, 1)"
            size="xs"
            radius="md"
            onClick={() => {
              handlePay();
              generatePDF(cartItems);
            }}
          >
            Realizar Pago
          </Button>
        </div>
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
