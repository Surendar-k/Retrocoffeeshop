import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg text-white">
      <ul className="flex justify-around">
        <li>
          <Link
            to="/admin/users"
            className="hover:text-blue-300 transition-colors"
          >
            Manage Users
          </Link>
        </li>
        <li>
          <Link
            to="/admin/coffees"
            className="hover:text-blue-300 transition-colors"
          >
            Coffee Inventory
          </Link>
        </li>
        <li>
          <Link
            to="/admin/employees"
            className="hover:text-blue-300 transition-colors"
          >
            Employees
          </Link>
        </li>
        <li>
          <Link
            to="/admin/orders"
            className="hover:text-blue-300 transition-colors"
          >
            Orders
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
