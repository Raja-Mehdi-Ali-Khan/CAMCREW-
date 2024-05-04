import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import User from "./pages/User.jsx";

// import CartProvider from "./context/ProductContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Auth0Provider
    domain="dev-4oaqynihx8qzjyu5.us.auth0.com"
    clientId="1egeiZRY9cqJy6yzOyIqoWGKFiot7XVV"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition:Bounce
    />
  </Auth0Provider>
  // </React.StrictMode>
  // <User />
);