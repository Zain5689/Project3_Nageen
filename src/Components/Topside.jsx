import { Link } from "react-router-dom";

function TopBar() {
  return (
    <>
      <div className=" d-flex top-side">
        <h3>Store</h3>
        <div>
          <Link className="btn btn-success" to={"/"}>
            Go to WebSite
          </Link>
        </div>
      </div>
    </>
  );
}

export default TopBar;
