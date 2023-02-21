import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import UseFetch from "../../services/custom/fetchdata";
import { SingleProduct } from "../../services/api";
import { CategiorsContext } from "../../store/lists";

const ProductDetails = () => {
  const { cart, setCart } = useContext(CategiorsContext);
  const [serchParasm] = useSearchParams();
  const param = serchParasm.get("id");

  const [cartcheck, setCartcheck] = useState(true);
  const [productinfo] = UseFetch(SingleProduct + `/${param}`);
  const [product, setProduct] = useState(productinfo);
  // console.log(product);
  const addCart = (item) => {
    console.log(product);

    setCart([...cart, product]);
    setCartcheck(false);
  };
  useEffect(() => {
    setProduct({ ...productinfo, quantity: 1 });

    const cartch = cart.filter((item, index) => item.id === Number(param));
    console.log(cartch);
    if (cartch.length > 0) {
      setCartcheck(false);
    } else {
      setCartcheck(true);
    }
  }, [productinfo, cart]);
  return (
    <Fragment>
      <div className="container">
        <div className="row pd-info">
          <div className="col-md-5">
            <p>
              {product.images && (
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="prodcuindo"
                />
              )}
            </p>
          </div>
          <div className="col-md-7">
            <h2 className="heading">{product.title}</h2>
            <p className="pt-2 text-muted">{product.description}</p>
            <h3 className="h1">
              ₹{product.price}{" "}
              <span className="text-muted tsg">
                ₹{product.price + product.price}
              </span>
              <span className="pl-4 text-success tsgs">50% off</span>
            </h3>
            <button className=" col-md-6 d-block  bg-dark mt-4 text-light rounded">
              Add To Wishlist
            </button>
            {cartcheck ? (
              <button
                className="bg-warning col-md-6  btn-primary p-2 mt-3 rounded "
                onClick={({}) => addCart()}
              >
                Add To Cart
              </button>
            ) : (
              <Link
                to="/cart"
                className="bg-warning col-md-6 d-block text-center text-dark   btn-primary p-2 mt-3 rounded"
              >
                Go To Cart
              </Link>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetails;
