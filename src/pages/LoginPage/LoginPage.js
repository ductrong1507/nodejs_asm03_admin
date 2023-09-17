import React, { useRef } from "react";
import axios from "axios";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { API_BASE_URL } from "../../utils/apiConfig";
import { onLogin } from "../../redux/reducers/authReducer";
import { toast } from "react-toastify";
// emailRef
export default function LoginPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handel login page
  const loginHandel = async (e) => {
    e.preventDefault();
    // kiểm tra nhập đủ các trường
    if (!emailRef.current.value.trim() || !passwordRef.current.value.trim()) {
      toast.warning("Vui lòng nhập username và password!");
      return;
    }

    // Gọi API để đăng nhập
    try {
      const resultAPI = await axios({
        url: `${API_BASE_URL}/user/login`,
        method: "POST",
        data: {
          email: emailRef.current.value.trim().toLowerCase(),
          password: passwordRef.current.value.trim().toLowerCase(),
        },
      });

      console.log("resultAPI", resultAPI);
      // CHuyển hướng và call reducer
      if (resultAPI.data.status) {
        // Kiểm tra xem có phải admin không
        if (
          resultAPI.data.result.isAdmin ||
          resultAPI.data.result.isSupporter
        ) {
          toast.success(resultAPI.data.message);
          dispatch(onLogin(resultAPI.data));
          navigate(-1, { replace: true });
        } else {
          toast.error(
            "Bạn không phải là Admin hoặc Supporter không thể đăng nhập. Hãy vào database chỉnh thủ công quyền Admin hoặc Supporter bằng true!"
          );
          passwordRef.current.value = "";
        }
      } else {
        // Kiểm tra thông tin đăng nhập đúng userName, password không
        toast.error(resultAPI.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      passwordRef.current.value = "";
    }
  };

  return (
    <section id={styles.auth_page}>
      <h1>Login</h1>
      <form onSubmit={loginHandel}>
        <div className={styles.form_group}>
          <input
            className={styles.form_control}
            type="text"
            name="email"
            ref={emailRef}
            placeholder="Your email"
          />
        </div>

        <div className={styles.form_group}>
          <input
            className={styles.form_control}
            type="text"
            name="password"
            ref={passwordRef}
            placeholder="Your password"
          />
        </div>
        <button type="submit" className={styles.btn}>
          Login
        </button>
      </form>
    </section>
  );
}
