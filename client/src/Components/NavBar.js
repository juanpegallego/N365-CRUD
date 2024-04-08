import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <div>
      <Link to="/">PERN Stack</Link>

      <button onClick={() => navigate("/payments/new")}>New Task</button>
    </div>
  );
}
