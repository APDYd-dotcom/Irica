import { useState } from "react";
import axiosClient from "../../api/axiosClient";
import { handleChange } from "../../utils/formHandles";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { useAuth } from "../../hooks/useAuth";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage";

function Profile() {
  const { user, updateUser } = useAuth();

  // --- Profile info form ---
  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    email: user?.email || "",
    phone_number: user?.phone_number || "",
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState(null);

  function handleProfileSubmit(e) {
    e.preventDefault();
    setSavingProfile(true);
    setProfileSuccess(false);
    setProfileError(null);

    axiosClient
      .patch("/auth/profile/", formData)
      .then((response) => {
        updateUser(response.data);
        setProfileSuccess(true);
      })
      .catch((err) => setProfileError(getErrorMessage(err)))
      .finally(() => setSavingProfile(false));
  }

  // --- Change password form ---
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
  });
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState(null);

  function handlePasswordSubmit(e) {
    e.preventDefault();
    setSavingPassword(true);
    setPasswordSuccess(false);
    setPasswordError(null);

    axiosClient
      .post("/auth/change-password/", passwordData)
      .then(() => {
        setPasswordSuccess(true);
        setPasswordData({ old_password: "", new_password: "" });
      })
      .catch((err) => setPasswordError(getErrorMessage(err)))
      .finally(() => setSavingPassword(false));
  }

  return (
    <div className="space-y-8">
      {/* Profile info card */}
      <div className="bg-white rounded-2xl shadow-sm border border-ink/10 p-6">
        <h2 className="text-lg font-serif text-ink mb-4">Profile Information</h2>

        {profileSuccess && <div className="mb-4"><SuccessMessage message="Profile updated!" /></div>}
        {profileError && <div className="mb-4"><ErrorMessage message={profileError} /></div>}

        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Full Name</label>
            <input
              name="full_name"
              value={formData.full_name}
              onChange={(e) => handleChange(e, setFormData)}
              className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e, setFormData)}
              className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">Phone Number</label>
            <input
              name="phone_number"
              value={formData.phone_number}
              onChange={(e) => handleChange(e, setFormData)}
              className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
            />
          </div>

          <button
            type="submit"
            disabled={savingProfile}
            className="bg-forest-800 hover:bg-forest-700 disabled:opacity-50 text-white font-medium px-5 py-2.5 rounded-lg"
          >
            {savingProfile ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>

      {/* Change password card */}
      <div className="bg-white rounded-2xl shadow-sm border border-ink/10 p-6">
        <h2 className="text-lg font-serif text-ink mb-4">Change Password</h2>

        {passwordSuccess && <div className="mb-4"><SuccessMessage message="Password changed!" /></div>}
        {passwordError && <div className="mb-4"><ErrorMessage message={passwordError} /></div>}

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Current Password</label>
            <input
              type="password"
              name="old_password"
              value={passwordData.old_password}
              onChange={(e) => handleChange(e, setPasswordData)}
              className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1">New Password</label>
            <input
              type="password"
              name="new_password"
              value={passwordData.new_password}
              onChange={(e) => handleChange(e, setPasswordData)}
              className="w-full border border-ink/15 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-forest-800/40"
            />
          </div>

          <button
            type="submit"
            disabled={savingPassword}
            className="bg-forest-800 hover:bg-forest-700 disabled:opacity-50 text-white font-medium px-5 py-2.5 rounded-lg"
          >
            {savingPassword ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
