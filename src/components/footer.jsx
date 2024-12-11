import PropTypes from "prop-types";
const Footer = () => {
  return (
    <footer className="store-footer">
      <div className="footer-content">
        <div className="store-info">
          <h3>Sobre Meetal SuperMercado</h3>
          <p>Dirección: Av. Mariscal Santa Cruz, Zona Central</p>
          <p>Teléfono: +591 62450170</p>
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
