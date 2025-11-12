import React, { useState, Fragment } from "react";
import styles from "./Navbaar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosLogIn } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";

const Navbar = () => {
  let user_id = localStorage.getItem("userid");
  // console.log(user_id);

  let navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  let logout = () => {
    localStorage.removeItem("userid");
    navigate("/");
  };

  const deleteProfile = async () => {
    console.log("Profile deleted");
    
    let confirmation = confirm("Are you sure")
    console.log(confirmation);

    if(confirmation){
      try{
        await axios.delete(`http://localhost:5000/users/${user_id}`)
        alert("Profile Deleted")
        logout();
      }catch(error){
        console.log("Unable to Delete" , error);
      }
    }
  }

  return (
    <nav id={styles.navbar}>
      <figure>
        <h3>Login</h3>
        <font>
          <IoIosLogIn />
        </font>
      </figure>

      <ul>
        <li>
          <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/">
            Home
          </NavLink>
        </li>

        {user_id ? (
          <Fragment>
            <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>
            <li>
              <NavLink to="/allproducts">All Products</NavLink>
            </li>

            
            <li className={styles.dropdownContainer} onMouseEnter={() => setDropdownVisible(true)} onMouseLeave={() => setDropdownVisible(false)}>
              <BsThreeDotsVertical id={styles.dots} />
              {/* Dropdown Menu */}
              {dropdownVisible && (
                <ul className={styles.dropdownMenu}>
                  <li>
                    <NavLink to={`/editProfile/${user_id}`} className={styles.navDropdown}>Edit Profile</NavLink>
                  </li>
                  <li>
                    <NavLink onClick={deleteProfile} className={styles.navDropdown}>Delete Account</NavLink>
                  </li>
                  <li>
                    <button onClick={logout} className={styles.navDropdown}>Logout</button>
                  </li>
                </ul>
              )}
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
