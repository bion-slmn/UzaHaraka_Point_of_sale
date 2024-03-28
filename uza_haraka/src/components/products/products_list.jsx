import React from "react";
import { ProductsData } from "./products_data";
import { useNavigate } from "react-router-dom";
function ListProducts() {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-center pt-4">
      <div className="flex-col display-inline">
        {ProductsData.map((product) => {
          return (
            <div
              className="grid w-300 h-300 bg-color-teal pointer"
              onClick={() => {
                navigate(`/products/${product.id}`);
              }}
            >
              <h1>{product.name}</h1> <p>{product.description}</p>{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListProducts;