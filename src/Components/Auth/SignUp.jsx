import Form from "../form/Form";
import Header from "../Header";

function Register() {
  return (
    <div>
      <Header />
      <div className="Container">
        <Form
          sumbit="Register"
          endpoint="register"
          path="/login"
          haslocalstorage={true}
        />
      </div>
    </div>
  );
}

export default Register;
