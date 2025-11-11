import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const { loginUser, loginWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then(() => {
        toast.success("Login successful!");
        navigate("/");
      })
      .catch(err => setError("Invalid email or password."));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="w-80 space-y-3">
        <input name="email" placeholder="Email" className="border p-2 w-full" required />
        <input name="password" placeholder="Password" type="password" className="border p-2 w-full" required />
        {error && <p className="text-red-500">{error}</p>}
        <button className="bg-blue-500 text-white w-full p-2">Login</button>
      </form>
      <p className="mt-2">Forgot Password?</p>
      <p>Don’t have an account? <Link to="/register" className="text-blue-600">Register</Link></p>
      <button onClick={loginWithGoogle} className="mt-3 border p-2 w-80">Login with Google</button>
    </div>
  );
};

export default Login;
