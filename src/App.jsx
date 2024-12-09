import Store from "./components/Store.jsx";
import "@mantine/core/styles.css";
import Footer from "./components/footer.jsx"; // Add this line to import Footer component
const featuredProducts = []; 
const App = () => {
  return (
    <div>
      <Store />
      <Footer featuredProducts={featuredProducts} />
    </div>
  );
};
export default App;
