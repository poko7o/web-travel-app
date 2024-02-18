import axios from "axios";
import { useEffect, useState } from "react";
import "./sidebar.css";

export default function Sidebar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/categories");
      setCategories(res.data);
    };
    getCategories();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">DOBRODOŠLI U TURISTIČKU AGENCIJU WEB TRAVEL</span>
        <img
          className="sidebarImg"
          src="https://media.nomadicmatt.com/2023/madriditinerary.jpeg"
          alt=""
        />
        <p>
          Putujte na omiljena mjesta po najpovoljnijoj cijeni
        </p>
      </div>

      
    </div>
  );
}
