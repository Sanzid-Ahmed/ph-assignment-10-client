import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { createUser, updateUserProfile, loginWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = e => {
    e.preventDefault();
    setError("");
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    if (!/[A-Z]/.test(password)) return setError("Password must have one uppercase letter.");
    if (!/[a-z]/.test(password)) return setError("Password must have one lowercase letter.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");

    createUser(email, password)
      .then(res => {
        
        updateUserProfile(name, photo)
          .then(() => {
            toast.success("Registration successful!");
            setTimeout(() => navigate("/"), 50); 
          })
          .catch(err => setError("Failed to update profile: " + err.message));
      })
      .catch(err => setError(err.message));
  };

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(() => {
        toast.success("Google login successful!");
        setTimeout(() => navigate("/"), 50);
      })
      .catch(err => setError("Google login failed: " + err.message));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="w-80 space-y-3">
        <input name="name" placeholder="Name" className="border p-2 w-full" required />
        <input name="email" placeholder="Email" className="border p-2 w-full" required />
        <input name="photo" placeholder="Photo URL" className="border p-2 w-full" />
        <input name="password" placeholder="Password" type="password" className="border p-2 w-full" required />
        {error && <p className="text-red-500">{error}</p>}
        <button className="bg-blue-500 text-white w-full p-2">Register</button>
      </form>
      <p className="mt-2">
        Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
      </p>
      <button onClick={handleGoogleLogin} className="mt-3 border p-2 w-80">Sign in with Google</button>
    </div>
  );
};

export default Register;
