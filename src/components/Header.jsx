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
  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-gray-950/95 text-white shadow-lg shadow-black/20 backdrop-blur-sm">
      <section className="w-full">
        <nav className="flex min-h-[68px] items-center justify-between gap-4 px-4 sm:min-h-[76px] sm:px-6 xl:min-h-[84px] xl:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-8">
            <Link
              className="shrink-0 text-2xl font-black tracking-tight text-white transition hover:text-bgimage sm:text-3xl"
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

          <div className="flex items-center gap-2 xl:hidden">
            <button
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-bgimage transition hover:bg-white/10"
              type="button"
              onClick={() => navigate("/cart")}
              aria-label="Open favourites"
            >
              <FaStar className="h-5 w-5" />
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-bgimage px-1 text-[11px] font-black text-gray-950">
                {itemAmount}
              </span>
            </button>
            <button
              onClick={handleToggleMenu}
              className="rounded-full border border-white/10 bg-white/5 p-2.5 text-gray-100 transition hover:bg-white/10"
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenu}
            >
              {isMenu ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7h16M4 12h16M4 17h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </section>

      <div
        className={`fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px] transition-opacity duration-300 xl:hidden ${
          isMenu ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={handleCloseMenu}
        aria-hidden="true"
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-[min(22rem,86vw)] flex-col border-l border-white/10 bg-gray-950 text-white shadow-2xl shadow-black/50 transition-transform duration-300 ease-out xl:hidden ${
          isMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex min-h-[68px] items-center justify-between border-b border-white/10 px-5">
          <p className="text-xl font-black tracking-tight">CamCrew</p>
          <button
            type="button"
            onClick={handleCloseMenu}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-gray-100 transition hover:bg-white/10"
            aria-label="Close navigation menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-between overflow-y-auto px-5 py-6">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-bgimage">
              Navigation
            </p>
            <ul className="flex flex-col space-y-2 text-sm font-semibold">
              <li>
                <Link
                  to="/"
                  onClick={handleCloseMenu}
                  className="block rounded-md border border-transparent px-3 py-3 transition hover:border-white/10 hover:bg-white/5 hover:text-bgimage"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#category"
                  onClick={handleCloseMenu}
                  className="block rounded-md border border-transparent px-3 py-3 transition hover:border-white/10 hover:bg-white/5 hover:text-bgimage"
                >
                  Category
                </a>
              </li>
              <li>
                <Link
                  to="/category/MediaVideography"
                  onClick={handleCloseMenu}
                  className="block rounded-md border border-transparent px-3 py-3 transition hover:border-white/10 hover:bg-white/5 hover:text-bgimage"
                >
                  Portfolios
                </Link>
              </li>
              <li>
                <a
                  href="#footer"
                  onClick={handleCloseMenu}
                  className="block rounded-md border border-transparent px-3 py-3 transition hover:border-white/10 hover:bg-white/5 hover:text-bgimage"
                >
                  Contact Us
                </a>
              </li>
              <li
                onClick={handleCloseMenu}
                className={` ${userData?.isCameraman ? "hidden" : ""} `}
              >
                <Link
                  to="/form"
                  className="block rounded-md border border-transparent px-3 py-3 transition hover:border-white/10 hover:bg-white/5 hover:text-bgimage"
                >
                  Join As Cameraman
                </Link>
              </li>
              <li
                onClick={handleCloseMenu}
                className={` ${!userData?.isCameraman ? "hidden" : ""} `}
              >
                <Link
                  to="/edituser"
                  className="block rounded-md border border-transparent px-3 py-3 transition hover:border-white/10 hover:bg-white/5 hover:text-bgimage"
                >
                  Edit Profile
                </Link>
              </li>
              <li
                onClick={handleCloseMenu}
                className={` ${!userData?.isCameraman ? "hidden" : ""} `}
              >
                <Link
                  to="/add"
                  className="block rounded-md border border-transparent px-3 py-3 transition hover:border-white/10 hover:bg-white/5 hover:text-bgimage"
                >
                  Add Service
                </Link>
              </li>
              <li>
                <Link
                  to="/compare"
                  onClick={handleCloseMenu}
                  className="flex items-center justify-between rounded-md border border-transparent px-3 py-3 transition hover:border-white/10 hover:bg-white/5 hover:text-bgimage"
                >
                  Compare
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-bgimage px-2 text-xs font-black text-gray-950">
                    {selectedProducts?.length}
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-8 border-t border-white/10 pt-5">
            {!isAuthenticated ? (
              <Button onClick={() => loginWithRedirect()}>Login</Button>
            ) : (
              <div className="space-y-3">
                <p className="truncate text-sm font-semibold text-gray-200">
                  Hello {user?.given_name}
                </p>
                <Button
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                >
                  LogOut
                </Button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </header>
  );
};

export default Header;
