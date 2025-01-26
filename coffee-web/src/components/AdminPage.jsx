import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Toastify styles
import { db } from './Login/firebase'; // Import Firebase config
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const AdminPage = () => {
  const [salesData, setSalesData] = useState([]);
  const [userDetails, setUserDetails] = useState({ employees: [], admins: [] });
  const [users, setUsers] = useState([]);
  const [coffeeItems, setCoffeeItems] = useState([]); // State to store coffee items
  const [newCoffee, setNewCoffee] = useState({ name: '', image: '', price: '' }); // State for new coffee item
  const [loading, setLoading] = useState(true); // Loading state to handle loading indicator

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch sales data
        const salesSnapshot = await getDocs(collection(db, 'salesReports'));
        const salesReports = salesSnapshot.docs.map((doc) => doc.data());
        setSalesData(salesReports);

        // Fetch coffee items
        const coffeeSnapshot = await getDocs(collection(db, 'coffees'));
        setCoffeeItems(coffeeSnapshot.docs.map(doc => doc.data()));

        // Fetch user login details (employees and admins)
        const employeesSnapshot = await getDocs(collection(db, 'employees'));
        const adminsSnapshot = await getDocs(collection(db, 'admins'));
        setUserDetails({
          employees: employeesSnapshot.docs.map(doc => doc.data()),
          admins: adminsSnapshot.docs.map(doc => doc.data()),
        });

        // Fetch users for management
        const usersSnapshot = await getDocs(collection(db, 'users'));
        setUsers(usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch data. Please try again.');
      }
    };
console.log(userDetails.employees);

    fetchData();
  }, []);

  // Delete a user
  const handleDeleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      toast.success('User deleted successfully.');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user. Please try again.');
    }
  };

  // Function to add new coffee item to Firestore
  const handleAddCoffeeItem = async () => {
    try {
      await addDoc(collection(db, 'coffees'), newCoffee);
      setCoffeeItems(prev => [...prev, newCoffee]); // Update the state with the new coffee item
      setNewCoffee({ name: '', image: '', price: '' }); // Reset the form
      toast.success('Coffee item added successfully.');
    } catch (error) {
      console.error('Error adding coffee item:', error);
      toast.error('Failed to add coffee item. Please try again.');
    }
  };

  // Prepare data for Bar Chart (Monthly Sales)
  const monthlySales = salesData.reduce((acc, sale) => {
    const month = new Date(sale.timestamp?.seconds * 1000).toLocaleString('default', { month: 'long' });
    acc[month] = (acc[month] || 0) + parseFloat(sale.totalAmount);
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(monthlySales),
    datasets: [
      {
        label: 'Total Sales (₹)',
        data: Object.values(monthlySales),
        backgroundColor: '#4caf50',
        borderColor: '#388e3c',
        borderWidth: 1,
        hoverBackgroundColor: '#66bb6a',
        hoverBorderColor: '#388e3c',
      },
    ],
  };

  // Prepare data for Pie Chart (Item Distribution)
  const itemDistribution = salesData.reduce((acc, sale) => {
    sale.items.forEach((item) => {
      acc[item.title] = (acc[item.title] || 0) + item.quantity;
    });
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(itemDistribution),
    datasets: [
      {
        label: 'Item Distribution',
        data: Object.values(itemDistribution),
        backgroundColor: ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="admin-page bg-gray-100 p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Admin Dashboard</h1>

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-blue-500"></div>
        </div>
      )}

      {/* Sales Data & Charts */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Monthly Sales</h2>
            <Bar data={barChartData} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Item Distribution</h2>
            <Pie data={pieChartData} />
          </div>
        </div>
      )}

      {/* User Management */}
      <div className="section bg-white p-6 shadow-md rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-4">Manage Users</h2>

        {/* Table container with scroll on small screens */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-2 border">Username</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="odd:bg-gray-100 even:bg-gray-200">
                    <td className="p-2 border">{user.username}</td>
                    <td className="p-2 border">{user.email}</td>
                    <td className="p-2 border">{user.role}</td>
                    <td className="p-2 border">
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-2 border text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Coffee Item Form */}
      <div className="bg-white p-6 rounded-lg shadow-xl mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Coffee Item</h2>
        <div className="space-y-4">
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Coffee Name"
            value={newCoffee.name}
            onChange={(e) => setNewCoffee({ ...newCoffee, name: e.target.value })}
          />
          <input
            type="file"
            className="w-full p-2 border rounded"
            placeholder="Image URL"
            value={newCoffee.image}
            onChange={(e) => setNewCoffee({ ...newCoffee, image: e.target.value })}
          />
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Price"
            value={newCoffee.price}
            onChange={(e) => setNewCoffee({ ...newCoffee, price: e.target.value })}
          />
          <button
            onClick={handleAddCoffeeItem}
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Add Coffee Item
          </button>
        </div>
      </div>

      {/* Display Coffee Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {coffeeItems.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-md" />
            <h3 className="text-xl font-semibold mt-2">{item.name}</h3>
            <p className="text-lg text-gray-700">{item.price}</p>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminPage;
