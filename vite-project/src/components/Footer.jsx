import { Link } from "react-router";

function Footer() {
  return (
    <section id="footer">
      <footer className=" rounded-base mt-4">
        <div className="text-center py-3">
          <span className="text-sm text-body sm:text-center">
            © 2026 All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-7 text-sm font-medium text-body sm:mt-0">
            <li>
              <Link to="/" className="hover:underline me-4 md:me-6">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline me-4 md:me-6">
                Donate
              </Link>
            </li>
            <li>
              <Link to="/dogs" className="hover:underline me-4 md:me-6">
                Adopt a dog
              </Link>
            </li>
            <li>
              <Link to="/cats" className="hover:underline">
                Adopt a cat
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </section>
  );
}
export default Footer;
