import { useEffect, useState } from "react";
import Styles from "./Login.module.css"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {

    let [formData , setFormData] = useState({
        email : "",
        password: ""
    });

    const [allusers , setAllusers] = useState([]);

    let navigate = useNavigate(); //return function

    function handleChange(e){
        let {name , value } = e.target;
        setFormData ({...formData , [name]:value});
    }

    async function formSubmit(e){
        e.preventDefault();
        console.log(formData);

        let authUser = allusers.find((user)=>{
            return (
                user.email===formData.email && user.password === formData.password
            );
        });

        if(authUser){
            alert("Login Successfully");

            //setting data to local storage 

            localStorage.setItem("userid" , authUser.id)
            
            navigate("/allproducts");
        }else{
            alert("Please Sign UP")
        }

        setFormData({
            userName:"",
            email : "",
            password: ""
        })
    }

    // const [allusers, setAllusers] = useState([]);

    async function userData(){
        let {data} = await axios.get("http://localhost:5000/users");
        console.log(data)
        setAllusers(data)
    }

    useEffect(() => {
        userData();
    },[])
    
    return(
        <div id={Styles.Login}>

        <div>
            <h2>Login</h2>
            {/* <br/> */}
            <form onSubmit={formSubmit}>

            <input type="text" placeholder="Email" value={formData.email} onChange={handleChange} name="email"></input>
              
            <input type="password" placeholder="Password" value={formData.password} onChange={handleChange} name="password"></input>
                <br/>
                <input id={Styles.btn} type="submit"></input>
            </form>
        </div>
        </div>
    )
}
export default Login;