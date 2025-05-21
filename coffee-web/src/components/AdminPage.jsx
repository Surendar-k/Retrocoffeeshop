import { useState, useEffect } from 'react';
import { collection, getDocs,  deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

import { storage,db } from './Login/firebase';  // path to your firebase.js
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc} from "firebase/firestore";


import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const AdminPage = () => {
  const [salesData, setSalesData] = useState([]);
  const [UserDetails,setUserDetails] = useState({
    employees: [],
    admins: []
  });
  
  const [users, setUsers] = useState([]);
  const [coffeeItems, setCoffeeItems] = useState([]);
  const [newCoffee, setNewCoffee] = useState({ name: '', price: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState({});
const [setUploadedImageUrl] = useState(null);

 const fetchCoffeeItems = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "coffees"));
    const items = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setCoffeeItems(items); // ✅ update state
  } catch (error) {
    console.error("Error fetching coffee items:", error);
  }
};
useEffect(() => {
  fetchCoffeeItems();
}, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log(UserDetails);
      try {
        // Fetch all collections in parallel
        const [
          salesSnapshot,
          coffeeSnapshot,
          employeesSnapshot,
          adminsSnapshot,
          usersSnapshot
        ] = await Promise.all([
          getDocs(collection(db, 'salesReports')),
          getDocs(collection(db, 'coffees')),
          getDocs(collection(db, 'employees')),
          getDocs(collection(db, 'admins')),
          getDocs(collection(db, 'users'))
        ]);
    
        // Set state with fetched data
        setSalesData(salesSnapshot.docs.map(doc => doc.data()));
        
        setCoffeeItems(coffeeSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
    
        setUserDetails({
          employees: employeesSnapshot.docs.map(doc => doc.data()),
          admins: adminsSnapshot.docs.map(doc => doc.data())
        });
    
        // Set users directly from the fetched data
        setUsers(usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
    
        console.log("Users fetched:", usersSnapshot.docs.length);
        console.log("Coffee items fetched:", coffeeSnapshot.docs.length);
    
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };
const handleAddCoffeeItem = async () => {
  if (!newCoffee.name.trim() || !newCoffee.price.trim() || !imageFile) {
    alert("Please fill all fields and select an image");
    return;
  }

  setUploading(true);

  try {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "unsigned_preset_coffeeshop");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/damftqrdv/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();

    if (data.secure_url) {
  await addDoc(collection(db, "coffees"), {
    name: newCoffee.name.trim(),
    price: Number(newCoffee.price),
    imageUrl: data.secure_url,
    createdAt: new Date(),
  });

  alert("Coffee item added successfully!");
  setNewCoffee({ name: '', price: '' });
  setImageFile(null);
  setImagePreview(null);
  setUploadedImageUrl(data.secure_url); // <-- Set uploaded image URL

    } else {
      alert("Failed to upload image");
    }
  } catch (error) {
    console.error("Error uploading image: ", error);
    alert("Error uploading image");
  }

  setUploading(false);
};

  // Delete a user
  const handleDeleteUser = async (userId) => {
    if (!userId) {
      console.error("No userId provided for deletion");
      toast.error("Unable to delete user: Invalid user ID");
      return;
    }
    
    // Confirm before deletion
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }
    
    try {
      setDeleteLoading(prev => ({ ...prev, [userId]: true }));
      
      console.log(`Attempting to delete user with ID: ${userId}`);
      
      // Create a reference to the user document
      const userRef = doc(db, 'users', userId);
      
      // Delete the document
      await deleteDoc(userRef);
      console.log(`User ${userId} deleted from Firestore`);
      
      // Update state to remove the deleted user
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error(`Failed to delete user: ${error.message}`);
    } finally {
      setDeleteLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  // Delete a coffee item
  const handleDeleteCoffee = async (coffeeId) => {
    if (!coffeeId) {
      console.error("No coffeeId provided for deletion");
      toast.error("Unable to delete coffee: Invalid coffee ID");
      return;
    }
    
    // Confirm before deletion
    if (!window.confirm("Are you sure you want to delete this coffee item? This action cannot be undone.")) {
      return;
    }
    
    try {
      setDeleteLoading(prev => ({ ...prev, [coffeeId]: true }));
      
      console.log(`Attempting to delete coffee with ID: ${coffeeId}`);
      
      // Find the coffee item to get its image URL
      const coffeeToDelete = coffeeItems.find(item => item.id === coffeeId);
      
      if (coffeeToDelete && coffeeToDelete.image) {
        // Extract the storage path from the URL
        // Assuming the URL format is like: https://firebasestorage.googleapis.com/v0/b/[bucket]/o/[path]?[token]
        const imageUrl = coffeeToDelete.image;
        
        try {
          // Extract file path from image URL
          const imageRef = ref(storage, decodeURIComponent(
            imageUrl.split('/o/')[1].split('?')[0]
          ));
          
          // Delete the image from storage
          await deleteObject(imageRef);
          console.log(`Image for coffee ${coffeeId} deleted from storage`);
        } catch (imageError) {
          console.error('Error deleting image, continuing with document deletion:', imageError);
          // Continue with document deletion even if image deletion fails
        }
      }
      
      // Create a reference to the coffee document
      const coffeeRef = doc(db, 'coffees', coffeeId);
      
      // Delete the document
      await deleteDoc(coffeeRef);
      console.log(`Coffee ${coffeeId} deleted from Firestore`);
      
      // Update state to remove the deleted coffee
      setCoffeeItems(prevItems => prevItems.filter(item => item.id !== coffeeId));
      
      toast.success('Coffee item deleted successfully');
    } catch (error) {
      console.error('Error deleting coffee item:', error);
      toast.error(`Failed to delete coffee: ${error.message}`);
    } finally {
      setDeleteLoading(prev => ({ ...prev, [coffeeId]: false }));
    }
  };

  // Function to upload image and add new coffee item to Firestore
  

  // Prepare data for Bar Chart (Monthly Sales)
  const monthlySales = salesData.reduce((acc, sale) => {
    if (!sale.timestamp?.seconds) return acc;
    
    const month = new Date(sale.timestamp.seconds * 1000).toLocaleString('default', { month: 'long' });
    acc[month] = (acc[month] || 0) + parseFloat(sale.totalAmount || 0);
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
    sale.items?.forEach((item) => {
      if (item.title) {
        acc[item.title] = (acc[item.title] || 0) + (item.quantity || 0);
      }
    });
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(itemDistribution),
    datasets: [
      {
        label: 'Item Distribution',
        data: Object.values(itemDistribution),
        backgroundColor: ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#fb7185', '#c084fc'],
        hoverOffset: 4,
      },
    ],
  };

  // Default placeholder image URL - local asset that won't give network errors
  const defaultPlaceholderImage = '/assets/placeholder-coffee.png';

  return (
    <div className="admin-page bg-gray-100 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 mb-8 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Coffee Shop Admin Dashboard</h1>
          <p className="mt-2 opacity-80">Manage your coffee shop business in one place</p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-transparent border-blue-600"></div>
            <p className="ml-3 text-lg text-gray-600">Loading dashboard data...</p>
          </div>
        )}

        {!loading && (
          <>
            {/* Stats Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 className="text-gray-500 text-sm font-medium uppercase mb-1">Total Users</h3>
                <p className="text-3xl font-bold text-gray-800">{users.length}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-gray-500 text-sm font-medium uppercase mb-1">Total Coffee Items</h3>
                <p className="text-3xl font-bold text-gray-800">{coffeeItems.length}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                <h3 className="text-gray-500 text-sm font-medium uppercase mb-1">Total Sales</h3>
                <p className="text-3xl font-bold text-gray-800">
                  ₹{Object.values(monthlySales).reduce((a, b) => a + b, 0).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Sales Data & Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 pb-2 border-b">Monthly Sales</h2>
                {Object.keys(monthlySales).length > 0 ? (
                  <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: true }} />
                ) : (
                  <div className="flex justify-center items-center h-64 text-gray-500">
                    No sales data available
                  </div>
                )}
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 pb-2 border-b">Item Distribution</h2>
                {Object.keys(itemDistribution).length > 0 ? (
                  <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: true }} />
                ) : (
                  <div className="flex justify-center items-center h-64 text-gray-500">
                    No item distribution data available
                  </div>
                )}
              </div>
            </div>

            {/* User Management */}
            <div className="bg-white p-6 shadow-md rounded-lg mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 pb-2 border-b">Manage Users</h2>

              {/* Table container with scroll on small screens */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 border-b-2 border-gray-200 font-medium text-gray-600">Username</th>
                      <th className="p-3 border-b-2 border-gray-200 font-medium text-gray-600">Email</th>
                      <th className="p-3 border-b-2 border-gray-200 font-medium text-gray-600">Role</th>
                      <th className="p-3 border-b-2 border-gray-200 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="p-3 border-b border-gray-200">{user.username || 'N/A'}</td>
                          <td className="p-3 border-b border-gray-200">{user.email || 'N/A'}</td>
                          <td className="p-3 border-b border-gray-200">
                            <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                              user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {user.role || 'user'}
                            </span>
                          </td>
                          <td className="p-3 border-b border-gray-200">
                            <button
                              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:bg-red-300 flex items-center"
                              onClick={() => handleDeleteUser(user.id)}
                              disabled={deleteLoading[user.id]}
                            >
                              {deleteLoading[user.id] ? (
                                <>
                                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Deleting...
                                </>
                              ) : (
                                'Delete'
                              )}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="p-3 text-center text-gray-500">
                          No users found. Check your Firebase collection configuration.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add Coffee Item Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 pb-2 border-b">Add New Coffee Item</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Coffee Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Coffee Name"
                      value={newCoffee.name}
                      onChange={(e) => setNewCoffee({ ...newCoffee, name: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Price"
                      value={newCoffee.price}
                      onChange={(e) => setNewCoffee({ ...newCoffee, price: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Coffee Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full p-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      onChange={handleImageChange}
                    />
                    <p className="text-xs text-gray-500 mt-1">Recommended size: 300x300px</p>
                  </div>
                  
                  <button
                    onClick={handleAddCoffeeItem}
                    disabled={uploading}
                    className={`w-full py-2 rounded text-white font-medium flex items-center justify-center ${
                      uploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300'
                    }`}
                  >
                    {uploading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      'Add Coffee Item'
                    )}
                  </button>
                </div>
                
                {/* Image Preview */}
                <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-h-64 object-contain" 
                    />
                  ) : (
                    <div className="text-center text-gray-500">
                      <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="mt-2">Image preview will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Display Coffee Items */}
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Coffee Menu Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {coffeeItems.length > 0 ? (
                coffeeItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
                    <div className="relative h-48">
                      <img 
                       src={item.imageUrl || defaultPlaceholderImage}
                        alt={item.name} 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = defaultPlaceholderImage || '/assets/coffee-placeholder.jpg';
                        }}
                      />
                      <button 
                        onClick={() => handleDeleteCoffee(item.id)}
                        disabled={deleteLoading[item.id]}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                        aria-label="Delete coffee item"
                      >
                        {deleteLoading[item.id] ? (
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                          </svg>
                        )}
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xl font-bold text-green-600">₹{parseFloat(item.price).toFixed(2)}</p>
                        <span className="text-xs text-gray-500">
                          Added: {item.createdAt?.seconds ? 
                            new Date(item.createdAt.seconds * 1000).toLocaleDateString() : 
                            'Recently'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center p-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No coffee items found</h3>
                  <p className="mt-1 text-gray-500">Get started by adding your first coffee item above!</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default AdminPage;