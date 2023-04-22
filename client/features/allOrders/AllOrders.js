import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllOrders, selectOrders } from "./allOrdersSlice";

const AllOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <div id="all-orders">
      <h2 className="products-header">All Current and Past Orders</h2>
      {orders && orders.length ? (
        orders.map(order => (
          <div key={order.id}>
            {order.user ? (
              <p>User:&nbsp;&nbsp;{order.user.username}</p>
            ) : (
              <p>Guest</p>
            )}
            <ul>
              {order.products.map(product => (
                <li key={product.id}>{product.order_product.quantity} - {product.name}</li>
              ))}
            </ul>
            <p>Total:&nbsp;&nbsp;${order.products.reduce(
              (acc, product) => acc + product.order_product.price * product.order_product.quantity,
              0).toFixed(2)
            }
          </p>
            {order.checkoutDate ? (
              <p>
                Order date:&nbsp;&nbsp;
                {`${new Date(order.checkoutDate).toLocaleTimeString([], {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric'})}`}
              </p>
              ) : (
              <p style={{color: "red"}}>Active cart</p>
            )}
            <hr />
          </div>
        ))
      ) : (
        <p>No orders.</p>
      )}
    </div>
  );
};

export default AllOrders;
