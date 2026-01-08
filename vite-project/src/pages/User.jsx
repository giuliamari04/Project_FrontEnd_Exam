import "../assets/styles/User.css";
import AnimalCard from "../components/AnimalCard";
import { useState } from "react";
import Modal from "../components/Modal";

function User() {
  const registeredUsers =
    JSON.parse(localStorage.getItem("registeredUser")) || [];
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || null;
  const likedAnimal = JSON.parse(localStorage.getItem("likes")) || [];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteAccount = () => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    const registeredUsers =
      JSON.parse(localStorage.getItem("registeredUser")) || [];

    const updatedUsers = registeredUsers.filter(
      user => user.email !== loggedUser.email
    );

    localStorage.setItem("registeredUser", JSON.stringify(updatedUsers));
    localStorage.removeItem("loggedUser");

    window.location.href = "/";
  };
  console.log("logged user ;", loggedUser);
  // Cancella un utente specifico (solo admin)
  const deleteUser = (email) => {
    if (!loggedUser || loggedUser.role !== "admin") return;

    const updatedUsers = registeredUsers.filter((user) => user.email !== email);
    localStorage.setItem("registeredUser", JSON.stringify(updatedUsers));
    // Se stai visualizzando la pagina senza reload, puoi forzare il refresh dei dati:
    window.location.reload(); // oppure usare uno stato React per aggiornare l'UI
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedUser"); // o "loggedUser" se gestisci login
    window.location.href = "/"; // forza il refresh per aggiornare la UI
  };

  return (
    <div className="container-user">
      {/* contenitore logged user */}
      <div className="mt-14">
        <div className="bg-white p-3 mb-3 rounded-md flex justify-around">
          <div>
            <h3 className="text-2xl font-bold">Profile</h3>
            <p>
              <span className="font-bold">username:</span> {loggedUser?.username}
              <br />
              <span className="font-bold">email: </span>{loggedUser?.email}
            </p>
          </div>

          <button className="sign-out my-3" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
        <div
          className={`${
            loggedUser.role === "admin" ? "hidden" : "block"
          } bg-white p-3 rounded-md`}
        >
          <h3 className="text-2xl font-bold text-center">
            List of animal that you liked ❤:
          </h3>
          <div className="container-cards">
            <div className="flex flex-wrap">
              {likedAnimal.map((likes) => (
                <div key={likes.id_animal} className="m-2 my-cards">
                  <AnimalCard
                    key={likes.id}
                    id={likes.id}
                    name={likes.name}
                    gender={likes.gender}
                    breed={likes.breed}
                    temperament={likes.temperament}
                    image={likes.image}
                    like_btn=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* contenitore user registred per admin */}
      <div className="mt-14">
        <div
          className={`${
            loggedUser.role === "admin" ? "block" : "hidden"
          } bg-white p-3 rounded-md`}
        >
          <h3 className="text-2xl font-bold"> All Registered Users:</h3>
          <table class="table-auto">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Delete Account</th>
                  </tr>
                </thead>
                <tbody>
                  {registeredUsers.map((registeredUser) => (
                    <tr key={registeredUser.id}>
                      <td>{registeredUser.username}</td>
                      <td>{registeredUser.email}</td>
                      <td>{registeredUser.role}</td>
                      <td><button className="delete-btn mx-3" onClick={() => deleteUser(registeredUser.email)}> delete </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          <div>
            {/* all likes */}
             <h3 className="text-2xl font-bold py-3 mt-4">
            List of all animal that have been liked:
          </h3>
            <div
              className={`${
                loggedUser.role === "admin" ? "block" : "hidden"
              } py-4`}
            >
              <table class="table-auto">
                <thead>
                  <tr>
                    <th>ID Animal</th>
                    <th>User</th>
                    <th>Animal Name</th>
                    <th>Breed Animal</th>
                  </tr>
                </thead>
                <tbody>
                  {likedAnimal.map((likes) => (
                    <tr key={likes.id_animal}>
                      <td>{likes.id_animal}</td>
                      <td>{likes.loggedUser}</td>
                      <td>{likes.name}</td>
                      <td>{likes.breed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
       <div className="bg-white p-3 mb-3 rounded-md mt-3">
        <h5>Do you want to delete your account?</h5>

        <button
          className="delete-btn my-3"
          onClick={() => setIsModalOpen(true)}
        >
          Delete account
        </button>
      </div>

      {isModalOpen && (
  <Modal
    message="Are you sure that you want to delete your account?"
    onClose={() => setIsModalOpen(false)}
    onConfirm={deleteAccount}
    showConfirm={true}
  />
)}
    </div>
  );
}

export default User;
