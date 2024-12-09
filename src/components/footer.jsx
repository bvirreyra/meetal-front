import PropTypes from "prop-types";

const Footer = ({ featuredProducts }) => {
  return (
    <footer className="store-footer">
      <div className="footer-content">
        <div className="featured-products">
          <h3>Productos destacados</h3>
          <div className="product-list">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-item">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <p className="product-name">{product.name}</p>
                <p className="product-price">Bs. {product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="store-info">
          <h3>Sobre Meetal SuperMercado</h3>
          <p>Dirección: Calle Falsa 123, Ciudad Central</p>
          <p>Teléfono: +591 123 456 789</p>
          <p>Horario: Lunes a Domingo, 8:00 AM - 9:00 PM</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Meetal SuperMercado. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};
Footer.propTypes = {
  featuredProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Footer;
