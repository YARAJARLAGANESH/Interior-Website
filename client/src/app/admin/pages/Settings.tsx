import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import api from '../../../api/api';
import { Button } from '../../components/ui/button';

interface SettingsFormData {
  studioName: string;
  phone: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
  linkedin: string;
}

interface Admin {
  _id?: string;
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  createdAt?: string;
}

export default function Settings() {

  // =========================
  // CURRENT ADMIN (from localStorage or API)
  // =========================

  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(() => {
    try {
      const raw = localStorage.getItem('adminData');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const isSuperAdmin = currentAdmin?.role === 'superadmin';

  const currentAdminId = currentAdmin?._id || currentAdmin?.id;

  // =========================
  // STUDIO SETTINGS
  // =========================

  const [formData, setFormData] =
    useState<SettingsFormData>({
      studioName: '',
      phone: '',
      email: '',
      address: '',
      instagram: '',
      facebook: '',
      linkedin: '',
    });

  // =========================
  // PASSWORD STATES
  // =========================

  const [passwordData, setPasswordData] =
    useState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });

    const [showPasswords, setShowPasswords] =
    useState({
      current: false,
      new: false,
      confirm: false,
      admin: false,
    });

  // =========================
  // CREATE ADMIN STATES
  // =========================

  const [newAdmin, setNewAdmin] =
    useState({
      name: '',
      email: '',
      password: '',
      role: 'admin',
    });

  // =========================
  // ADMIN LIST
  // =========================

  const [admins, setAdmins] = useState<Admin[]>([]);

  // =========================
  // GENERAL STATES
  // =========================

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState('');

  const [success, setSuccess] =
    useState(false);

  const [successMessage, setSuccessMessage] = useState('');

  // =========================
  // FETCH SETTINGS
  // =========================

  useEffect(() => {
    const init = async () => {
      // ensure we have current admin info
      if (!currentAdmin) {
        try {
          const resp = await api.get('/admins/me');
          setCurrentAdmin(resp.data.admin);
          localStorage.setItem('adminData', JSON.stringify(resp.data.admin));
        } catch (e) {
          // allow protected route to handle redirects
        }
      }

      await fetchSettings();

      if ((currentAdmin && currentAdmin.role === 'superadmin') || (!currentAdmin)) {
        // try fetch admins if user is superadmin (or we will re-check after fetching currentAdmin)
        try {
          const resp = await api.get('/admins/me');
          const role = resp.data.admin?.role;
          if (role === 'superadmin') {
            await fetchAdmins();
          }
        } catch (e) {
          // ignore
        }
      }
    };

    init();
  }, []);

  const fetchSettings = async () => {
    try {

      setLoading(true);

      const response =
        await api.get('/settings');

      if (response.data.settings) {
        setFormData(response.data.settings);
      }

    } catch (err) {

      console.error(err);

      setError('Failed to load settings');

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // FETCH ADMINS
  // =========================

  const fetchAdmins = async () => {
    try {

      const response =
        await api.get('/admins');

      setAdmins(response.data.admins);

    } catch (err) {

      console.error(err);
    }
  };

  // =========================
  // SETTINGS INPUT
  // =========================

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // SAVE SETTINGS
  // =========================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setError('');
    setSuccess(false);
    setSaving(true);

    try {

      await api.put('/settings', formData);

      setSuccess(true);
      setSuccessMessage('Settings saved successfully');
      setTimeout(() => {
        setSuccess(false);
        setSuccessMessage('');
      }, 3000);

    } catch (err: any) {

      setError(
        err.response?.data?.message ||
        'Failed to save settings'
      );

    } finally {

      setSaving(false);
    }
  };

  // =========================
  // CHANGE PASSWORD
  // =========================

  const handlePasswordChange =
    async (e: React.FormEvent) => {

      e.preventDefault();

      setError('');
      setSuccess(false);

      if (
        passwordData.newPassword !==
        passwordData.confirmPassword
      ) {
        return setError(
          'Passwords do not match'
        );
      }

      try {

        const response = await api.put(
          '/auth/change-password',
          {
            currentPassword:
              passwordData.currentPassword,

            newPassword:
              passwordData.newPassword,
          }
        );

        setSuccess(true);
        setSuccessMessage(response.data.message || 'Password updated successfully');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setTimeout(() => {
          setSuccess(false);
          setSuccessMessage('');
        }, 3000);

      } catch (err: any) {

        setError(
          err.response?.data?.message ||
          'Failed to change password'
        );
      }
    };

  // =========================
  // CREATE ADMIN
  // =========================

  const handleCreateAdmin =
    async (e: React.FormEvent) => {

      e.preventDefault();

      setError('');
      setSuccess(false);

      try {

        const response = await api.post(
          '/auth/register',
          newAdmin
        );

        setSuccess(true);
        setSuccessMessage(response.data.message || 'Admin created');
        setNewAdmin({
          name: '',
          email: '',
          password: '',
          role: 'admin',
        });
        await fetchAdmins();
        setTimeout(() => {
          setSuccess(false);
          setSuccessMessage('');
        }, 3000);

      } catch (err: any) {

        setError(
          err.response?.data?.message ||
          'Failed to create admin'
        );
      }
    };

  // =========================
  // DELETE ADMIN
  // =========================

  const handleDeleteAdmin =
    async (id: string) => {

      const confirmDelete =
        window.confirm(
          'Are you sure you want to delete this admin?'
        );

      if (!confirmDelete) return;

      try {

        const response = await api.delete(`/admins/${id}`);
        setSuccess(true);
        setSuccessMessage(response.data.message || 'Admin deleted');
        await fetchAdmins();
        setTimeout(() => {
          setSuccess(false);
          setSuccessMessage('');
        }, 3000);

      } catch (err: any) {

        setError(
          err.response?.data?.message ||
          'Failed to delete admin'
        );
      }
    };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">
          Loading...
        </div>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="space-y-8">

      {/* ========================= */}
      {/* STUDIO SETTINGS */}
      {/* ========================= */}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">
            Studio Settings
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6"
        >

          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg">
              Action completed successfully
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <input
              type="text"
              name="studioName"
              value={formData.studioName}
              onChange={handleInputChange}
              placeholder="Studio Name"
              className="border rounded-lg px-4 py-2"
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              className="border rounded-lg px-4 py-2"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="border rounded-lg px-4 py-2"
            />

            <input
              type="url"
              name="instagram"
              value={formData.instagram}
              onChange={handleInputChange}
              placeholder="Instagram"
              className="border rounded-lg px-4 py-2"
            />

            <input
              type="url"
              name="facebook"
              value={formData.facebook}
              onChange={handleInputChange}
              placeholder="Facebook"
              className="border rounded-lg px-4 py-2"
            />

            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleInputChange}
              placeholder="LinkedIn"
              className="border rounded-lg px-4 py-2"
            />

          </div>

          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            rows={3}
            className="border rounded-lg px-4 py-2 w-full mt-6"
          />

          <Button
            type="submit"
            disabled={saving}
            className="mt-6"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>

        </form>
      </div>

      {/* ========================= */}
      {/* CHANGE PASSWORD */}
      {/* ========================= */}

      <div className="bg-white rounded-xl shadow-sm p-6">

        <h2 className="text-xl font-semibold mb-6">
          Change Password
        </h2>

        <form
          onSubmit={handlePasswordChange}
          className="space-y-4"
        >

          <div className="relative">

  <input
    type={
      showPasswords.current
        ? 'text'
        : 'password'
    }
    placeholder="Current Password"
    value={passwordData.currentPassword}
    onChange={(e) =>
      setPasswordData({
        ...passwordData,
        currentPassword: e.target.value,
      })
    }
    className="w-full border rounded-lg px-4 py-2 pr-12"
  />

  <button
    type="button"
    onClick={() =>
      setShowPasswords({
        ...showPasswords,
        current: !showPasswords.current,
      })
    }
    className="absolute right-3 top-2.5 text-gray-500"
  >
    {showPasswords.current
      ? <EyeOff size={18} />
      : <Eye size={18} />
    }
  </button>

</div>

       <div className="relative">

  <input
    type={
      showPasswords.new
        ? 'text'
        : 'password'
    }
    placeholder="New Password"
    value={passwordData.newPassword}
    onChange={(e) =>
      setPasswordData({
        ...passwordData,
        newPassword: e.target.value,
      })
    }
    className="w-full border rounded-lg px-4 py-2 pr-12"
  />

  <button
    type="button"
    onClick={() =>
      setShowPasswords({
        ...showPasswords,
        new: !showPasswords.new,
      })
    }
    className="absolute right-3 top-2.5 text-gray-500"
  >
    {showPasswords.new
      ? <EyeOff size={18} />
      : <Eye size={18} />
    }
  </button>

</div>
          <div className="relative">

  <input
    type={
      showPasswords.confirm
        ? 'text'
        : 'password'
    }
    placeholder="Confirm New Password"
    value={passwordData.confirmPassword}
    onChange={(e) =>
      setPasswordData({
        ...passwordData,
        confirmPassword: e.target.value,
      })
    }
    className="w-full border rounded-lg px-4 py-2 pr-12"
  />

  <button
    type="button"
    onClick={() =>
      setShowPasswords({
        ...showPasswords,
        confirm: !showPasswords.confirm,
      })
    }
    className="absolute right-3 top-2.5 text-gray-500"
  >
    {showPasswords.confirm
      ? <EyeOff size={18} />
      : <Eye size={18} />
    }
  </button>

</div>

          <Button type="submit">
            Change Password
          </Button>

        </form>
      </div>

      {/* ========================= */}
      {/* SUPERADMIN ONLY */}
      {/* ========================= */}

      {isSuperAdmin && (

        <div className="space-y-8">

          {/* CREATE ADMIN */}

          <div className="bg-white rounded-xl shadow-sm p-6">

            <h2 className="text-xl font-semibold mb-6">
              Create New Admin
            </h2>

            <form
              onSubmit={handleCreateAdmin}
              className="space-y-4"
            >

              <input
                type="text"
                placeholder="Name"
                value={newAdmin.name}
                onChange={(e) =>
                  setNewAdmin({
                    ...newAdmin,
                    name: e.target.value,
                  })
                }
                className="w-full border rounded-lg px-4 py-2"
              />

              <input
                type="email"
                placeholder="Email"
                value={newAdmin.email}
                onChange={(e) =>
                  setNewAdmin({
                    ...newAdmin,
                    email: e.target.value,
                  })
                }
                className="w-full border rounded-lg px-4 py-2"
              />

              <div className="relative">

  <input
    type={
      showPasswords.admin
        ? 'text'
        : 'password'
    }
    placeholder="Password"
    value={newAdmin.password}
    onChange={(e) =>
      setNewAdmin({
        ...newAdmin,
        password: e.target.value,
      })
    }
    className="w-full border rounded-lg px-4 py-2 pr-12"
  />

  <button
    type="button"
    onClick={() =>
      setShowPasswords({
        ...showPasswords,
        admin: !showPasswords.admin,
      })
    }
    className="absolute right-3 top-2.5 text-gray-500"
  >
    {showPasswords.admin
      ? <EyeOff size={18} />
      : <Eye size={18} />
    }
  </button>

</div>

              <select
                value={newAdmin.role}
                onChange={(e) =>
                  setNewAdmin({
                    ...newAdmin,
                    role: e.target.value,
                  })
                }
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="admin">
                  Admin
                </option>

                <option value="superadmin">
                  Super Admin
                </option>
              </select>

              <Button type="submit">
                Create Admin
              </Button>

            </form>
          </div>

          {/* ADMIN LIST */}

          <div className="bg-white rounded-xl shadow-sm p-6">

            <h2 className="text-xl font-semibold mb-6">
              Admin Management
            </h2>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">
                      Name
                    </th>

                    <th className="text-left py-3">
                      Email
                    </th>

                    <th className="text-left py-3">
                      Role
                    </th>

                    <th className="text-left py-3">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {admins.map((admin) => (

                    <tr
                      key={admin._id}
                      className="border-b"
                    >

                      <td className="py-4">
                        {admin.name}
                      </td>

                      <td className="py-4">
                        {admin.email}
                      </td>

                      <td className="py-4">
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
                          {admin.role}
                        </span>
                      </td>

                      <td className="py-4">

                        {admin._id !== currentAdminId && (

                          <button
                            onClick={() =>
                              handleDeleteAdmin(admin._id)
                            }
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>

                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}