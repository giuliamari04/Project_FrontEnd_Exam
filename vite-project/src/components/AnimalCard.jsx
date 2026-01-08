import { useState } from "react";
import "../assets/styles/Card.css";
import Modal from "../components/Modal";
import ModalCards from "../components/ModalCards";

const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || null; //estrae user loggato

function AnimalCard({
  id,
  name,
  breed,
  image,
  gender,
  temperament,
  like_btn,
  animal,
  type,
}) {
  //card liked
  const [userLikes, setUserLikes] = useState(
    JSON.parse(localStorage.getItem("likes")) || []
  );

  //gestione modale login/cards
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCardOpen, setIsModalCardOpen] = useState(false);
  
  //modale login
  const handleModalcard = () => {
    setIsModalCardOpen(true);
  };
  const handleLike = () => {
    if (!loggedUser) {
      setIsModalOpen(true);
      return;
    }

    // controlla se l'utente ha già messo like a questo animale
    const alreadyLiked = userLikes.some(
      (like) => like.id_animal === id && like.loggedUser === loggedUser.email
    );

    let updatedLikes;
    if (alreadyLiked) {
      // se già like, lo rimuovo
      updatedLikes = userLikes.filter(
        (like) =>
          !(like.id_animal === id && like.loggedUser === loggedUser.email)
      );
    } else {
      // se non ancora like, lo aggiungo
      const newLike = {
        loggedUser: loggedUser.email,
        id_animal: id,
        name,
        breed,
        image,
        gender,
        temperament,
      };
      updatedLikes = [...userLikes, newLike];
    }

    // aggiorna lo stato e il localStorage
    setUserLikes(updatedLikes);
    localStorage.setItem("likes", JSON.stringify(updatedLikes));
  };

  // il cuore è cliccato se l'utente ha messo like
  const isLiked = userLikes.some(
    (like) => like.id_animal === id && like.loggedUser === loggedUser?.email
  );

  return (
    <div className="animal-card my-bg rounded-xl block p-4 shadow-xs m-2 flex relative">
      <div className="card-image">
        <img className="rounded-base image" src={image} alt={breed} />
      </div>
      <div className="text-card flex flex-col justify-aroundn px-6">
        <h5 className="mt-6 mb-2 text-2xl font-semibold tracking-tight text-heading">
          {name}{" "}
        </h5>
        <p>
          <span className="font-bold"> Breed</span>
          <br /> {breed}
        </p>
        <button className="btn-info my-4" onClick={handleModalcard}>
          read more →
        </button>
        {isModalCardOpen && (
          <ModalCards
            animal={animal}
            type={type}
            onClose={() => setIsModalCardOpen(false)}
          />
        )}
      </div>

      {/* absolute */}
      <button
        className={`like-btn ${like_btn === "show" ? "" : "hidden"} ${
          isLiked ? "checked-likeBtn" : ""
        } like-btn`}
        onClick={handleLike}
      >
        ♥
      </button>

      {isModalOpen && (
        <Modal
          message="You have to login first"
          onClose={() => setIsModalOpen(false)}
          showConfirm={false}
        />
      )}

      <div
        className={`${
          gender === "Female" ? "text-pink-500" : "text-sky-500"
        } gender font-bold`}
      >
        {gender === "Male" ? "M ♂" : "F ♀"}
      </div>
    </div>
  );
}

export default AnimalCard;
