import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/ServiceContext";
import { Button } from "./Button";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../context/UserContext";
import { useComparison } from "../context/ComparsionContext";
import { apiUrl } from "../config/api";
// import { CgMenu, CgClose } from "react-icons/cg";

const Header = () => {
  const [isMenu, setMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth0();
  const { userData, updateUser, join } = useUser();
  const { loginWithRedirect } = useAuth0();
  const { selectedProducts } = useComparison();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const response = await fetch(apiUrl(`/api/users/email/${user.email}`));
        if (!response.ok) {
          updateUser(null);
          // throw new Error("User not found");
        }
        const userData = await response.json();
        updateUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Call fetchUserData only if user is authenticated
    if (isAuthenticated && user) {
      fetchUserData();
    }
  }, [isAuthenticated, user, join, updateUser]); // Depend on isAuthenticated and user

  const { itemAmount } = useCart();
  const handleToggleMenu = () => {
    setMenuOpen(!isMenu);
  };
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-gray-950/95 text-white shadow-lg shadow-black/20 backdrop-blur-sm">
      <section className="w-full">
        <nav className="flex min-h-[84px] items-center justify-between gap-5 px-4 sm:px-6 xl:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-8">
            <Link
              className="shrink-0 text-3xl font-black tracking-tight text-white transition hover:text-bgimage"
              to="/"
            >
              CamCrew
            </Link>

            <ul className="hidden flex-1 items-center justify-center gap-8 text-sm font-semibold text-gray-200 xl:flex">
              <li>
                <Link to="/" className="transition hover:text-bgimage">
                  Home
                </Link>
              </li>
              <li>
                <a href="#category" className="transition hover:text-bgimage">
                  Category
                </a>
              </li>
              <li>
                <Link
                  to="/category/media%20videography"
                  className="transition hover:text-bgimage"
                >
                  Portfolios
                </Link>
              </li>
              <li>
                <a href="#footer" className="transition hover:text-bgimage">
                  Contact Us
                </a>
              </li>
              <li className={` ${userData?.isCameraman ? "hidden" : ""} `}>
                <Link to="/form" className="transition hover:text-bgimage">
                  Join As Cameraman
                </Link>
              </li>
              <li className={` ${!userData?.isCameraman ? "hidden" : ""} `}>
                <Link to="/edituser" className="transition hover:text-bgimage">
                  Edit Profile
                </Link>
              </li>
              <li className={` ${!userData?.isCameraman ? "hidden" : ""} `}>
                <Link to="/add" className="transition hover:text-bgimage">
                  Add Service
                </Link>
              </li>
              <li>
                <Link
                  to="/compare"
                  className="flex items-center gap-2 transition hover:text-bgimage"
                >
                  Compare
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-bgimage px-2 text-xs font-black text-gray-950">
                    {selectedProducts?.length}
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden shrink-0 items-center gap-4 xl:flex">
            <button
              className="relative flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/5 text-bgimage transition hover:bg-white/10"
              type="button"
              onClick={() => navigate("/cart")}
              aria-label="Open favourites"
            >
              <FaStar className="h-6 w-6" />
              <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-bgimage px-1 text-xs font-black text-gray-950">
                {itemAmount}
              </span>
            </button>

            <div className="flex items-center gap-3">
              {!isAuthenticated ? (
                <Button onClick={() => loginWithRedirect()}>Login</Button>
              ) : (
                <>
                  <span className="max-w-[140px] truncate text-sm font-semibold text-gray-200">
                    Hello {user?.given_name}
                  </span>
                  <Button
                    onClick={() =>
                      logout({
                        logoutParams: { returnTo: window.location.origin },
                      })
                    }
                  >
                    LogOut
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 xl:hidden">
            {!isAuthenticated ? (
              <Button onClick={() => loginWithRedirect()}>Login</Button>
            ) : (
              <Button
                onClick={() =>
                  logout({
                    logoutParams: { returnTo: window.location.origin },
                  })
                }
              >
                LogOut
              </Button>
            )}
            <button
              className="relative flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-bgimage"
              type="button"
              onClick={() => navigate("/cart")}
              aria-label="Open favourites"
            >
              <FaStar
                className="h-5 w-5"
              />
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-bgimage px-1 text-[11px] font-black text-gray-950">
                {itemAmount}
              </span>
            </button>
            <button
              onClick={handleToggleMenu}
              className="rounded-md border border-white/10 bg-white/5 p-2 text-gray-100 transition hover:bg-white/10"
              type="button"
              aria-label="Toggle navigation menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>
      </section>

      <div className="absolute right-3 top-[4.8rem] z-50 w-[min(22rem,calc(100vw-1.5rem))]">
        {isMenu && (
          <div className="rounded-md border border-white/10 bg-gray-950 p-4 text-white shadow-2xl shadow-black/40 xl:hidden">
            <ul className="flex flex-col space-y-3 text-sm font-semibold">
              <li>
                <Link
                  to="/"
                  onClick={handleToggleMenu}
                  className="block rounded-md px-3 py-2 transition hover:bg-white/5 hover:text-bgimage"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#category"
                  onClick={handleToggleMenu}
                  className="block rounded-md px-3 py-2 transition hover:bg-white/5 hover:text-bgimage"
                >
                  Category
                </a>
              </li>
              <li>
                <Link
                  to="/category/MediaVideography"
                  onClick={handleToggleMenu}
                  className="block rounded-md px-3 py-2 transition hover:bg-white/5 hover:text-bgimage"
                >
                  Portfolios
                </Link>
              </li>
              <li>
                <a
                  href="#footer"
                  onClick={handleToggleMenu}
                  className="block rounded-md px-3 py-2 transition hover:bg-white/5 hover:text-bgimage"
                >
                  Contact Us
                </a>
              </li>
              <li
                onClick={handleToggleMenu}
                className={` ${userData?.isCameraman ? "hidden" : ""} `}
              >
                <Link
                  to="/form"
                  className="block rounded-md px-3 py-2 transition hover:bg-white/5 hover:text-bgimage"
                >
                  Join As Cameraman
                </Link>
              </li>
              <li
                onClick={handleToggleMenu}
                className={` ${!userData?.isCameraman ? "hidden" : ""} `}
              >
                <Link
                  to="/edituser"
                  className="block rounded-md px-3 py-2 transition hover:bg-white/5 hover:text-bgimage"
                >
                  Edit Profile
                </Link>
              </li>
              <li
                onClick={handleToggleMenu}
                className={` ${!userData?.isCameraman ? "hidden" : ""} `}
              >
                <Link
                  to="/add"
                  className="block rounded-md px-3 py-2 transition hover:bg-white/5 hover:text-bgimage"
                >
                  Add Service
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
