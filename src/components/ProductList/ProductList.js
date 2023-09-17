import React, { useEffect } from "react";
import styles from "./ProductList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProductListThunk } from "../../redux/reducers/productReducer";
import { toast } from "react-toastify";

export default function ProductList() {
  const { productList, totalProduct, page, perPage, searchWord } = useSelector(
    (state) => state.productReducer
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    //  call action thunk
    dispatch(getProductListThunk(1, 3, ""));
  }, []);

  //   Hàm render hotel list
  const renderHotelList = () => {
    if (!productList.length) {
      return (
        <tr style={{ textAlign: "center" }}>
          <td colSpan="7" style={{ fontSize: "24px" }}>
            Loading
          </td>
        </tr>
      );
    }
    return productList.map((item) => {
      return (
        <tr key={item._id}>
          <td>{item._id}</td>
          <td className={styles.capitalize}>{item.name}</td>
          <td>{Number(item.price).toLocaleString()}</td>
          <td>
            <img src={item.img1} alt="" />
          </td>
          <td className={styles.capitalize}>{item.category}</td>

          <td>
            <button
              onClick={deleteHotelHandle.bind(null, item._id)}
              className={`${styles.btn_danger} ${styles.btn} ${styles.mr_4}`}
            >
              Delete
            </button>

            <button
              onClick={editHotelHandle.bind(null, item._id, item)}
              className={`${styles.btn_primary} ${styles.btn}`}
            >
              Edit
            </button>
          </td>
        </tr>
      );
    });
  };

  // Edit hotels button handle
  const editHotelHandle = (productId, productInfo) => {
    //  Thông báo tính năng đang xây dựng
    toast.warning("Tính năng này đang xây dựng");
  };

  // Delete hotel by ID
  const deleteHotelHandle = (productId) => {
    //  Thông báo tính năng đang xây dựng
    toast.warning("Tính năng này đang xây dựng");
  };

  //   Hàm tăng giảm phần phân trang
  const changePage = (amount) => {
    let newPage = page + amount;

    if (newPage >= 1 && newPage <= Math.ceil(totalProduct / perPage)) {
      // const actionThunk = getHotelThunk(newPage, perPage);
      // dispatch(actionThunk);
      dispatch(getProductListThunk(newPage, perPage, searchWord));
    }
  };

  return (
    <div className={styles.hotels_list}>
      {/* Phần headig */}
      <div className={styles.hotels_list_heading}>
        <h1>Product list</h1>
        <button
          onClick={() => {
            navigate("/admin/create-product");
          }}
          className={`${styles.btn_success} ${styles.btn}`}
        >
          Add new
        </button>
      </div>

      <div className={styles.hotels_list_search}>
        <input
          type="text"
          placeholder="Enter Search!"
          onChange={(e) =>
            setTimeout(() => {
              dispatch(getProductListThunk(page, perPage, e.target.value));
            }, 1000)
          }
        />
      </div>

      {/* Phần table */}
      <div className={styles.table_wrap}>
        <table>
          <thead>
            <tr>
              {/* <th>
                <input type="checkbox" />
              </th> */}
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Category</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {}
            {renderHotelList()}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="5">
                {page} of {Math.ceil(totalProduct / perPage)}
              </td>
              <td>
                <i
                  onClick={changePage.bind(null, -1)}
                  className="fa-solid fa-angle-left"
                />
                <span>{page}</span>
                <i
                  onClick={changePage.bind(null, 1)}
                  className="fa-solid fa-angle-right"
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
