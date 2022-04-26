function Header() {
  return (
    <nav className="navbar navbar-expand sticky-top navbar-light bg-warning">
      <div className="container-fluid">
        <a className="navbar-brand text-black-50 fw-bolder" href="/">
          EXPENSE TRACKER
        </a>
        <div className="navbar-collapse justify-content-end">
          <ul className="navbar-nav gap-x-4">
            <li className="nav-item">
              <a className="nav-link" href="/">
                <i className="fa-solid fa-home fs-5"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                <i className="fa-solid fa-plus fs-5"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Header;
