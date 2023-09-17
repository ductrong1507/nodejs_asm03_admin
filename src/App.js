import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useSelector } from "react-redux";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import SideBar from "./components/SideBar/SideBar";
import ProductList from "./components/ProductList/ProductList";
import RequireLogin from "./components/RequireLogin/RequireLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { isLogin } = useSelector((state) => state.authReducer);

  return (
    <BrowserRouter>
      <Navbar />

      <main id="home_page">
        <SideBar />

        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Router user */}
          <Route
            path="/admin/users"
            element={!isLogin ? <RequireLogin /> : "Tính Năng Đang Phát Triển"}
          />

          {/* Router Products */}
          <Route
            path="/admin/products"
            element={!isLogin ? <RequireLogin /> : <ProductList />}
          />
          <Route
            path="/admin/create-product"
            element={!isLogin ? <RequireLogin /> : "Tính Năng Đang Phát Triển"}
          />
          <Route
            path="/admin/update-product"
            element={!isLogin ? <RequireLogin /> : "Tính Năng Đang Phát Triển"}
          />

          {/* Router Order  */}
          <Route
            path="/admin/orders"
            element={!isLogin ? <RequireLogin /> : "Tính Năng Đang Phát Triển"}
          />
          <Route
            path="/admin/create-order"
            element={!isLogin ? <RequireLogin /> : "Tính Năng Đang Phát Triển"}
          />
          <Route
            path="/admin/update-order"
            element={!isLogin ? <RequireLogin /> : "Tính Năng Đang Phát Triển"}
          />

          {/* Router đăng nhâp */}
          <Route
            path="/login"
            element={isLogin ? <Navigate to="/" replace /> : <LoginPage />}
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>

        {/* Toast component*/}
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="light"
        />
      </main>
    </BrowserRouter>
  );
}

export default App;
