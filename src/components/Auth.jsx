import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Auth.css";
import { HiMiniUserCircle } from "react-icons/hi2";
import { Menu, MenuItem } from "@mui/material";
import { useCart } from "../context/CartContext";
import CartModal from "./CartModal";

export const Auth = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false); // Nuevo estado para controlar la apertura/cierre del modal

  const { cartItems: cartItemsContext } = useCart();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    handleMenuClose();
  };

  const handleOpenCartModal = () => {
    setIsCartModalOpen(true);
    handleMenuClose(); // Cierra el menú al abrir el modal
  };

  const handleCloseCartModal = () => {
    setIsCartModalOpen(false);
  };

  return user ? (
    <div className="user">
      <p onClick={handleMenuOpen} style={{ cursor: "pointer" }}>
        <i className="fa fa-user" aria-hidden="true"></i> {user.first_name}
      </p>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          component={Link}
          to={`/users/${user.id}`}
          onClick={handleMenuClose}
        >
          <i className="fa fa-user fa-fw" aria-hidden="true"></i> Información
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/users/${user.id}/address`}
          onClick={handleMenuClose}
        >
          <i className="fa fa-map-marker fa-fw" aria-hidden="true"></i>Añadir
          dirección
        </MenuItem>
        <MenuItem component={Link} to="/orders" onClick={handleMenuClose}>
          <i className="fa fa-history fa-fw" aria-hidden="true"></i>Historial de
          pedidos
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <i className="fa fa-sign-out fa-fw" aria-hidden="true"></i> Salir
        </MenuItem>
      </Menu>

      {user.isAdmin ? (
        <Link to="/admin" className="adminButton">
          Administrador
        </Link>
      ) : (
        <div>
          {/* Botón para abrir el modal de carrito */}
          <button onClick={handleOpenCartModal} className="cartButton">
            <i className="fa fa-shopping-bag" aria-hidden="true"></i>{" "}
            <span style={{ marginRight: "5px" }}>
              {cartItemsContext ? cartItemsContext.length : 0}
            </span>
            Carrito
          </button>

          {/* Mostrar el contenido del carrito en un modal */}
          <CartModal
            cartItems={cartItemsContext}
            isOpen={isCartModalOpen}
            onClose={handleCloseCartModal}
          />
        </div>
      )}
    </div>
  ) : (
    <Link to="/login" className="login">
      <HiMiniUserCircle style={{ verticalAlign: "middle" }} />
      <button style={{ verticalAlign: "middle", paddingRight: 0 }}>
        Iniciar sesión
      </button>
    </Link>
  );
};

///////////////////////////////////////////////////////////
