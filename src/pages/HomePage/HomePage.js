import React from "react";
import styles from "./HomePage.module.css";
import InfoBoard from "../../components/InfoBoard/InfoBoard";
import { useSelector } from "react-redux";
import RequireLogin from "../../components/RequireLogin/RequireLogin";

export default function HomePage() {
  const { isLogin } = useSelector((state) => state.authReducer);

  return (
    <main id={styles.home_page}>
      {!isLogin ? <RequireLogin /> : <InfoBoard />}
      {/* <InfoBoard /> */}
    </main>
  );
}
