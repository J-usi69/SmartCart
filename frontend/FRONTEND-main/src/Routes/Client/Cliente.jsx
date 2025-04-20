import { Outlet } from "react-router-dom";
import { Layout } from "../../Components/Layout/LayoutSideBarCliente.jsx"

export const Cliente = () => {
  return (
    <div className="flex">
      <Layout>
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </Layout>
    </div>
  );
};
