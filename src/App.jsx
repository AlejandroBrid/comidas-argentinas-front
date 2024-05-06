import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { MenuPage } from "./pages/MenuPage";
import { FoodPage } from "./pages/FoodPage";
import { AdminPage } from "./pages/AdminPage";
import { EditFoodPage } from "./pages/EditFoodPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { UserPage } from "./pages/UserPage";
import { UserAddressPage } from "./pages/UserAddressPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/users/:id/address" element={<UserAddressPage />} />
      <Route path="/users/:id" element={<UserPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/menu/:id" element={<FoodPage />} />
      <Route path="/admin/:id" element={<EditFoodPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
