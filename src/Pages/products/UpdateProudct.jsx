import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../index.css";
import { user } from "../../Components/UseContext/Usercontext";

function UpdateProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [accept, setAccept] = useState(false);
  const nav = useNavigate();
  const context = useContext(user);
  const token = context.Auth.token;
  const { id } = useParams();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    setAccept(true);

    axios
      .post(`http://127.0.0.1:8000/api/product/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          nav("/dashboard/products");
          setAccept(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error.response?.data?.message);
        console.error("Status:", error.response?.status);
        console.error("Headers:", error.response?.headers);
      });
  }

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTitle(response.data[0].title);
        setDescription(response.data[0].description);
        setImage(response.data[0].image);
      })
      .catch((error) => {
        console.error("Error fetching product: ", error);
      });
  }, [id, token]);

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data" // Add enctype for file uploads
      style={{ display: "flex", flexDirection: "column", width: "70%" }}
      className="shadow p-3 mt-5 mx-auto"
    >
      <label htmlFor="title" className="mb-2">
        Title:
      </label>
      <input
        type="text"
        placeholder="Title..."
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 rounded-2 mb-2 outline-0"
      />

      <label htmlFor="description" className="mb-2">
        Description:
      </label>
      <input
        type="text"
        placeholder="Description..."
        id="description"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 rounded-2 mb-2"
      />

      <label htmlFor="image" className="mb-2">
        Image:
      </label>
      <input
        type="file"
        id="image"
        onChange={(e) => setImage(e.target.files[0])}
        className="p-2 rounded-2 mb-2"
      />

      <button type="submit" className="btn btn-success mx-3 my-2">
        Update Product
      </button>
    </form>
  );
}

export default UpdateProduct;
