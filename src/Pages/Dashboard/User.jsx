import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { user } from "./../../Components/UseContext/Usercontext";

function User() {
  const [users, setUsers] = useState([]);
  const [run, setRun] = useState(0);
  const context = useContext(user);

  const token = context.Auth.token;
  console.log(token);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/show", {
        headers: {
          Accept: "application/json",
          // Add a space after "Bearer" to properly format the token
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [run]);

  async function Delete(id) {
    try {
      const repo = await axios.delete(
        `http://127.0.0.1:8000/api/user/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token, // Ensure token is passed for delete too
          },
        }
      );
      if (repo.status === 200) {
        setRun((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const ShowData = users.map((user, index) => (
    <tr key={index}>
      <th scope="row">{user.id}</th>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <FontAwesomeIcon
          icon="fa-solid fa-trash"
          style={{
            padding: "10px",
            fontSize: "20px",
            cursor: "pointer",
          }}
          className="text-danger"
          onClick={() => Delete(user.id)}
        />
        <Link to={`${user.id}`}>
          <FontAwesomeIcon
            icon="fa-solid fa-pen-to-square"
            style={{
              padding: "10px",
              fontSize: "20px",
              cursor: "pointer",
            }}
            className="text-primary"
          />
        </Link>
      </td>
    </tr>
  ));

  library.add(fas);
  return (
    <>
      <table className="table text-center">
        <thead className="table-primary">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">User</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>{ShowData}</tbody>
      </table>
    </>
  );
}

export default User;
