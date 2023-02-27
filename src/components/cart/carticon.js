import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CategiorsContext } from "../../store/lists";

const CartIcon = () => {
  const cartCount = useContext(CategiorsContext);
  const [count, setCount] = useState(cartCount.cart);
  const [cartcount, setCartcount] = useState();

  useEffect(() => {
    setCount(cartCount.cart);

    const newcart = cartCount.cart.reduce(
      (prev, acc) => prev + acc.quantity,
      0
    );
    setCartcount(newcart);
  }, [cartCount, count]);

  return (
    <div className="">
      {/* <div className="d-inline">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
          <path
            fill-rule="evenodd"
            d="M24.804 43.648 24 44l-.804-.352C12.862 37.313 2 22.893 2 14.884 2.035 8.326 7.404 3.002 14 3.002c4.169 0 7.849 2.128 10 5.349a12.014 12.014 0 0 1 10-5.349c6.596 0 11.965 5.324 12 11.882 0 8.009-10.862 22.429-21.196 28.764zM34 4.993a10.006 10.006 0 0 0-8.335 4.46L24 11.946l-1.665-2.494A10.008 10.008 0 0 0 14 4.993c-5.484 0-9.971 4.442-10 9.891 0 7.064 10.234 20.808 20 26.917 9.766-6.109 20-19.852 20-26.907-.029-5.459-4.516-9.901-10-9.901z"
            clip-rule="evenodd"
          />
        </svg>
      </div> */}
      <div>
        <Link to="/cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 24 24"
          >
            <path d="M8.5,19A1.5,1.5,0,1,0,10,20.5,1.5,1.5,0,0,0,8.5,19ZM19,16H7a1,1,0,0,1,0-2h8.49121A3.0132,3.0132,0,0,0,18.376,11.82422L19.96143,6.2749A1.00009,1.00009,0,0,0,19,5H6.73907A3.00666,3.00666,0,0,0,3.92139,3H3A1,1,0,0,0,3,5h.92139a1.00459,1.00459,0,0,1,.96142.7251l.15552.54474.00024.00506L6.6792,12.01709A3.00006,3.00006,0,0,0,7,18H19a1,1,0,0,0,0-2ZM17.67432,7l-1.2212,4.27441A1.00458,1.00458,0,0,1,15.49121,12H8.75439l-.25494-.89221L7.32642,7ZM16.5,19A1.5,1.5,0,1,0,18,20.5,1.5,1.5,0,0,0,16.5,19Z" />
          </svg>
          <span>{cartcount}</span>
        </Link>
      </div>
    </div>
  );
};
export default CartIcon;
