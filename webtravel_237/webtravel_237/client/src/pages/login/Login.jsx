import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
    const userRef = useRef()
    const passwordRef = useRef()
    const {user, dispatch, isFetching} = useContext(Context);
    
    const handleSubmit = async (e) =>{
        e.preventDefault()
        
        dispatch({type: "LOGIN_START"})    
        try {
            const res = await axios.post("/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value,
            })
            dispatch({type: "LOGIN_SUCCESS", payload: res.data})    
        } catch (error) {
            dispatch({type: "LOGIN_FAILURE"})    
        }
    };
    console.log(user)
    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" className="loginInput" placeholder="Enter Your username..." required={true} ref={userRef} />
                <label>Password</label>
                <input type="password" className="loginInput" placeholder="Enter Your password..." required={true} ref={passwordRef} />
                <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
            </form>
            <button className="loginRegisterButton">
                <Link to={"/register"} className="link">Register</Link>
            </button>
        </div>
    );
}
