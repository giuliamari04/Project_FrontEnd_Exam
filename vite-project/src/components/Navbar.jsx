import { Link } from "react-router";
import "../assets/styles/Navbar.css";
import { useEffect, useRef } from "react";

function Navbar() {
  //estrae user loggato
  const loggedUser = localStorage.getItem("loggedUser")
    ? JSON.parse(localStorage.getItem("loggedUser"))
    : null;

  // estrae user registrati
  const registeredUser = localStorage.getItem("registeredUser")
    ? JSON.parse(localStorage.getItem("registeredUser"))
    : null;

  //gestione stato - utente registrato ma non loggato o loggato
  const isLogged = loggedUser ? !!loggedUser : null;
  const isRegisteredNotLogged = registeredUser
    ? !!registeredUser && !isLogged
    : null;
    //controlli console.log stato utenti
  console.log("loggeduser:", loggedUser);
  // console.log("registreduser", registeredUser);
  console.log("loggedin:", isLogged);
  console.log("registred:", isRegisteredNotLogged);
  
  //gestione apertura e chiusura menù
  const triggerRef = useRef(null);
  const targetRef = useRef(null);
  
  useEffect(() => {
    if (!triggerRef.current || !targetRef.current) return;
    const collapse = new window.Collapse(targetRef.current, triggerRef.current);
    return () => collapse.collapse();
  }, []);

  //gestione logout
  const handleLogout = () => {
    localStorage.removeItem("loggedUser"); 
    window.location.href = "/"; // forza il refresh per aggiornare la UI
  };

  return (
    <nav className=" fixed w-full z-20 top-0 start-0 border-b border-default">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 h-20">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://www.svgrepo.com/show/50205/dog-paw.svg"
            className="h-7"
            alt="Paw Logo"
          />
          <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">
            Paw
          </span>
        </Link>
        {/* bottone dropdown */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse h-8">
          <button
            ref={triggerRef}
            type="button"
            className={`${
              isLogged ? "block" : "hidden"
            } flex text-sm bg-neutral-primary rounded-full md:me-0 focus:ring-4 focus:ring-neutral-tertiary`}
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="https://img.freepik.com/premium-vector/user-profile-icon-circle_1256048-12499.jpg?semt=ais_hybrid&w=740&q=80"
              alt="user photo"
            />
          </button>

          {/* <!-- Dropdown menu --> */}
          <div
            ref={targetRef}
            className=" z-50 hidden bg-gray-800 border border-default-medium rounded-md shadow-lg w-44"
            id="user-dropdown"
          >
            <div className="px-4 py-3 text-sm border-b border-default">
              <span className="block text-heading font-medium">
                {loggedUser ? loggedUser.username : "Guest"}
              </span>
              <span className="block text-body truncate">
                {loggedUser ? loggedUser.email : "email@guest.com"}
              </span>
            </div>
            <ul
              className="p-2 text-sm text-body font-medium"
              aria-labelledby="user-menu-button"
            >
              <li>
                <Link
                  to="/user"
                  className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/donate"
                  className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                >
                  Donate
                </Link>
              </li>
              <li
                className={`${
                  isLogged && loggedUser.role === "admin" ? "block" : "hidden"
                }`}
              >
                <Link
                  to="/register"
                  state={{ openRegister: true }}
                  className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                >
                  Register new account
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                  onClick={handleLogout}
                >
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className=" my-bg-toggle inline-flex items-center p-2 w-18 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            ▼
          </button>
        </div>
        <div
          className="items-center justify-between bg-mini rounded-md shadow-lg hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="nav-list font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-white bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dogs"
                className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
              >
                Dogs
              </Link>
            </li>
            <li>
              <Link
                to="/cats"
                className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
              >
                Cats
              </Link>
            </li>
            <li className={`${isRegisteredNotLogged ? "block" : "hidden"}`}>
              <Link
                to="/login"
                className=" py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className={`${
                  !isLogged ? "block" : "hidden"
                } py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent`}
              >
                Register
              </Link>
              <Link
                to="/user"
                className={`${
                  isLogged ? "block" : "hidden"
                } py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent`}
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
