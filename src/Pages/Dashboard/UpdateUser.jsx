import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Form from "../../Components/form/Form";
import { user } from "./../../Components/UseContext/Usercontext";

function Updateuser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const context = useContext(user);

  const token = context.Auth.token;
  const id = window.location.pathname.split("/").slice(-1)[0];
  console.log(id);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/user/showbyid/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setName(response.data[0].name);
        setEmail(response.data[0].email);
      })
      .catch((error) => {
        console.error("Error fetching users: ", error);
      });
  }, [id]);

  return (
    <div className="Container">
      <Form
        sumbit="Update"
        name={name}
        email={email}
        endpoint={`user/update/${id}`}
        path="/dashboard/users"
      />
    </div>
  );
}

export default Updateuser;
