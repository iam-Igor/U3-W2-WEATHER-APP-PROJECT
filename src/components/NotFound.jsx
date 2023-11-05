import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column mt-5">
      <h1>404-Not Found</h1>
    <img width="150" height="150" src="https://img.icons8.com/3d-fluency/94/loudly-crying-face-2.png" alt="loudly-crying-face-2"/>
    <Link to={"/"} onClick={window.location.reload}>Back Home</Link>
    </div>
  );
};

export default NotFound;
