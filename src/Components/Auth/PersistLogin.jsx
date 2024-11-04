import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { user } from "../UseContext/Usercontext";
import Cookies from "universal-cookie";
import LoadingSreen from "../Loading/LoadingSreen";

const PersistLogin = () => {
  const [loading, setLoading] = useState(true);
  const context = useContext(user);
  const token = context.Auth.token;
  const cookies = new Cookies();
  const gettoken = cookies.get("tokencookies");

  useEffect(() => {
    async function refresh() {
      try {
        if (!token) {
          const response = await axios.post(
            `http://127.0.0.1:8000/api/refresh`,
            null,
            {
              headers: {
                Authorization: "Bearer " + gettoken,
              },
            }
          );
          cookies.set("tokencookies", response.data.token); // Corrected token setting
          context.setAuth(() => ({
            userDetails: response.data.user,
            token: response.data.token,
          }));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    refresh();
  }, []);

  return loading ? <LoadingSreen /> : <Outlet />;
};

export default PersistLogin;
