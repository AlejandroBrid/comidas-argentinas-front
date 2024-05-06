import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { editUserAddressService } from "../services";
import "./UserPage.css";

export const UserAddressPage = () => {
  const { user, setUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    street: "",
    apartment: "",
    city: "",
    zip: "",
    tel: "",
  });

  useEffect(() => {
    if (user && user.address) {
      const addressArray = user.address.split(", ");
      setFormData({
        street: addressArray[0] || "",
        apartment: addressArray[1] || "",
        city: addressArray[2] || "",
        zip: addressArray[3] || "",
        tel: user.telephone || "",
      });
    }
  }, [user]);

  const { token } = useContext(AuthContext);

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const fullAddress = `${formData.street}, ${formData.apartment}, ${formData.city}, ${formData.zip}`;

      await editUserAddressService(token, user.id, fullAddress, formData.tel);

      setUser((prevUser) => ({
        ...prevUser,
        delivery_address: fullAddress,
        telephone: formData.tel,
      }));

      setSuccessMessage("Dirección de entrega guardada correctamente");
      setSuccessVisible(true);

      setTimeout(() => {
        setSuccessVisible(false);
      }, 3000);
    } catch (error) {
      setError(error.message);
      setErrorVisible(true);
      setTimeout(() => {
        setErrorVisible(false);
      }, 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Header />
      <main className="user-profile">
        <section className="profile_form">
          <h1 className="profile_title">Editar Dirección de envío</h1>
          <form onSubmit={handleForm} className="profile_form">
            <fieldset className="input-container">
              <label htmlFor="street">Dirección</label>
              <input
                type="text"
                id="street"
                placeholder="Nombre y número de la calle"
                name="street"
                value={formData.street}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="input-container">
              <label htmlFor="apartment">Detalles adicionales</label>
              <input
                type="text"
                id="apartment"
                name="apartment"
                placeholder="Número de apartamento, piso, puerta, etc."
                value={formData.apartment}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="input-container">
              <label htmlFor="city">Ciudad:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="input-container">
              <label htmlFor="zip">Código Postal</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="input-container">
              <label htmlFor="tel">Teléfono</label>
              <input
                type="text"
                id="tel"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
              />
            </fieldset>

            <button type="submit" className="save_changes">
              Guardar Cambios
            </button>
            <div className="message">
              {errorVisible && <p className="error-message">{error}</p>}
              {successVisible && (
                <p className="success_message">{successMessage}</p>
              )}
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};
