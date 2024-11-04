import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { user } from "./../../Components/UseContext/Usercontext";

function Product() {
  const [products, setProducts] = useState([]);
  const [run, setRun] = useState(0);
  const context = useContext(user);
  const token = context.Auth.token;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/product/show", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [run]);

  async function Delete(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setRun((prev) => prev + 1);
    } catch (error) {
      console.error(error.message);
    }
  }

  const ShowData = products.map((product, index) => (
    <tr key={index}>
      <th scope="row">{product.id}</th>
      <td>{product.title}</td>
      <td>{product.description}</td>
      <td>
        <img
          src={product.image}
          alt={product.title}
          style={{ maxWidth: "100px", height: "70px" }}
        />
      </td>

      <td>
        <FontAwesomeIcon
          icon="trash"
          style={{ padding: "10px", fontSize: "20px", cursor: "pointer" }}
          className="text-danger"
          onClick={() => Delete(product.id)}
        />
        <Link to={`${product.id}`}>
          <FontAwesomeIcon
            icon="pen-square"
            style={{ padding: "10px", fontSize: "20px", cursor: "pointer" }}
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
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Image</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>{ShowData}</tbody>
      </table>
    </>
  );
}

export default Product;
