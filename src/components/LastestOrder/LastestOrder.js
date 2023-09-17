import React, { useEffect, useState } from "react";
import styles from "./LastestOrder.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrderListThunk } from "../../redux/reducers/orderReducer";
import Cookies from "js-cookie";

const statusClassMap = {
  // Booked: "booked_color",
  CHECKIN: "checkin_color",
  CHECKOUT: "checkout_color",
};

export default function LastestOrder() {
  const { userLogin } = useSelector((state) => state.authReducer);
  const { orderList } = useSelector((state) => state.orderReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    //  call action thunk
    dispatch(
      getOrderListThunk(1, 10, userLogin._id, Cookies.get("accessTokenAdmin"))
    );
  }, []);

  // Render table transaction
  const renderOrderList = () => {
    return orderList.map((item) => {
      const statusClass = statusClassMap[item.status] || "";

      const totalPrice = item.items.reduce((sum, current) => {
        return sum + Number(current.product.price) * current.quantity;
      }, 0);

      return (
        <tr key={item._id}>
          <td>{item._id}</td>
          <td>{item.user.fullName}</td>
          <td>{item.user.phoneNumber}</td>
          <td>No information</td>

          <td>{totalPrice.toLocaleString()}</td>
          <td>
            {item.status === "CHECKIN" ? "Chưa Vận Chuyển" : "Đã Vận Chuyển"}
          </td>

          <td>
            {item.status === "CHECKIN" ? "Chưa Thanh Toán" : "Đã Thanh Toán"}
          </td>

          <td>
            <span className={styles[statusClass]}>View</span>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className={styles.info_board_transaction}>
      <h1>Latest Order</h1>
      <div className={styles.table_wrap}>
        <table>
          <thead>
            <tr>
              <th>ID User</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Total</th>
              <th>Delivery</th>
              <th>Status</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>{renderOrderList()}</tbody>

          <tfoot>
            <tr>
              <td colSpan="8"></td>
              <td>Total: {orderList.length}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
