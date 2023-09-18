import React, { useEffect } from "react";
import styles from "./HomePage.module.css";
import InfoBoard from "../../components/InfoBoard/InfoBoard";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import RequireLogin from "../../components/RequireLogin/RequireLogin";
import { onLogout } from "../../redux/reducers/authReducer";
import { toast } from "react-toastify";

export default function HomePage() {
  const { isLogin } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const currentCookiesToken = Cookies.get("accessTokenAdmin");
    const localToken = JSON.parse(localStorage.getItem("CURRENT_ADMIN_USER"));

    if (!currentCookiesToken && localToken) {
      dispatch(onLogout());
      toast.warning("Vui lòng đang nhập lại!");
    }
  }, []);

  return (
    <main id={styles.home_page}>
      {!isLogin ? <RequireLogin /> : <InfoBoard />}
    </main>
  );
}
