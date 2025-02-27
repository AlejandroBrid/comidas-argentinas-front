import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProviderComponent } from "./context/AuthContext.jsx";
import "./fonts.css";
import { MenuProvider } from "./context/MenuContext";
import { CartProvider } from "./context/CartProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProviderComponent>
        <MenuProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </MenuProvider>
      </AuthProviderComponent>
    </BrowserRouter>
  </React.StrictMode>
);
