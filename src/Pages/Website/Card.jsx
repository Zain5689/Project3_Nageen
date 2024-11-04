import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { user } from "./../../Components/UseContext/Usercontext";

function Card() {
  const [products, setProducts] = useState([]);
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
  }, []);

  library.add(fas);

  return (
    <>
      {products.map((product, index) => {
        return (
          <>
            <div className="card mb-2" key={index}>
              <img
                src={product.image}
                className="card-img-top"
                alt="..."
                width={"400px"}
                height={"300px"}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default Card;
