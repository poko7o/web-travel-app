import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const publicFolder = "http://localhost:5000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="topBar">
      <div className="topLeft">
      
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to={"/"} className="link">
              HOME
            </Link>
          </li>
          {user && user.userRole === "ADMIN" && (
            <li className="topListItem">
              <Link to={"/users"} className="link">
                USERS
              </Link>
            </li>
          )}
         
          
          {user && user.userRole === "ADMIN" && (
            <li className="topListItem">
              <Link to={"/write"} className="link">
                ADD
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to={"/settings"}>
            <img
              className="topImg"
              src={publicFolder + user.profilePic}
              alt={user.username}
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link to={"/login"} className="link">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link to={"/register"} className="link">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <li
          className="topListItem"
          onClick={handleLogout}
          style={{ marginLeft: "35px", listStyle: "none" }}
        >
          {user && "LOGOUT"}
        </li>
      </div>
    </div>
  );
}
