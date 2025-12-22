import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { updateProfile } from "firebase/auth";
import auth from "../firebase/Firebase.config";

const MyProfile = () => {
  const { user, authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [profile, setProfile] = useState(null);
  const [decorator, setDecorator] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", photo: "" });
  const [availabilityLoading, setAvailabilityLoading] = useState(false);

  // Load user profile
  useEffect(() => {
    if (!authLoading && user?.email) {
      axiosSecure.get(`/users/my-profile`).then((res) => {
        setProfile(res.data);
        setFormData({
          name: res.data.name || "",
          photo: res.data.photo || "",
        });

        // If decorator → load decorator info
        if (res.data.role === "decorator") {
          axiosSecure
            .get("/decorators/my-profile")
            .then((dres) => setDecorator(dres.data));
        }
      });
    }
  }, [user, authLoading, axiosSecure]);

  if (authLoading || !profile) {
    return <div className="p-6">Loading profile...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    try {
      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, {
        displayName: formData.name,
        photoURL: formData.photo,
      });

      // Update Backend (MongoDB)
      const res = await axiosSecure.put("/users/my-profile", {
        name: formData.name,
        photo: formData.photo,
      });

      // Update UI state
      setProfile(res.data);
      setEditMode(false);

      alert("Profile updated successfully");
    } catch {
      alert("Profile update failed");
    }
  };

  const toggleAvailability = async () => {
    if (!decorator) return;

    setAvailabilityLoading(true);

    await axiosSecure.patch(`/decorators/${decorator._id}/availability`, {
      isAvailable: !decorator.isAvailable,
    });

    // Optimistic UI update
    setDecorator((prev) => ({
      ...prev,
      isAvailable: !prev.isAvailable,
    }));

    setAvailabilityLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      {/* User Profile Card */}
      <div className="card bg-base-100 shadow-md mb-6">
        <div className="card-body">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={
                profile.photo ||
                "https://img.icons8.com/?size=100&id=z-JBA_KtSkxG&format=png&color=000000"
              }
              alt="profile"
              className="w-28 h-28 rounded-full object-cover"
            />

            <div className="flex-1">
              {!editMode ? (
                <>
                  <h2 className="text-xl font-semibold">{profile.name}</h2>
                  <p className="text-sm opacity-70">{profile.email}</p>
                  <p className="mt-1 badge badge-outline capitalize">
                    Role: {profile.role}
                  </p>
                  <p className="text-xs mt-2 opacity-60">
                    Joined: {new Date(profile.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-xs opacity-60">
                    Last Login:{" "}
                    {new Date(profile.last_loggedIn).toLocaleString()}
                  </p>
                </>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Full Name"
                  />
                  <input
                    type="text"
                    name="photo"
                    value={formData.photo}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Photo URL"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mt-6">
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="btn btn-primary"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleUpdateProfile}
                  className="btn btn-success"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorator Section */}
      {profile.role === "decorator" && decorator && (
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="text-xl font-semibold mb-4">
              Decorator Information
            </h2>

            <div className="flex flex-wrap gap-2 mb-3">
              <span
                className={`badge ${
                  decorator.status === "approved"
                    ? "badge-success"
                    : "badge-warning"
                }`}
              >
                Status: {decorator.status}
              </span>
              <span
                className={`badge ${
                  decorator.isAvailable ? "badge-info" : "badge-ghost"
                }`}
              >
                {decorator.isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>

            <div className="mb-4">
              <p className="font-medium mb-1">Specialties</p>
              <div className="flex flex-wrap gap-2">
                {decorator.specialties?.map((sp, idx) => (
                  <span key={idx} className="badge badge-outline">
                    {sp}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={toggleAvailability}
              disabled={availabilityLoading}
              className={`btn ${
                decorator.isAvailable ? "btn-error" : "btn-accent"
              }`}
            >
              {availabilityLoading
                ? "Updating..."
                : decorator.isAvailable
                ? "Set Unavailable"
                : "Set Available"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
