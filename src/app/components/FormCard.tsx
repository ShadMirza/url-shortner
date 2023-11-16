import Form from "./Form";
import { FaLink  } from "react-icons/fa";

const FormCard = () => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title"><FaLink />URL Shortner</h2>
        <Form />
      </div>
    </div>
  );
};

export default FormCard;
