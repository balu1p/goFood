import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

function Card(props) {
  let dispatch = useDispatchCart();
  let priceRef = useRef();
  let data = useCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  let options = props?.options;
  let priceOption = Object.keys(options);

  const handleAddCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItems._id) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItems._id, price: finalPrice, qty: qty });
        return;
      } else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size });
      }
    }
  };

  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div
      className="card mt-3"
      style={{
        width: "18rem",
        maxHeight: "360px",
        transition: "all 0.3s ease-in-out",
        border: "1px solid transparent",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.border = "1px solid #ddd";
        e.currentTarget.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.border = "1px solid transparent";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <img
        src={props.foodItems.img}
        className="card-img-top"
        alt="..."
        style={{ height: "200px", objectFit: "fill" }}
      />
      <div className="card-body">
        <h5 className="card-title">{props.foodItems.name}</h5>
        <div className="container w-100">
          <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>

          <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
            {priceOption?.map((data) => {
              return (
                <option key={data} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
          <div className="d-inline-block fs-5">&#8377;{finalPrice}/-</div>
        </div>
        <hr></hr>
        <div
          className="btn bg-success text-white mx-1"
          onClick={handleAddCart}
          style={{
            cursor: "pointer",
          }}
        >
          Add to Cart
        </div>
      </div>
    </div>
  );
}

export default Card;
