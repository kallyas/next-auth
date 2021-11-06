import Link from "next/link";
import Image from "next/image";
import { useSession, signOut, signIn } from "next-auth/react";
import { cartSelector } from "../features/cart/cartSlice";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { data: session } = useSession();
  const { total } = useSelector(cartSelector);
  return (
    <header className="p-3 mb-3 border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link href="/">
            <a className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
              <svg
                className="bi me-2"
                width="40"
                height="32"
                role="img"
                aria-label="Bootstrap"
              >
                <use xlinkHref="#bootstrap"></use>
              </svg>
            </a>
          </Link>
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link href="#">
                <a className="nav-link px-2 link-secondary">Overview</a>
              </Link>
            </li>
            <li>
              <a href="#" className="nav-link px-2 link-dark">
                Inventory
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 link-dark">
                Customers
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 link-dark">
                Products
              </a>
            </li>
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>
          {total}
          {session ? (
            <>
            <i className="fas fa-shopping-cart 5x" style={{marginRight: "15px", cursor: "pointer", fontSize: "x-large"}}></i>
              <div className="dropdown text-end">
                <Link href="#">
                  <a
                    className="d-block link-dark text-decoration-none dropdown-toggle"
                    id="dropdownUser1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <Image
                      src={
                        session.user?.image ||
                        "https://avatarfiles.alphacoders.com/165/thumb-1920-165865.png"
                      }
                      alt="profile Image"
                      width="32"
                      height="32"
                      className="rounded-circle"
                      title={session.user?.name || session.user?.email}
                    />
                  </a>
                </Link>
                <ul
                  className="dropdown-menu text-small"
                  aria-labelledby="dropdownUser1"
                >
                  <li>
                    <Link href="#">
                      <a className="dropdown-item">{session.user?.name || session.user.email}</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a className="dropdown-item">Settings</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a className="dropdown-item">Profile</a>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button onClick={() => signOut()} className="btn btn-outline-dark" style={{ width: "90%", padding: "2px", margin: "0 5px"}}>
                        Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-between">
              <button
              onClick={() => signIn()} 
              type="button" 
              className="btn btn-outline-dark" style={{ width: "100%", marginRight: "15px"}}>
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
