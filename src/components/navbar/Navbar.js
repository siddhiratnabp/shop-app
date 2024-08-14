import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { GlobalContext } from "../../context/GlobalState";

const Navbar = () => {
  const { cart } = useContext(GlobalContext);
  return (
    <div className="navbar">
      <Link to="/">
      <img src={"/shop-app/Logo - High Quality.jpg"} alt={"Logo"} width={100} />
      </Link>
      <ul className="navbar-ul">
        <li><Link to="/">Home</Link></li>
        <li>Shop</li>
        <li>Reviews</li>
        <li>About</li>
        <li>Contact</li>
        <Link to="/cart">
          <li>
            &#128722;{" "}
            <span className="card-count" style={{ color: "red" }}>
              ({cart.length})
            </span>
          </li>
        </Link>
        <Link to="/orders">
          <li>Orders</li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
