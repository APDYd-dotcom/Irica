import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import Profile from "./pages/Dashboard/Profile";
import Materials from "./pages/Dashboard/Materials";
import Subscription from "./pages/Dashboard/Subscription";

import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminArticlesList from "./pages/Admin/AdminArticlesList";
import AdminArticleForm from "./pages/Admin/AdminArticleForm";
import AdminProgramsList from "./pages/Admin/AdminProgramsList";
import AdminProgramForm from "./pages/Admin/AdminProgramForm";
import AdminPublicationsList from "./pages/Admin/AdminPublicationsList";
import AdminPublicationForm from "./pages/Admin/AdminPublicationForm";
import AdminSubscriptions from "./pages/Admin/AdminSubscriptions";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public pages — anyone can visit */}
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Member dashboard — students see programs registered to their email */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="programs" element={<Materials />} />
            <Route path="materials" element={<Navigate to="../programs" replace />} />
            <Route path="subscription" element={<Subscription />} />
          </Route>
        </Route>

        {/* Admin-only — is_staff users can post/edit/delete articles, programs, and publications */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="articles" replace />} />

            <Route path="articles" element={<AdminArticlesList />} />
            <Route path="articles/new" element={<AdminArticleForm />} />
            <Route path="articles/:id/edit" element={<AdminArticleForm />} />

            <Route path="programs" element={<AdminProgramsList />} />
            <Route path="programs/new" element={<AdminProgramForm />} />
            <Route path="programs/:id/edit" element={<AdminProgramForm />} />

            <Route path="publications" element={<AdminPublicationsList />} />
            <Route path="publications/new" element={<AdminPublicationForm />} />
            <Route path="publications/:id/edit" element={<AdminPublicationForm />} />

            <Route path="subscriptions" element={<AdminSubscriptions />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
