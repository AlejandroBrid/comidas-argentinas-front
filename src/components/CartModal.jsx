import Modal from "@mui/material/Modal";
import "./CartModal.css";
import { useCart } from "../context/CartContext";

const CartModal = ({ isOpen, onClose }) => {
  const { cartItems } = useCart(); // Obtén el estado del carrito desde el contexto

  // Calcula el total basado en el carrito
  const total = calculateTotal(cartItems);

  const env = import.meta.env;
  const baseUrl = `${env.VITE_BACKEND}/uploads`;
  const modalStyle = {
    width: "350px",
    position: "absolute",
    top: "9.2%",
    left: "81%",
    padding: "20px",
    backgroundColor: "#fff",
  };

  return (
    <Modal open={isOpen} onClose={onClose} BackdropProps={{ invisible: true }}>
      <div style={modalStyle}>
        <ul>
          {cartItems.map((cartItem) => (
            <li key={cartItem.food_id}>
              <div className="cart_item">
                <div className="cart_image_container">
                  <img
                    src={`${baseUrl}/${cartItem.photo_path_1}`}
                    alt={cartItem.food_name}
                    style={{ width: "50px", marginRight: "10px" }}
                  />
                </div>
               
                {cartItem.food_name} x{cartItem.quantity} -{" "}
                {cartItem.sale_price || cartItem.price}€
              </div>
            </li>
          ))}
        </ul>
        <p>Total: {total.toFixed(2)}€</p>
      </div>
    </Modal>
  );
};

const calculateTotal = (cartItems) => {
  if (!cartItems) {
    return 0;
  }

  const total = cartItems.reduce((acc, item) => {
    const itemPrice = item.sale_price || item.price;
    const itemPriceAsNumber = parseFloat(itemPrice);

    if (!isNaN(itemPriceAsNumber)) {
      return acc + itemPriceAsNumber * (item.quantity || 1);
    }

    return acc;
  }, 0);

  return total;
};

export default CartModal;

//////////////////////////////////////////
