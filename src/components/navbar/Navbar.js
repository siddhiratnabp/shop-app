import React, { useContext, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { GlobalContext } from "../../context/GlobalState";

const toggleMenuActive = (menuToggleRef) => {
  // This is for the navbar box
  const navbar = menuToggleRef.current.parentElement
  const navbarUl = navbar.children[1]
  
  
  if (navbarUl.classList.contains('active')) {
    navbarUl.classList.remove('active');
    menuToggleRef.current.classList.remove('active')
  } else {
    navbarUl.classList.add('active');
    menuToggleRef.current.classList.add('active')
  }
}

const Navbar = () => {
  const { cart } = useContext(GlobalContext);
  
  const location = useLocation();

  
  const menuToggleRef = useRef();

  useEffect(() => {
    const navbar = menuToggleRef.current.parentElement
    const navbarUl = navbar.children[1]
    if (navbarUl.classList.contains('active')) {
      toggleMenuActive(menuToggleRef)
    }
  }, [location]);

  return (
    <div className="navbar">
      <Link to="/">
      <img src={"/shop-app/Logo - High Quality.jpg"} alt={"Logo"} width={100} className="logo" />
      </Link>
      <ul className="navbar-ul">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/reviews">Reviews</Link></li>
        <li>About</li>
        <li>Contact</li>
        <Link to="/orders">
          <li>Orders</li>
        </Link>
      </ul>
      <div className="cart"> 
      <Link to="/cart">
        &#128722;{" "}
        <span className="card-count" style={{ color: "red" }}>
          ({cart.length})
        </span>  
      </Link>
      </div>
      <div ref={menuToggleRef} className="menu-toggle" onClick={() => toggleMenuActive(menuToggleRef)}></div>
    </div>
  );
};

export default Navbar;
