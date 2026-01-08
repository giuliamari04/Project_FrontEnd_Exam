import { useState } from "react";
import { Link } from "react-router";

import "../assets/styles/LoginRegister.css";
const Login = () => {
  //   const [rotation, setRotation] = useState(false);
  const [errors, setErrors] = useState({});
  //   const [flagState, setFlagState] = useState(false);
  const [flagStateLogin, setFlagStateLogin] = useState(false);
  const [showImage, setshowImage] = useState(false);
  //   const [registerData, setRegisterData] = useState({
  //     username: "",
  //     email: "",
  //     password: "",
  //   });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "",
  });

  /* ================= LOGIN ================= */
  const handleLogin = (e) => {
    setshowImage(true);
    e.preventDefault();

    const storedUsers =
      JSON.parse(localStorage.getItem("registeredUser")) || [];

    const foundUser = storedUsers.find(
      (user) =>
        user.email === loginData.email && user.password === loginData.password
    );

    if (foundUser) {
      localStorage.setItem(
        "loggedUser",
        JSON.stringify({
          username: foundUser.username,
          email: foundUser.email,
          role: foundUser.role,
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
      setErrors({general:"Invalid credentials. Try again"});
    }
  };

  return (
    <section className="container-reg">
      <div className="content-wrapper-reg">
        <div className="max-w-md mx-auto p-6">
          {/* {flagState  && !flagStateLogin &&  (<p className="mb-4 text-green-600 font-medium text-center">Registration successful! Please log in.</p>
        )} */}
          {flagStateLogin && (
            <p className="mb-4 text-green-600 font-medium text-center bg-success-soft px-1.5 py-0.5 rounded">
              Login completed! Ready to adopt!
            </p>
          )}
          <div className="flip-card">
            <div className={`flip-card-inner `}>
              {/* FRONT -Login */}
              <div className="flip-card-front">
                <div className="flex justify-between">
                  {/* form */}
                  <div className="w-70 p-3">
                    <h2 className="text-2xl font-semibold mb-6 text-center">
                      Login
                    </h2>
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
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                        className="w-full border p-2 rounded"
                        required
                      />

                      <button className="w-full my-btn text-white py-2 rounded">
                        Login
                      </button>
                       {errors.general && (<p className="text-red-500 text-sm">{errors.general}</p> )}
                    </form>
                    <button className="mt-4 text-sm my-text-green">
                      <Link to="/register">Not Registred yet?</Link>
                    </button>
                  </div>

                  {/* immagine */}
                  <div
                    className={`${showImage ? "container-image" : ""}`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
