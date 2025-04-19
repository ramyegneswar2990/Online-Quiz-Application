// import React, { useState, useEffect } from 'react';
// import './AdminDashboard.css';

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [userResults, setUserResults] = useState([]);

//   useEffect(() => {
//     fetchUserData();
//     fetchUserResults();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/users');
//       const data = await response.json();
//       setUsers(data.users);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const fetchUserResults = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/user-results');
//       const data = await response.json();
//       setUserResults(data.userResults);
//     } catch (error) {
//       console.error('Error fetching user results:', error);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
//           method: 'DELETE',
//         });

//         if (response.ok) {
//           setUsers(users.filter(user => user._id !== userId));
//         } else {
//           console.error('Failed to delete user');
//         }
//       } catch (error) {
//         console.error('Error deleting user:', error);
//       }
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <h1>Admin Dashboard</h1>

//       <h2>User List</h2>
//       <table className="dashboard-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Created At</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user._id}>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>{new Date(user.createdAt).toLocaleDateString()}</td>
//               <td>
//                 <button className="delete-button" onClick={() => handleDeleteUser(user._id)}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* You can uncomment this section if you want to show results too */}
//       {/* <h2>User Results</h2>
//       <table className="dashboard-table">
//         <thead>
//           <tr>
//             <th>Username</th>
//             <th>Course</th>
//             <th>Score</th>
//             <th>Submitted At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {userResults.map(result => (
//             <tr key={result._id}>
//               <td>{result.userId.name}</td>
//               <td>{result.courseName}</td>
//               <td>{result.score}</td>
//               <td>{new Date(result.submittedAt).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table> */}
//     </div>
//   );
// };

// export default AdminDashboard;
import React from 'react';
// import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-container">
      <Sidebar />
    </div>
  );
};

export default AdminDashboard;
