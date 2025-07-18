# ☕RetroCoffeeShop

RetroCoffeeShop is a web application designed to streamline and enhance the coffee ordering experience for both customers and administrators. This project provides a fast, user-friendly interface for ordering coffee, efficient billing, customer feedback, and robust admin analytics including sales reports and menu management.

## Features

- **Seamless Coffee Ordering:** Customers can easily browse the menu, view images and ratings, and place orders quickly.
- **Fast Billing System:** Streamlined checkout process for rapid transactions.
- **Customer Reviews & Ratings:** Customers can leave reviews and rate their coffee experience.
- **Dynamic Menu Management:** Admins can post new coffees with images and ratings, which are instantly updated in the customer menu.
- **Sales Analytics:** Admin dashboard displays sales data with interactive bar graphs and pie charts.
- **User Management:** Admins can view and maintain customer details.
- **Secure Image Handling:** Images are managed and served efficiently using Cloudinary.

---

## 🌐 Live Website

👉 [Visit the Live Website](https://caffeeespot.web.app/)  


---


## 🛠️ Tech Stack

- ⚛️ **React.js** – Component-based frontend
- 🎨 **Tailwind CSS** – Modern utility-first styling
- 🔥 **Firebase** – Hosting and deployment
- ✉️ **Cloudinary** – To Handle uploaded images
- 🌐 **Vite** – Fast frontend tooling
- 📅 **MySQL** - Handle database

---
## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MySQL server and credentials
- Firebase account and project
- Cloudinary account

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Surendar-k/Retrocoffeeshop.git
   cd Retrocoffeeshop
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables:**
   - Create a `.env` file in the root directory and add the following (replace with your actual credentials):
     ```
     #Firebase
     REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
     
     # MySQL
     DB_HOST=your_mysql_host
     DB_USER=your_mysql_user
     DB_PASSWORD=your_mysql_password
     DB_NAME=your_mysql_db_name
     
     # Cloudinary
     CLOUDINARY_CLOUD_NAME=your_cloudinary_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     ```

4. **Setup Database:**
   - Ensure you have a MySQL server running.
   - Import the provided SQL schema (if available) into your MySQL database.

5. **Run the Application:**
   - Start the backend server (if present):
     ```bash
     npm run dev
     or
     node server
   
     ```
   - Start the frontend:
     ```bash
     npm run dev
     
     ```
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
Retrocoffeeshop/
│
├── Backend/
│   ├── node_modules/
│   ├── cors.json
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── coffee-web/
│   ├── .firebase/
│   ├── dist/
│   ├── node_modules/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/
│   │   │   └── images/
│   │   │       
│   │   ├── components/
│   │   │   ├── Login/
│   │   │   │   ├── firebase.js
│   │   │   │   ├── LoginRegister.css
│   │   │   │   └── LoginRegister.jsx
│   │   │   ├── AboutUs.jsx
│   │   │   ├── AdminNavbar.jsx
│   │   │   ├── AdminPage.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Menu.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── OrderEntry.jsx
│   │   │   ├── Product.jsx
│   │   │   └── Reviews.jsx
│   │   ├── layouts/
│   │   │   └── App.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .eslintrc.cjs
│   ├── .firebaserc
│   ├── .gitignore
│   ├── firebase.json
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── process.env
│   ├── README.md
│   ├── tailwind.config.js
│   └── vite.config.js

```

 
## Usage

- **Customers:** Browse and search the coffee menu, place orders, and leave reviews and ratings.
- **Admins:** Log in to manage menu items, post new coffees, view and analyze sales reports (bar graphs, pie charts), and oversee user details.

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests for any enhancements or bug fixes.

## License

This project is open source for learning and demonstration purposes. Please refer to the repository owner for commercial or production use.

---

**Developed by [Surendar-k](https://github.com/Surendar-k)**
