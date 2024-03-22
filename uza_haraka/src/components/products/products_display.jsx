import React from "react";
import { useParams } from "react-router-dom";
import { ProductsData } from "./products_data";

function ProductDisplay() {
  const { id } = useParams();
  return (
    <div className="w-full flex justify-center pt-4">
      <div className="w-300 h-300 bg-color-teal pointer">
        <h1>{ProductsData[id - 1].name}</h1>{" "}
        <p>{ProductsData[id - 1].description}</p>{" "}
      </div>
    </div>
  );
}

export default ProductDisplay;