import { Route, Routes } from "react-router-dom";
import Register from "./Components/Auth/SignUp";
import SignIn from "./Components/Auth/SignIn";
import Home from "./Pages/Website/Home";
import Dashboard from "./Pages/Dashboard/Dashboard";
import User from "./Pages/Dashboard/User";
import Updateuser from "./Pages/Dashboard/UpdateUser";
import CreactUser from "./Pages/Dashboard/CreactUser";
import RequireAuth from "./Components/Auth/RequireAuth";
import PersistLogin from "./Components/Auth/PersistLogin";
import Product from "./Pages/products/Product";
import UpdateProduct from "./Pages/products/UpdateProudct";
import NewProduct from "./Pages/products/Newproduct";

function App() {
  return (
    <>
      <Routes>
        <Route path="rgister" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="login" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="users" element={<User />} />
              <Route path="users/:id" element={<Updateuser />} />
              <Route path="user/create" element={<CreactUser />} />
              <Route path="products" element={<Product />} />
              <Route path="products/:id" element={<UpdateProduct />} />
              <Route path="product/create" element={<NewProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
