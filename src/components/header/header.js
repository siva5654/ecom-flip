import { Fragment, useContext, useEffect, useState } from "react";
import "./header.css";
import Login from "../login/login";
import { Link } from "react-router-dom";
import { CategiorsContext } from "../../store/lists";
import CartIcon from "../cart/carticon";

const Header = () => {
  const dataContext = useContext(CategiorsContext);
  const { user, setUser } = useContext(CategiorsContext);
  const { token, setToken } = useContext(CategiorsContext);

  console.log(dataContext);
  const [loginPop, setLoinpop] = useState(false);
  const [login, setLogin] = useState(true);
  const [profile, setProfile] = useState(dataContext.user);
  const [islog, setIslog] = useState(false);

  const loginCheck = () => {
    setLoinpop(true);
  };
  const ispopoff = (e) => {
    setLoinpop(e);
  };
  const logincheck = (e) => {
    console.log(login);
    setLogin(e);
  };
  const islogpop = () => {
    setIslog(!islog);
  };
  const userlogout = () => {
    // alert("logout");
    setLogin(true);
    setIslog(false);
    setUser([]);
    setToken("");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_info");
  };
  useEffect(() => {
    setProfile(dataContext.user);
    token === "" || token === undefined ? setLogin(true) : setLogin(false);
  }, [dataContext, token, user]);
  return (
    <Fragment>
      <header className="fc_header">
        <div>
          <div>
            <Link to="/" className="fc_link">
              <img
                alt="logo"
                className="fc_logo"
                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png"
              ></img>
            </Link>
          </div>
        </div>

        <div className="cart_Section_parent">
          <div className="cart_Section d-inline">
            <CartIcon />
          </div>
          {login && (
            <button className="d-inline" onClick={(e) => loginCheck()}>
              Login
            </button>
          )}
          {!login && (
            <div className="profileinfo d-inline">
              <div onClick={islogpop}>
                <p className="d-inline p-3">{profile.name}</p>
                <img
                  src={profile.avatar}
                  width="42"
                  height="42"
                  alt={profile.name}
                  className="rounded-circle d-inline"
                />
              </div>
              {islog && (
                <div className="logoutpop">
                  <p onClick={userlogout}>logout</p>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
      <Login
        islogin={loginPop}
        ischeckpopoff={ispopoff}
        logincheck={logincheck}
      />
    </Fragment>
  );
};

export default Header;
