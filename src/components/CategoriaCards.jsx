import PropTypes from "prop-types";

const CategoriaCards = ({ categories, onSelectCategory }) => {
  return (
    <div className="category-cards">
      {categories.map((category) => (
        <div
          key={category.id}
          className="card"
          onClick={() => onSelectCategory(category.id)}
        >  
          <img
            src={`/public/images/${category.id}.jpg`}
            alt={category.name}
            className="card-image"
          />
          <h3>{category.name}</h3>
        </div>
      ))}
    </div>
  );
};

CategoriaCards.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategoriaCards;
