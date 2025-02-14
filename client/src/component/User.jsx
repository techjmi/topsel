import { useEffect, useState } from "react";

const User = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("topsel"));
    setUser(storedUser);
  }, []);
  return (
    <div className="max-w-lg mx-auto p-6  rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Welcome, {user?.fullName}</h2>
      <div className="space-y-2">
        <p><strong>Username:</strong> {user?.username}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Gender:</strong> {user?.gender}</p>
        <p><strong>Date of Birth:</strong> {user?.dob}</p>
        <p><strong>Country:</strong> {user?.country}</p>
      </div>
    </div>
  );
};

export default User;