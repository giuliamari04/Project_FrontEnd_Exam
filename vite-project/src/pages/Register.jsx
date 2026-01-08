import { useState } from "react";
import "../assets/styles/LoginRegister.css";
const Register = () => {
  const [rotation, setRotation] = useState(true);
  const [errors, setErrors] = useState({});
  const [flagState, setFlagState] = useState(false);
  const [flagStateLogin, setFlagStateLogin] = useState(false);
  const [showImage, setshowImage]= useState(false);
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
    const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const newError = {};
  /* ================= REGISTER ================= */
  const validateRegister = () => {
  const newErrors = {};

  if (!registerData.username) {
    newErrors.username = "Username is required";
  } else if (registerData.username.length < 3) {
    newErrors.username = "Username must be at least 3 characters";
  }

  if (!registerData.email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
    newErrors.email = "Email is invalid";
  }

  if (!registerData.password) {
    newErrors.password = "Password is required";
  } else if (registerData.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  } else if (!/(?=.*[0-9])/.test(registerData.password)) {
    newErrors.password = "Password must contain at least one number";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};
 
 
   const handleRegister = (e) => {
    e.preventDefault();

    if (!validateRegister()){
      showImage(false);
      return;
    }
    
    const storedUsers = JSON.parse(localStorage.getItem("registeredUser")) || [];

    
  // Controllo email unica
  const emailExists = storedUsers.some(user => user.email === registerData.email);
  if (emailExists) {
    setErrors({ email: "Email already registered" });
    return; // blocca la registrazione
  }
    // Aggiungi ruolo di default "user"
    const newUser = { ...registerData, role: "user", likes:[] };
     const updatedUsers = [...storedUsers, newUser];

    localStorage.setItem("registeredUser", JSON.stringify(updatedUsers));
    // alert("Registration successful!");
    setFlagState(true);

    setRegisterData({ username: "", email: "", password: "" });
    setRotation(false);
    Object.keys(newError).length === 0;
  };

  /* ================= LOGIN ================= */
  const handleLogin = (e) => {
    setshowImage(true);
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("registeredUser")) || [];

const foundUser = storedUsers.find(
  user => user.email === loginData.email && user.password === loginData.password
);

if (foundUser) {
  localStorage.setItem(
    "loggedUser",
    JSON.stringify({
      username: foundUser.username,
      email: foundUser.email,
      role: foundUser.role
    })
  );
  setFlagStateLogin(true);
  setshowImage(true);
  setTimeout(() => {
    window.location.href = "/";
    setshowImage(false);
  }, 3000);
} else {
  setshowImage(false);
  setErrors({general:"Invaid credentials. Try again"});
}

  };

  
  return (
    <section className="container-reg">
      <div className="content-wrapper-reg">
        <div className="max-w-md mx-auto p-6">
        {flagState  && !flagStateLogin &&  (<p className="mb-4 text-green-600 font-medium text-center">Registration successful! Please log in.</p>
        )}
        {flagStateLogin && (<p className="mb-4 text-green-600 font-medium text-center bg-success-soft px-1.5 py-0.5 rounded">Login completed!</p>
        )}
      <div className="flip-card">
        <div className={`flip-card-inner ${rotation ? "rotation" : ""}`}>

          {/* FRONT -Login */}
          <div className="flip-card-front">
            <div className="flex justify-between">
              {/* form */}
              <div className="w-70 p-3">
  <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
         <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />
               
              <button className="w-full my-btn text-white py-2 rounded">
                Login
              </button>
              {errors.general && (<p className="text-red-500 text-sm">{errors.general}</p> )}

            </form>
            <button
              onClick={() => setRotation(true)}
              className="mt-4 text-sm my-text-green"
            >
              Not Registred yet?
            </button>
              </div>

              {/* immagine */}
              <div className={`${showImage? "container-image": ""}`}>
                
              </div>
            </div>
          
          </div>

          {/* BACK -Registration*/}
          <div className="flip-card-back">
            <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
                   <form onSubmit={handleRegister} className="space-y-4">
              <input
                placeholder="Username"
                type="text"
                value={registerData.username}
                onChange={(e) =>
                  setRegisterData({ ...registerData, username: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />
              {errors.username && (<p className="text-red-500 text-sm">{errors.username}</p>
              )}
              <input
                type="email"
                placeholder="Email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />
              {errors.email && (<p className="text-red-500 text-sm">{errors.email}</p>
              )}
              <input
                type="password"
                placeholder="Password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />
                {errors.password && (<p className="text-red-500 text-sm">{errors.password}</p>)}
              <button className="w-full my-btn text-white py-2 rounded">
                Register
              </button>
            </form>
            <button
              onClick={() => setRotation(false)}
              className="mt-4 text-sm mu-text-green"
            >
              Login
            </button>
          </div>

        </div>
      </div>
    </div>
      </div>
       
    </section>
   
  );
};

export default Register;
