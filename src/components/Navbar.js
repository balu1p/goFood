import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge'
import Modal from "./Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

function Navbar() {
const [cartView, setCartView ] = useState(false);
  const navigate = useNavigate();
  const  data = useCart();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            goFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {
                // console.log("authToken value:", localStorage.getItem("authToken"))
                !localStorage.getItem("authToken") ? (
                  <li className="nav-item">
                    <Link
                      className="nav-link active fs-5"
                      aria-current="page"
                      to="/myOrder"
                    >
                      My Orders
                    </Link>
                  </li>
                ) : (
                  ""
                )
              }
            </ul>
            {localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Signup
                </Link>
              </div>
            ) : (
              <div>
                <div className="btn bg-white text-success mx-1" onClick={()=>setCartView(true)}>My cart {" "}
                <Badge pill bg="danger" >{data.length === 0? "": data.length}</Badge>
                </div>
                {
                  cartView? <Modal onClose={()=> setCartView(false)}><Cart/></Modal>: null
                }
                <div
                  className="btn bg-white text-danger mx-1"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
