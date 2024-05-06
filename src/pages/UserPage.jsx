import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  editUserNameService,
  updateEmailService,
  changePasswordService,
} from "../services";
import "./UserPage.css";

export const UserPage = () => {
  const { user, setUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const [editedUser, setEditedUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    currentPassword: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setEditedUser({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        currentPassword: "",
        password: "",
      });
    }
  }, [user]);

  const { token } = useContext(AuthContext);

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (!editedUser.first_name) {
        throw new Error("El nombre de usuario no puede estar vacío");
      }

      await editUserNameService(token, user.id, {
        first_name: editedUser.first_name,
        last_name: editedUser.last_name,
      });

      if (user.email !== editedUser.email) {
        await updateEmailService(token, user.id, user.email, editedUser.email);
      }

      if (editedUser.password) {
        await changePasswordService(
          token,
          user.id,
          editedUser.currentPassword,
          editedUser.password
        );
      }

      setUser((prevUser) => ({
        ...prevUser,
        first_name: editedUser.first_name,
        last_name: editedUser.last_name,
        email: editedUser.email,
      }));

      setSuccessMessage("Cambios guardados correctamente");
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
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Header />
      <main className="user-profile">
        <section className="profile_form">
          <h1 className="profile_title">Editar Perfil</h1>
          <form onSubmit={handleForm} className="profile_form">
            <fieldset className="input-container">
              <label htmlFor="first_name">Nombre</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={editedUser.first_name}
                required
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="input-container">
              <label htmlFor="last_name">Apellidos</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={editedUser.last_name}
                required
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="input-container">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={editedUser.email}
                required
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="input-container-pass">
              <label htmlFor="currentPassword">Contraseña</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={editedUser.currentPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="show_password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </fieldset>
            <fieldset className="input-container-pass">
              <label htmlFor="password">Nueva Contraseña</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={editedUser.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="show_password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
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
