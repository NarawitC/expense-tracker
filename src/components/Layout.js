import Header from './Header';
import { Outlet } from 'react-router-dom';
function Layout() {
  return (
    <div className="d-flex flex-column">
      <Header></Header>
      <div className="container-fluid py-4 flex-grow-1 max-w-xl">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
export default Layout;
