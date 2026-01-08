import { useState } from "react";
import Modal from "../components/Modal";

function AddAnimalForm() {
  const [name, setName] = useState("");
  const [type, setType] = useState("dog");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("Male");
  const [weight, setWeight] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdAnimal, setCreatedAnimal] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // NAME
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    // BREED
    if (!breed.trim()) {
      newErrors.breed = "Breed is required";
    } else if (breed.length < 3) {
      newErrors.breed = "Breed must be at least 3 characters";
    }

    // WEIGHT
    if (!weight) {
      newErrors.weight = "Weight is required";
    } else if (Number(weight) <= 0) {
      newErrors.weight = "Weight must be a positive number";
    }

    // IMAGE URL
    if (!imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required";
    } else if (!imageUrl.match(/\.(jpg|jpeg|png)$/i)) {
      newErrors.imageUrl = "Image must be .jpg or .png";
    }

    // Se ci sono errori → stop
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Se tutto OK → crea animale
    const newAnimal = {
      id: Date.now(),
      name,
      gender,
      type,
      url: imageUrl,
      breeds: [
        {
          name: breed,
          weight: { metric: weight },
          temperament: "Friendly",
        },
      ],
    };

    console.log("New Animal add:", newAnimal);
    setCreatedAnimal(newAnimal);
    setIsModalOpen(true);

    // reset form
    setName("");
    setBreed("");
    setWeight("");
    setImageUrl("");
    setGender("Male");
    setType("dog");
    setErrors({});
  };

  return (
    <section className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold py-3">Add new Pet</h2>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex">
          {/* COLONNA SINISTRA */}
          <div className="flex flex-col w-100 px-7">
            <label className="pt-3">Name:</label>
            <input
              className="w-full border p-2 rounded"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}

            <label className="pt-3">Type:</label>
            <select
              className="w-full border p-2 rounded"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </select>

            <label className="pt-3">Breed:</label>
            <input
              className="w-full border p-2 rounded"
              type="text"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />
            {errors.breed && (
              <p className="text-red-500 text-sm">{errors.breed}</p>
            )}
          </div>

          {/* COLONNA DESTRA */}
          <div className="flex flex-col w-100 px-7">
            <label className="pt-3">Gender:</label>
            <select
              className="w-full border p-2 rounded"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <label className="pt-3">Weight (kg):</label>
            <input
              className="w-full border p-2 rounded"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            {errors.weight && (
              <p className="text-red-500 text-sm">{errors.weight}</p>
            )}

            <label className="pt-3">Image URL:</label>
            <input
              className="w-full border p-2 rounded"
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-sm">{errors.imageUrl}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 mx-7 py-2 mt-4 w-50 rounded"
        >
          Add Animal
        </button>
      </form>
       {isModalOpen && (
  <Modal
    message= {
    <p>
    <span className="text-2xl py-3">New {createdAnimal.type} add succesfully! 🐾</span><br />
    <span><strong>Name:</strong> {createdAnimal.name}</span><br />
    <span><strong>Breed:</strong> {createdAnimal.breeds[0].name}</span><br />
    <span><strong>Weight:</strong> {createdAnimal.breeds[0].weight.metric} kg</span><br />
    <span><strong>Link image:</strong> {createdAnimal.url}</span>
    </p>


    }
    onClose={() => setIsModalOpen(false)}
    showConfirm={false}
  />
)}
    </section>
  );
}

export default AddAnimalForm;
