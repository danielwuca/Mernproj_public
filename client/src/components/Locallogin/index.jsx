import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

const Login = ({ setAuth }) => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/localauth";
      await axios.post(url, data).then((res) => {
        localStorage.setItem("token", res.data.data);
        localStorage.setItem("auth", "true");
        setAuth(true);
        dispatch({
          type: actionType.SET_USER,
          user: { user: res.data.user },
        });
        navigate("/home");
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            <Link to="/forgot-password" style={{ alignSelf: "flex-start" }}>
              <p style={{ padding: "0 15px" }}>Forgot Password ?</p>
            </Link>
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h2>Don't have a account ?</h2>
          <Link to="/localsignup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
          <h2>Wanna login via Google ?</h2>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Login in with Google
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
