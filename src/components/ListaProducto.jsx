import PropTypes from "prop-types";

const ListaProductos = ({ productos, onAddToCart }) => {
  return (
    <div className="product-list">
      {productos.map((productos) => (
        <div
          key={productos.id}
          className="product-card"
          onClick={() => onAddToCart(productos)}
        >
          <h5>{productos.name}</h5>
          <p>Precio: Bs. {productos.price}</p>
        </div>
      ))}
    </div>
  );
};
ListaProductos.propTypes = {
  productos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ListaProductos;
