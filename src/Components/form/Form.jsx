import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { user } from "../UseContext/Usercontext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function Form(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [accept, setAccept] = useState(false);

  const context = useContext(user);
  const token = context.Auth.token;

  let userNow = useContext(user);
  console.log(userNow);
  const tokenCookies = new Cookies();
  const nav = useNavigate();
  useEffect(() => {
    setName(props.name);
    setEmail(props.email);
  }, [props.name, props.email]);

  function Submit(e) {
    e.preventDefault();
    setAccept(true);
    {
      axios
        .post(
          `http://127.0.0.1:8000/api/${props.endpoint}`,
          {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordR,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          // console.log(response.data);
          if (response.status === 200) {
            // Store token and user details in context
            const token = response.data.data.token;
            const userDetails = response.data.data.user;

            userNow.setAuth({ token, userDetails });
            tokenCookies.set("tokencookies", token);
            nav(props.path);
            // Save email to localStorage if needed
            if (props.haslocalstorage) {
              window.localStorage.setItem("email", email);
            }
            setAccept(false);
          }
        })
        .catch((error) => {
          console.error("Error:", error.response?.data?.message);
          console.error("Status:", error.response?.status);
          console.error("Headers:", error.response?.headers);
        });
    }
  }

  return (
    <form onSubmit={Submit}>
      <label htmlFor="Name">Name: </label>
      <input
        type="text"
        placeholder="Name..."
        id="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {accept && name === "" && <p className="error">Name not Correct</p>}

      <label htmlFor="email">Email: </label>
      <input
        type="text"
        placeholder="Email..."
        id="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password: </label>
      <input
        type="password"
        placeholder="Password..."
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {accept && password.length < 8 && (
        <p className="error">Password must be at least 8 characters</p>
      )}

      <label htmlFor="passwordr">Repeat Password: </label>
      <input
        type="password"
        placeholder="Repeat Password..."
        id="passwordr"
        value={passwordR}
        onChange={(e) => setPasswordR(e.target.value)}
      />
      {password !== passwordR && accept && (
        <p className="error">Passwords do not match</p>
      )}
      <button type="submit">{props.sumbit}</button>
    </form>
  );
}

export default Form;
