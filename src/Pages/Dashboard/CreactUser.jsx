import Form from "./../../Components/form/Form";
import "../../index.css";

const CreactUser = () => {
  return (
    <div className="Container">
      <Form sumbit="Creact" endpoint="user/create" path="/dashboard/users" />
    </div>
  );
};

export default CreactUser;
