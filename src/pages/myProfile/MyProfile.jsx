import React, { useEffect, useState } from "react";
import Styles from "./MyProfile.module.css";
import {Navigate, useNavigate, useParams} from "react-router-dom"
import axios from "axios";

const MyProfile = () => {

  let [editUser , setEditUser] = useState({});
  // console.log(editUser);

  let {id} = useParams()
  console.log(id);

  useEffect(() => {
    async function getEditUser() {
      let {data} = await axios.get(`http://localhost:5000/users/${id}`);
      console.log(data);
      setEditUser(data);
    }
    getEditUser();
  },[id]);

  let handleEditUser = (e) => {
    let {name, value} = e.target;
    setEditUser({...editUser , [name]: value});
  }

  let formSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.patch(`http://localhost:5000/users/${id}`)
      localStorage.removeItem("user_id")
    }catch (error){
      console.log("Error while edit user" , error);
    }
  }

  return (
    <div id={Styles.editProfile}>
      <div>
        <h2>Edit Profile</h2>
        <br/>
        <form onSubmit={formSubmit}>
          <input type="text" placeholder="Username" name="userName" value={editUser.userName} onChange={handleEditUser}></input>
          <input type="text" placeholder="Email" name="email" value={editUser.email} onChange={handleEditUser}></input>
          <input type="password" placeholder="Password" name="password" value={editUser.password} onChange={handleEditUser}></input>
          <br />
          <input id={Styles.btn} type="submit"></input>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
