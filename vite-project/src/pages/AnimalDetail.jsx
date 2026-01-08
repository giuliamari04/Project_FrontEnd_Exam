import "../assets/styles/SingleAnimal.css";
import { useLocation, useParams } from "react-router-dom";

function AnimalDetail() {
  const { state } = useLocation();
  const { animalId } = useParams();
  console.log(animalId)
  const animal = state?.animal; // i dati passati dal Link
  const type = state?.type; // i dati passati dal Link
 console.log("type",type)
  if (!animal) return <p>Animal not found</p>;

  return (
    <div className="container-animals px-12 py-6 flex">
      <div className="image-animal">
        <h2 className="text-3xl bg-white rounded-lg font-bold mb-4 text-center">{animal.name}</h2>
      <img src={animal.url} alt={animal.name} className="w-full max-w-md mx-auto mb-4" />
      </div>
      
       <div className=" bg-white rounded-lg w-100 px-5 mx-4">
              <h3 className="text-2xl font-bold py-3">
                Hi! My name is {animal.name}
              </h3>
              I'm a {animal.gender} dog and I'm a {animal.breeds[0].temperament}
              friend.
              <br />
              <span className={`${type === "dog" ? "block" : "hidden"}`}>
                My skills? {animal.breeds[0].bred_for}.
              </span>
              <span className={`${type === "dog" ? "hidden" : "block"}`}>
                My origin? {animal.breeds[0].origin}
              </span>
              <br />
              <br />I weight around {animal.breeds[0].weight.metric} kg and I
              can't wait to meet you and find my <strong>forever</strong>
              family!
              <h5 className="py-3">
                <span className="font-bold">Breed:</span>
                {animal.breeds[0].name}
              </h5>
            </div>
    </div>
  );
}

export default AnimalDetail;
