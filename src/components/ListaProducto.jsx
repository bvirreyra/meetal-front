import PropTypes from "prop-types";

const ListaProductos = ({ productos, onAddToCart }) => {
  return (
    <div className="product-list">
      {productos.map((productos) => (
        console.log("PRODICTO",productos.id),
        
        <div
          key={productos.id}
          className="product-card"
          onClick={() => onAddToCart(productos)}
        >
          <img
            src={`/public/images/productos/${productos.id}.jpg`}
            alt={productos.name}
            className="cards-image"
          />
          <div className="product-info">
              <h3>{productos.name}</h3>
              <p>Precio: Bs. {productos.price}</p>
          </div>
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
