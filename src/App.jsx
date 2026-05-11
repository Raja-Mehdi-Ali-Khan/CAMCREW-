
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ServiceDetailsPage from "./pages/ServiceDetailsPage";

import Footer from "./components/Footer";
import CartProvider from "./context/ServiceContext";
import FilterProvider from "./context/FilterContext";
import Header from "./components/Header";
import Form from "./pages/Form";
import EditProfilePage from "./pages/User";
import AddCam from "./pages/AddCam";
// import RCalendar from "./components/Calendar";
import ComparisonPage from "./pages/Compare";
import { ComparisonProvider } from "./context/ComparsionContext";
import { UserProvider } from "./context/UserContext";
import FavPage from "./pages/FavPage";


const App = () => {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);
  return (
    <>
      <UserProvider>
        <FilterProvider>
          <ComparisonProvider>
            <CartProvider>
              <Router>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/category/:categoryId"
                    element={<CategoryPage />}
                  />
                  <Route
                    path="/product/:productId"
                    element={<ServiceDetailsPage />}
                  />
                  <Route path="/cart" element={<FavPage />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/edituser" element={<EditProfilePage />} />
                  <Route path="/add" element={<AddCam />} />
                  {/* <Route path="/cal" element={<RCalendar />} /> */}
                  <Route path="/compare" element={<ComparisonPage />} />
                </Routes>
                <Footer />
              </Router>
            </CartProvider>
          </ComparisonProvider>
        </FilterProvider>
      </UserProvider>
    </>
  );
};

export default App;
