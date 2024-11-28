import { useState, useEffect } from "react";
import CategoryCards from "./CategoriaCards";
import SubCategoryCards from "./SubCategoriaCards";
import ProductList from "./ListaProducto";
import ShoppingCart from "./CarritoCompras";

const Store = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [cart, setCart] = useState([]);

  const fetchData = async (option, categoryId = null, subCategoryId = null) => {
    try {
      let url = `http://localhost:3006/api/crudCliente/?opcion=${option}`;
      if (categoryId) {
        url += `&categoria_id=${categoryId}`;
      }
      if (subCategoryId) {
        url += `&subcategoria_id=${subCategoryId}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        console.error("Error al obtener datos:", response.statusText);
        return null;
      }
      const result = await response.json();
      console.log(`Datos obtenidos (${option}):`, result);
      return result.data; // Usamos la propiedad 'data' del objeto devuelto
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchData("C");
      if (data && Array.isArray(data)) {
        setCategories(
          data.map((item) => ({
            id: item.categoria_id,
            name: item.nombre,
            description: item.descripcion,
          }))
        );
      }
    };

    loadCategories();
  }, []);

  const handleSelectCategory = async (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory(null);

    // Cargar las subcategorías cuando se seleccione una categoría
    const data = await fetchData("S", categoryId);
    if (data && Array.isArray(data)) {
      setSubCategories(
        data.map((item) => ({
          id: item.subcategoria_id,
          name: item.nombre,
          categoryId: item.categoria_id,
        }))
      );
    }
  };

  const handleSelectSubCategory = async (subCategoryId) => {
    setSelectedSubCategory(subCategoryId);

    // Cargar los productos cuando se seleccione una subcategoría
    const data = await fetchData("P", null, subCategoryId);
    if (data && Array.isArray(data)) {
      setProducts(
        data.map((item) => ({
          id: item.producto_id,
          name: item.nombre,
          price: item.precio,
          subCategoryId: item.subcategoria_id,
        }))
      );
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Función para manejar el pago
  const handlePay = () => {
    console.log("Procesando el pago...");
    // Lógica de pago (puedes integrar un API de pagos o cualquier otra lógica)
    setCart([]); // Limpiar el carrito después del pago
    alert("Pago realizado con éxito");
  };

  return (
    <div className="store">
      {!selectedCategory && (
        <CategoryCards
          categories={categories}
          onSelectCategory={handleSelectCategory}
        />
      )}
      {selectedCategory && !selectedSubCategory && (
        <SubCategoryCards
          subCategorias={subCategories}
          onSelectSubCategory={handleSelectSubCategory}
        />
      )}
      {selectedSubCategory && (
        <ProductList productos={products} onAddToCart={addToCart} />
      )}
      <ShoppingCart
        cartItems={cart}
        onRemoveFromCart={removeFromCart}
        onClearCart={clearCart}
        onPay={handlePay}
      />
    </div>
  );
};

export default Store;
