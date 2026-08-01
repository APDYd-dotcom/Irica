import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import MaterialsPreview from "./pages/MaterialsPreview";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import Profile from "./pages/Dashboard/Profile";
import Materials from "./pages/Dashboard/Materials";
import Subscription from "./pages/Dashboard/Subscription";

import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminMaterialsList from "./pages/Admin/AdminMaterialsList";
import AdminMaterialForm from "./pages/Admin/AdminMaterialForm";
import AdminProgramsList from "./pages/Admin/AdminProgramsList";
import AdminProgramForm from "./pages/Admin/AdminProgramForm";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public pages — anyone can visit */}
        <Route path="/" element={<Home />} />
        <Route path="/materials" element={<MaterialsPreview />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/login" element={<Login />} />

        {/* Protected — only visible when logged in */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="materials" replace />} />
            <Route path="profile" element={<Profile />} />
            <Route path="materials" element={<Materials />} />
            <Route path="subscription" element={<Subscription />} />
          </Route>
        </Route>

        {/* Admin-only — is_staff users can post/edit/delete materials and programs */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="materials" element={<AdminMaterialsList />} />
            <Route path="materials/new" element={<AdminMaterialForm />} />
            <Route path="materials/:id/edit" element={<AdminMaterialForm />} />
            
            <Route path="programs" element={<AdminProgramsList />} />
            <Route path="programs/new" element={<AdminProgramForm />} />
            <Route path="programs/:id/edit" element={<AdminProgramForm />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
