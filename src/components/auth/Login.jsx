import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const { loginUser, loginWithGoogle, user, loading } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleLogin = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then(() => {
        toast.success("Login successful!", {
      duration: 2000,
      position: "top-center",
    });
        setTimeout(() => {
          navigate("/");
        }, 50);
      })
      .catch(err => {
        setError("Invalid email or password.");
        toast.error("Login failed: ", {
      duration: 2000,
      position: "top-center",
    });
      });
  };

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(() => {
        toast.success("Login with Google successful!", {
      duration: 2000,
      position: "top-center",
    });
        setTimeout(() => {
          navigate("/");
        }, 50);
      })
      .catch(err => {
        setError("Google login failed.");
        toast.error("Google login failed: ", {
      duration: 2000,
      position: "top-center",
    });
      });
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
      <p>
        Don’t have an account? <Link to="/register" className="text-blue-600">Register</Link>
      </p>
      <button onClick={handleGoogleLogin} className="mt-3 border p-2 w-80">
        Login with Google
      </button>
      <Toaster
        // position="top-center"
        toastOptions={{
          duration: 2000,
          style: { fontSize: "16px" },
        }}
      />
    </div>
  );
};

export default Login;
