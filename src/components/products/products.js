import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Filters from "../product-details/filters";
import "./product.css";

const Products = () => {
  // /?categoryId=1+

  const [products, setProducts] = useState([]);
  const getUpdate = (e) => {
    setProducts(e);
    console.log(products);
  };
  useEffect(() => {
    setProducts(products);
  }, [products]);
  const getBack = () => {};
  return (
    <div className="row pt-2">
      <p className="m-2 " onClick={getBack}>
        Back
      </p>
      <div className="col-md-3 ">
        <Filters getupdate={getUpdate} />
      </div>
      <div className="col-md-8">
        {products.length > 0 ? (
          <ul className="row list-unstyled box-size">
            <p className="text-end">Total Products : {products.length}</p>
            {products.map((product, index) => (
              <li className="col-md-3 col-sm-12" key={index}>
                <div className="product-box_top">
                  <Link
                    to={`/product-details?id=${product.id}`}
                    className="product-box"
                  >
                    <img src={product.images[0]} alt={product.title} />
                    <div className="price">
                      <span className="d-block">{product.title}</span>
                      <b>₹{product.price}</b>
                    </div>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-primary h1 m-4">No Products Found</div>
        )}
      </div>
    </div>
  );
};

export default Products;
