import PropTypes from "prop-types";

const SubCategoriaCards = ({ subCategorias = [], onSelectSubCategory }) => {
  return (
    <div className="subcategory-cards">
      {subCategorias.map((subCategory) => (
        <div
          key={subCategory.id}
          className="card"
          onClick={() => onSelectSubCategory(subCategory.id)}
        >
          <h4>{subCategory.name}</h4>
        </div>
      ))}
    </div>
  );
};
SubCategoriaCards.propTypes = {
  subCategorias: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelectSubCategory: PropTypes.func.isRequired,
};

export default SubCategoriaCards;
