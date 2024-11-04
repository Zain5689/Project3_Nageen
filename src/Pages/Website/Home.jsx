import Header from "../../Components/Header";
import Card from "./Card";

function Home() {
  return (
    <>
      <Header />
      <div className="container">
        <h1 className="text-center fs-1 fw-bold my-5">Products</h1>
        <div className="d-flex gap-2 ">
          <Card />
        </div>
      </div>
    </>
  );
}

export default Home;
