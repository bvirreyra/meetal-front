import { useState, useEffect } from "react";
import CategoryCards from "./CategoriaCards";
import SubCategoryCards from "./SubCategoriaCards";
import ProductList from "./ListaProducto";
import ShoppingCart from "./CarritoCompras";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import "jspdf-autotable";// Add this line to import Footer component

const Store = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("categories"); // Controla la vista actual
  const [showForm, setShowForm] = useState(false); // Controla si se muestra el formulario de pago
  const [clientData, setClientData] = useState(null); // Guardará los datos del cliente

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
      return result.data;
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
    setView("subcategories");

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
    setView("products");

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

    toast.success(`${product.name} añadido al carrito!`);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleConfirm = () => {
    setShowForm(true); // Mostrar el formulario para que aparezca el botón de pago
  };


  const processPayment = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      nit: formData.get("nit"),
    };
    setClientData(data); // Guardamos los datos del cliente
    console.log("DATOS DEL CLIENTE", data);
    console.log("CARRITO", cart);
    

    // Generar PDF después de procesar el pago
    generatePDF(data, cart);

    setCart([]); // Limpiar el carrito después del pago
    setShowForm(false); // Ocultar el formulario
    setView("categories"); // Volver a la vista de categorías
    alert("Pago realizado con éxito");
  };



  const generatePDF = (clientData, cartItems) => {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text("Meetal SuperMercado", 14, 20);

    // Datos del cliente
    doc.setFontSize(12);
    doc.text(`Cliente: ${clientData.name}`, 14, 30);
    doc.text(`NIT: ${clientData.nit}`, 14, 36);

    // Información de la venta
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 42);
    doc.text(`Hora: ${new Date().toLocaleTimeString()}`, 14, 48);

    // Configurar Tabla
    const tableData = cartItems.map((item, index) => [
      index + 1,
      item.name,
      item.quantity,
      `${item.price.toFixed(2)}`,
      `${(item.price * item.quantity).toFixed(2)}`,
    ]);

    doc.autoTable({
      head: [["#", "Producto", "Cantidad", "Precio Bs.", "Subtotal Bs."]],
      body: tableData,
      startY: 60,
    });

    // Total
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    doc.setFontSize(14);
    doc.text(
      `Total: Bs. ${total.toFixed(2)}`,
      14,
      doc.lastAutoTable.finalY + 10
    );

    // Guardar el PDF
    doc.save("Factura_cliente.pdf");
  };

  const navigateToCategories = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setView("categories");
  };

  const navigateToSubCategories = () => {
    setSelectedSubCategory(null);
    setView("subcategories");
  };

  return (
    <div className="store"> 
      {/* Navegación */}
      <nav className="nav-bar">
      <h1 className="nav-name">Meetal Super Mercado</h1>
        
        <div className="nav-content">
        {/* <img src="/public/images/nav-background.jpg" alt="Fondo del nav"/> */}
          {view !== "categories" && (
            <button onClick={navigateToCategories}>Categorías</button>
          )}
          {view === "products" && (
            <button onClick={navigateToSubCategories}>Subcategorías</button>
          )}
          <div className="cart-icon" onClick={() => setView("cart")}>
            <img src="/images/cart-icon.png" alt="Carrito" />
            <span className="cart-count">
              {cart.reduce((ac, el) => ac + Number(el.quantity), 0)}
            </span>
          </div>
        </div>
      </nav>

      {/* Contenido dinámico basado en la vista */}
      {view === "categories" && (
        <CategoryCards
          categories={categories}
          onSelectCategory={handleSelectCategory}
        />
      )}
      {view === "subcategories" && (
        <SubCategoryCards
          subCategorias={subCategories}
          onSelectSubCategory={handleSelectSubCategory}
        />
      )}
      {view === "products" && (
        <ProductList productos={products} onAddToCart={addToCart} />
      )}
      {view === "cart" && (
        <ShoppingCart
          cartItems={cart}
          onRemoveFromCart={removeFromCart}
          onClearCart={clearCart}
          onPay={handleConfirm} // Solo muestra Confirmar, no Realizar Pago
        />
      )}

      {/* Formulario de pago */}
      {showForm && (
        <form onSubmit={processPayment} className="payment-form">
          <h2>Datos del cliente</h2>
          <label>
            Nombre:
            <input type="text" name="name" required />
          </label>
          <label>
            Carnet o NIT:
            <input type="text" name="nit" required />
          </label>
          <button type="submit">Realizar pago</button>
        </form>
      )}

      {/* Contenedor de toasts */}
      <ToastContainer />
      
    </div>
  );
};

export default Store;
