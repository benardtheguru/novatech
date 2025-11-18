import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/login";
import Signup from "./Pages/Signup";
import AdminLogin from "./Pages/AdminLogin";
import UserDashboard from "./Pages/UserDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import PrivateRoute from "./Routes/PrivateRoute";
import AdminRoute from "./Routes/AdminRoute";
import Upload from "./Pages/Upload";
import AboutUs from "./Pages/AboutUs";
import AdminAppointments from "./Pages/AdminAppointments";
import UserAppointments from "./Pages/UserAppointments";

import Appointment from "./Pages/Appointment";
import Result from "./Pages/Result";
import Payment from "./Pages/Payment";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/login/:loginId" element={<AdminLogin />} />
        <Route
          path="/user/dashboard"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route path="/admin/upload" element={<AdminRoute><Upload /></AdminRoute>} />
        <Route path="/admin/about" element={<AdminRoute><AboutUs /></AdminRoute>} />
                <Route path="/admin/appointments" element={<AdminRoute><AdminAppointments /></AdminRoute>} />
        <Route path="/user/appointment" element={<PrivateRoute><Appointment /></PrivateRoute>} />
        <Route path="/user/appointments" element={<PrivateRoute><UserAppointments /></PrivateRoute>} />
        <Route path="/user/results" element={<PrivateRoute><Result /></PrivateRoute>} />
        <Route path="/user/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
        <Route path="/user/about" element={<PrivateRoute><AboutUs /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;









