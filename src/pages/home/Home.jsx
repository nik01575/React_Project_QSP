import React from "react";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div id={styles.home}>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to <span>ShopEase</span></h1>
        <p className={styles.subtitle}>
          A premium shopping experience powered by modern APIs and seamless user design.
        </p>
        <button className={styles.btn}>Explore Products</button>
      </div>
      <div className={styles.bgGlow}></div>
    </div>
  );
};

export default Home;
