import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import { user } from "../UseContext/Usercontext";
import Cookies from "universal-cookie";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const userNow = useContext(user);
  const tokenCookies = new Cookies();

  const nav = useNavigate();

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);

    if (password.length < 8) {
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
      });
      window.localStorage.setItem("email", email);
      const token = response.data.data.token;
      const userDetails = response.data.data.user;
      userNow.setAuth({ token, userDetails });
      nav("/dashboard");
      tokenCookies.set("tokencookies", token);
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
    }
  }

  return (
    <div>
      <Header />
      <div className="Container">
        <form onSubmit={Submit}>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
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
            <p className="error">Password must be at least 8 characters long</p>
          )}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
