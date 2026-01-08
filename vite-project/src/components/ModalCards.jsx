import "../assets/styles/Modal.css";

function ModalCards({ animal, type, onClose }) {
  // console.log("dogs in modal", animal);
  return (
    <div className="my-modal" onClick={onClose}>
      <div
        className="modal-content my-bg-green rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div>
          <h3 className="text-2xl font-bold px-5 py-3">Info Card </h3>
          <div className="flex mini-card">
            <div className="card-image-modal mx-3">
              <img
                className="rounded-base image"
                src={animal.url}
                alt={animal.name}
              />
            </div>
            <p className="w-100 px-5">
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
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCards;
