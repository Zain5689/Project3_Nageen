import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

function Header() {
  const cookies = new Cookies();
  const token = cookies.get("tokencookies");
  console.log(token);

  async function HandleLogout() {
    try {
      await axios.post(`http://127.0.0.1:8000/api/logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // If the request is successful, remove the token cookie
      cookies.remove("tokencookies");
      window.location.pathname = "/";
    } catch (error) {
      // Handle errors here
      console.error("Error during logout:", error);

      // Even if an error occurs, still remove the token cookie
      cookies.remove("tokencookies");
      window.location.pathname = "/";
    }
  }
  return (
    <>
      <div className="shadow">
        <div className="container ">
          <nav className="d-flex">
            <div className="d-flex">
              <Link to={"/"} className="btn fs-4">
                Home
              </Link>
            </div>
            <div className="d-flex">
              {!token ? (
                <>
                  <Link className="btn btn-success" to={"/rgister"}>
                    SignUp
                  </Link>
                  <Link className="btn btn-success" to={"/login"}>
                    SignIn
                  </Link>
                </>
              ) : (
                <>
                  <Link className="btn btn-success" to={"/dashboard"}>
                    Dashboard
                  </Link>
                  <Link className="btn btn-success" onClick={HandleLogout}>
                    Log Out
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Header;
