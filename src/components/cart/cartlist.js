import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CategiorsContext } from "../../store/lists";
import CartPromo from "./cartpromo";
import PaymentIn from "./paymentinte";

const CartList = () => {
  const { cart, setCart } = useContext(CategiorsContext);
  const [items, setItems] = useState(cart);
  const [cost, setCost] = useState();
  const [couponCheck, setCouponcheck] = useState(false);
  const [promocheck, setPromocheck] = useState(false);
  const [couponvalue, setCouponValue] = useState();
  const [cpn, setCpn] = useState();

  const reMoveItme = (product) => {
    removePromos();
    // console.log(product);
    const newArr = items.filter((item, index) => item.id !== product.id);
    setItems(newArr);
    setCart(newArr);
  };
  const hidepop = (e) => {
    setPromocheck(e);
  };
  const getpromoUpdate = (t) => {
    setCouponcheck(true);
    setCpn(t);

    if (t.flat !== null) {
      setCouponValue(t.flat);
    } else if (t.disper !== null) {
      if (t.maxdis !== null) {
        const getnew = ((t.disper / 100) * cost).toFixed(2);
        if (getnew > t.maxdis) {
          setCouponValue(t.maxdis);
        } else {
          setCouponValue(getnew);
        }
      } else {
        const getnew = ((t.disper / 100) * cost).toFixed(2);

        // const getnew = 100 % t.disper;
        setCouponValue(getnew);
      }
    }
  };
  const getPromos = () => {
    setPromocheck(true);
  };
  const removePromos = () => {
    setPromocheck(false);
    setCouponValue(0);
    setCouponcheck(false);
  };

  const changeQuantitydec = (product) => {
    const newupd = cart.map((item, index) => {
      return {
        ...item,
        quantity: product.id === item.id ? item.quantity - 1 : item.quantity,
        updateprice:
          product.id === item.id
            ? Number(item.price) * Number(item.quantity)
            : item.price,
      };
    });
    // console.log(...newupd);
    setCart(newupd);
    // setItems(newupd);
    console.log(items);
    console.log(cart);
  };

  const changeQuantityinc = (product) => {
    const newupd = cart.map((item, index) => {
      return {
        ...item,
        quantity: product.id === item.id ? item.quantity + 1 : item.quantity,
        updateprice:
          product.id === item.id
            ? Number(item.price) * Number(item.quantity)
            : item.price,
      };
    });
    // console.log(...newupd);
    setCart(newupd);
    // setItems(newupd);
    console.log(items);
    console.log(cart);
  };

  useEffect(() => {
    setItems(cart);
    const newupd = cart.map((item, index) => {
      return {
        ...item,
        updateprice: item.price,
      };
    });
    // setCart(newupd);

    // console.log(items);
    const newCost = cart.reduce(
      (prev, acc) => prev + acc.price * acc.quantity,
      0
    );
    setCost(newCost);
  }, [cart, items, reMoveItme]);

  return (
    <div className="container mt-2  ">
      <div>
        <CartPromo
          promocheck={promocheck}
          cost={cost}
          getpromoUpdate={getpromoUpdate}
          hidepop={hidepop}
        />
      </div>
      <div className="border-bottom p-2">
        <Link to="/products?id=1" className="btn btn-warning ">
          Back to Products
        </Link>
      </div>
      <div className="row mt-3">
        <div className="col-md-8  shadow p-3 mb-5 bg-body rounded">
          <table className="table">
            <thead className="">
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="dis">
                      <div className="">
                        <p className="cart-img">
                          {/* <img src={item.images[0]} alt={index} /> */}
                        </p>
                      </div>
                      <div className="cart-info">
                        <h6>{item.title}</h6>
                        <p className="text-muted">{item.description}</p>
                        <p
                          onClick={() => reMoveItme(item)}
                          className="text-danger fs-6 cp"
                        >
                          Remove
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="qunup">
                      <span
                        className={
                          item.quantity === 1
                            ? "disabled minus"
                            : "enable minus"
                        }
                        onClick={() => changeQuantitydec(item)}
                      >
                        -
                      </span>
                      <small className="qun">{item.quantity}</small>
                      <span
                        className="plus"
                        onClick={() => changeQuantityinc(item)}
                      >
                        +
                      </span>
                    </div>
                  </td>
                  <td>
                    <b>₹{item.quantity * item.price}</b>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-4 ">
          <div className="ml-24 shadow p-3 mb-5 bg-body rounded">
            <p className="row ">
              <span className="col-md-6">Price ({cart.length} item) </span>{" "}
              <b className=" col-md-6 d-inline text-end">₹{cost}</b>
            </p>
            {couponCheck && (
              <p className="row mt-3 ">
                <span className="col-md-6">
                  Discount<span className="text-success"> ({cpn.name})</span>{" "}
                </span>
                <b className=" col-md-6 d-inline text-end text-success">
                  -₹{couponvalue}
                </b>
              </p>
            )}

            <p className="row  mt-3 pb-3 border-bottom ">
              <span className="col-md-6">Delivery Charges</span>{" "}
              <b className="col-md-6 d-inline text-end text-success ">
                ₹{cost >= 500 ? "FREE" : 50}
              </b>
            </p>
            <p className="row  mt-3 pb-3 border-bottom-dotted ">
              <b className="col-md-6">Total Payble </b>
              <b className=" col-md-6 d-inline text-end">
                ₹
                {cost -
                  (couponCheck ? couponvalue : 0) +
                  (cost >= 500 ? 0 : 50)}
              </b>
            </p>
            <PaymentIn />
            {cart.length > 0 && (
              <p className="row   ">
                {couponCheck ? (
                  <span
                    className=" col-md-6 d-inline text-danger cp"
                    onClick={removePromos}
                  >
                    Remove Coupon
                  </span>
                ) : (
                  <span
                    className=" col-md-6 d-inline text-primary"
                    onClick={getPromos}
                  >
                    Apply Promo
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartList;
