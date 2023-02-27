import { Fragment, useState, useEffect, useContext } from "react";
import { Loginuser, SingleUser } from "../../services/api";
import { CategiorsContext } from "../../store/lists";

const Login = (props) => {
  const { user, setUser } = useContext(CategiorsContext);
  const { token, setToken } = useContext(CategiorsContext);

  const [loginPop, setLoinpop] = useState(false);
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const ispopoff = () => {
    console.log(token);
    setLoinpop(false);
    props.ischeckpopoff(false);
  };
  useEffect(() => {
    setLoinpop(props.islogin);
  }, [props.islogin]);

  const userLogin = (e) => {
    e.preventDefault();

    const data = {
      email: username,
      password: password,
    };
    console.log(data);
    fetch(Loginuser, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.msg === "Unauthorized" || result.statusCode === 401) {
          alert("Invalid Credentials");
        } else {
          fetch(SingleUser, {
            headers: {
              Authorization: `Bearer ${result.access_token}`,
            },
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              localStorage.setItem("user_info", JSON.stringify(result));
              setUser(result);
            });

          props.logincheck(false);
          setToken(result.access_token);
          localStorage.setItem("access_token", result.access_token);
          localStorage.setItem("refresh_token", result.refresh_token);
          setUserName("");
          setPassword("");
          ispopoff(false);
          console.log(user);
        }
      });
  };

  const getUsername = (e) => {
    setUserName(e.target.value);
  };
  const getPassword = (e) => {
    setPassword(e.target.value);
  };
  const getUser = (e) => {
    if (e.target.value === "") {
      alert("REQUIRED");
    }
  };
  return (
    <Fragment>
      {loginPop && (
        <div className="modal_pare">
          <div className="modal_pop">
            <form onSubmit={userLogin}>
              <div className="form-grp">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  // value={username}
                  className="form-control"
                  onChange={getUsername}
                  onBlur={getUser}
                />
              </div>
              <div className="form-grp">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  // value={password}
                  onChange={getPassword}
                />
              </div>
              <div className="form-grp">
                <input type="submit" value="Login" />
              </div>
              <div className="form-grp">
                <label onClick={ispopoff}>close</label>
              </div>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
