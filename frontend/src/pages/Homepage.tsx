import { NavLink } from "react-router";

export default function Homepage() {
  return (
    <div>
      <NavLink to={"/football"}>Fußball</NavLink>
    </div>
  );
}
