import { useEffect } from "react";
import { userContext } from "@/context/AuthContextProvider";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSignOutAccount } from "@/lib/react-queries/queriesAndMutations";
import { LiaSignOutAltSolid } from "react-icons/lia";
import Logo from "../../assets/swiftLogo.png";
import { sideLinks } from "@/constants";
import { INavLink } from "@/types";
const SideBar = () => {
  const { user } = userContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <nav className="hidden lg:flex lg:flex-col bg-slate-800 w-64 px-5 text-white">
      <div className="Logo my-3">
        <Link to="/" >
          <img src={Logo} alt="" className=" w-36" />
        </Link>
      </div>
      <hr className='bg-slate-800 opacity-20'/>
      <div className="userName flex flex-row gap-3 items-center mt-5">
        <Link to={`profile/${user.id}`}>
          {
            <img
              src={user.imageUrl}
              alt=""
              className="w-9 h-9 rounded-full"
            />
          }
        </Link>
        <div className="flex flex-col">
          <p className="font-bold text-sm">{user.name}</p>
          <p className="text-[.7rem] italic opacity-60">@{user.username}</p>
        </div>
      </div>

      <div>
        <ul className="flex flex-col gap-5 my-5 py-3">
          {sideLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`${isActive && "bg-blue-500 rounded-md"} group`}
              >
                <NavLink
                  to={link.route}
                  className="flex flex-row gap-2 px-3 py-2 rounded-md items-center text-sm hover:bg-blue-500"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`${
                      isActive && "invert-white"
                    } w-5 h-5 group-hover:invert-white`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="LogOutBtn flex flex-row gap-2 items-center px-2 cursor-pointer mt-20 border-[1px] py-1 rounded-md border-blue-500">
        <LiaSignOutAltSolid
          className="w-7 h-7 logOutBtn"
          onClick={() => signOut()}
        />
        <p className="text-sm">Log out</p>
      </div>
    </nav>
  );
};

export default SideBar;
