import React, { useEffect } from "react";
import styles from "./InfoBoard.module.css";
import LastestOrder from "../LastestOrder/LastestOrder";
import { useDispatch, useSelector } from "react-redux";
import { getUserListThunk } from "../../redux/reducers/userReducer";
import Cookies from "js-cookie";

export default function InfoBoard() {
  const { userLogin } = useSelector((state) => state.authReducer);
  const { totalClient } = useSelector((state) => state.userReducer);
  const { totalOrder, totalPayment } = useSelector(
    (state) => state.orderReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getUserListThunk(1, 10, userLogin._id, Cookies.get("accessTokenAdmin"))
    );
  }, []);

  return (
    <section id={styles.info_board}>
      {/* Phần tổng quan widget */}
      <div className={styles.info_board_nav}>
        <div className={styles.info_board_nav_item}>
          <h3 className={styles.info_board_nav_item_title}>Clients</h3>
          <p className={styles.info_board_nav_item_amount}>{totalClient}</p>
          <p
            className={`${styles.info_board_nav_item_icon} ${styles.user_icon}`}
          >
            <i className="fa-regular fa-user" />
          </p>
        </div>

        <div className={styles.info_board_nav_item}>
          <h3 className={styles.info_board_nav_item_title}>Orders</h3>
          <p className={styles.info_board_nav_item_amount}>{totalOrder}</p>
          <p
            className={`${styles.info_board_nav_item_icon} ${styles.order_icon}`}
          >
            <i className="fa-regular fa-cart-shopping" />
          </p>
        </div>

        <div className={styles.info_board_nav_item}>
          <h3 className={styles.info_board_nav_item_title}>Earnings</h3>
          <p className={styles.info_board_nav_item_amount}>
            {Number(totalPayment).toLocaleString()}VND
          </p>
          <p
            className={`${styles.info_board_nav_item_icon} ${styles.earnings_icon}`}
          >
            <i className="fa-solid fa-dollar-sign" />
          </p>
        </div>

        {/* <div className={styles.info_board_nav_item}>
          <h3 className={styles.info_board_nav_item_title}>Balance</h3>
          <p className={styles.info_board_nav_item_amount}>$</p>
          <p
            className={`${styles.info_board_nav_item_icon} ${styles.balance_icon}`}
          >
            <i className="fa-regular fa-money-bill" />
          </p>
        </div> */}
      </div>

      {/* Phần transaction */}
      <LastestOrder />
    </section>
  );
}
