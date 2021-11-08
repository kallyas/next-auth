import React, { useEffect }from "react";
import styles from "../../styles/Success.module.css";
import { useDispatch } from "react-redux";
import { clearCart } from "../../features/cart/cartSlice"

const Success = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCart());
  } , [dispatch])
  return (
    <div className="parent container d-flex justify-content-center align-items-center h-100">
      <div className={styles.card}>
        <div
          style={{
            borderRadius: "200px",
            height: "200px",
            width: "200px",
            background: "#F8FAF5",
            margin: "0 auto",
          }}
        >
          <i className={styles.checkmark}>✓</i>
        </div>
        <h1 style={{ color: "#9abc66"}}>Success</h1>
        <p>
          We received your purchase request;
          <br /> we shall be in touch shortly!
        </p>
      </div>
    </div>
  );
};

export default Success;
