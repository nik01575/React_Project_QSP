import React, { useEffect, useState } from "react";
import styles from "./AllProdects.module.css";
import axios from "axios";

const AllProdects = () => {
  let [productData, setProductData] = useState([]);

  let userid = localStorage.getItem("userid");

  async function api() {
    console.log("All Products Data is getting");
    let res = await fetch("https://fakestoreapi.com/products");
    let data = await res.json();
    setProductData(data);
  }

  useEffect(() => {
    api();
  }, []);

  let handleAddToCart = async (product) => {
    console.log(product);
    let { data } = await axios.get(`http://localhost:5000/users/${userid}`);
    console.log(data);

    let updatedCart = data.cart ? [...data.cart] : [];

    let existingProduct = updatedCart.find((ele) => ele.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    await axios.patch(`http://localhost:5000/users/${userid}`, {
      cart: updatedCart,
    });
    console.log("Product Added");
  };

  return (
    <div id={styles.allproducts}>
      {productData.map((ele) => {
        let { id, brand, color, title, image, price } = ele;

        return (
          <section key={id} className={styles.card}>
            <img src={image} alt={title} className={styles.image} />
            <div className={styles.details}>
              <p className={styles.title}>{title.slice(0, 40)}...</p>
              <h5 className={styles.price}>₹ {price}</h5>
              <p className={styles.brand}>Brand: {brand || "N/A"}</p>
              <p className={styles.color}>Color: {color || "N/A"}</p>
              <button
                onClick={() => handleAddToCart(ele)}
                className={styles.cartBtn}
              >
                Add To Cart
              </button>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default AllProdects;
