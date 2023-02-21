import React, { Fragment, useEffect, useState } from "react";
import { Categories } from "../services/api";

import UseFetch from "../services/custom/fetchdata";

export const CategiorsContext = React.createContext({
  // clist: [],
  // user: [],
});
// export const userContext = React.createContext({});

const AuthContext = (props) => {
  const [data] = UseFetch(Categories);
  const [user, setUser] = useState([]);
  const [token, setToken] = useState();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const user_info = localStorage.getItem("user_info");
    const access_token = localStorage.getItem("access_token");
    const newuserdata = JSON.parse(user_info);
    user_info && setUser(newuserdata);
    access_token && setToken(access_token);
  }, []);
  // useEffect(() => {}, [user]);

  return (
    <Fragment>
      <CategiorsContext.Provider
        value={{ clist: data, user, setUser, token, setToken, cart, setCart }}
      >
        {props.children}
      </CategiorsContext.Provider>
    </Fragment>
  );
};

export default AuthContext;
