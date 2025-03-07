import { Outlet, Navigate } from "react-router-dom";
import MainImage from "../assets/Logo2.jpg";

const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 flex-col justify-center items-center">
            <Outlet />
          </section>

          <div className="lg:flex hidden flex-1 w-full ">
            <img
              src={MainImage}
              alt="Main image"
              className="w-full object-cover"
            />
          </div>
        </>
      )}
    </>
  );
};

export default AuthLayout;
