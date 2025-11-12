import React, { useEffect, useState } from "react";
import Styles from "./Cart.module.css";
import axios from "axios";

const Cart = () => {
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const userid = localStorage.getItem("userid");

  useEffect(() => {
    async function getCartItems() {
      let { data } = await axios.get(`http://localhost:5000/users/${userid}`);
      setUserDetails(data);
      setIsLoading(false);
    }
    getCartItems();
  }, []);

  const handleRemoveFromCart = async (productid) => {
    try {
      let { data } = await axios.get(`http://localhost:5000/users/${userid}`);

      let updatedCart = data.cart
        ?.map((item) => {
          if (item.id === productid) {
            if (item.quantity > 1) {
              return {
                ...item,
                quantity: item.quantity - 1,
                price: Math.floor(
                  (item.price / item.quantity) * (item.quantity - 1)
                ),
              };
            } else {
              return null;
            }
          }
          return item;
        })
        .filter((item) => item !== null);

      await axios.patch(`http://localhost:5000/users/${userid}`, {
        cart: updatedCart,
      });
      setUserDetails({ ...data, cart: updatedCart });
    } catch (error) {
      console.log("Error while removing product", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div id={Styles.cart}>
      {userDetails?.cart?.length > 0 ? (
        userDetails.cart.map((item) => (
          <section key={item.id}>
            <img src={item.image} id={Styles.pdImage} height={200} />
            <h4>{item.title.slice(0, 30)}...</h4>
            <h4>Quantity: {item.quantity}</h4>
            <h4>
              Price: {item.quantity} × {item.price} ={" "}
              {item.quantity * item.price}
            </h4>
            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
          </section>
        ))
      ) : (
        <h3>Your cart is empty 🛒</h3>
      )}
    </div>
  );
};

export default Cart;
