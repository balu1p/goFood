import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function MyOrder1() {
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem("userEmail"));
    await fetch("http://localhost:5000/api/myOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      setOrderData(response);
      console.log("Response :", response);
    });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container">
        {orderData && orderData.orderData && orderData.orderData.order_data ? (
          orderData.orderData.order_data.map((data, index) => (
            <div key={index}
            className="d-flex flex-column bd-highlight mb-3 border border-dark text-center"
            >
              {data.Order_date ? (
                <h4>{data.Order_date}</h4>
              ) : (
                <div>
                  <h5>Name: {data.name}</h5>
                  <p>Price: {data.price}</p>
                  <p>Qty: {data.qty}</p>
                  <p>Size: {data.size}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No data found in this Page :(</p>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default MyOrder1;
