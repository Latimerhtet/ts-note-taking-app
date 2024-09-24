import { Outlet } from "react-router-dom";

function Main() {
  return (
    <section className="p-5">
      <Outlet />
    </section>
  );
}

export default Main;
