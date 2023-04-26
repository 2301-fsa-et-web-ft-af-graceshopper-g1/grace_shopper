import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import { fetchCartItemsAsync, selectMyCart } from "../myCart/myCartSlice";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => !!state.auth.me.isAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };
  // todo i am commenting out this code because this causes some errors, we can consider leaving this feature out as it is not part of t1, will uncomment after we get the backend and everything working then we can work on this without any issues
  // const cartItems = useSelector(selectMyCart).products;
  // const userId = useSelector((state) => state.auth.me.id);

  // useEffect(() => {
  //   dispatch(fetchCartItemsAsync(userId));
  // }, [dispatch, userId]);

  return (
    <div>
      <h1>Grace-Shopper</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/products">Products</Link>
            {isAdmin && <Link to="/addProduct">Add Product</Link>}
            {isAdmin && <Link to="/editProduct">Edit Product</Link>}
            {isAdmin && <Link to="/allUsers">All Users</Link>}
            {isAdmin && <Link to="/cart/orders">All Orders</Link>}
            <Link to={"/cart"}>
              {" "}
              My Cart
              {/* (
              {cartItems && cartItems.length
                ? cartItems.reduce(
                    (acc, item) => acc + item.order_product.quantity,
                    0
                  )
                : 0}
              ) */}
            </Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/products">Products</Link>
            <Link to="/cart">My Cart</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
