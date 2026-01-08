import '../assets/styles/Home.css';
import { Link } from 'react-router';
import dogImage from '../assets/images/dog.png';
import catImage from '../assets/images/cat.png';

function Home() {
  const loggedUser = localStorage.getItem("loggedUser")
  ? JSON.parse(localStorage.getItem("loggedUser"))
  : null;

  return (
    <section className="container-home">
      <div className="hero">
        <h1 className="text-6xl text-heading">Paw Shelter</h1>
        <h3 className="text-3xl font-semibold text-heading pb-9">
          Dogs & Cats
        </h3>
        <p className="text-4xl font-bold pb-9">
          Every paw deserves a loving home. <br />
          Adopt today and change a life.
        </p>
          <div className={`${!loggedUser? "hidden":"block"}`}>
            <Link to="/dogs">
          <span className="my-btn">👉 Adopt Now</span>
        </Link>
        </div>
        <div className={`${loggedUser? "hidden":"block"} z-3`}>
            <Link to="/login">
          <span className="my-btn">👉 Login or register Now</span>
        </Link>
        </div>
      
      </div>

      <div className="dog-image">
        <img src={dogImage} alt="dog" />
      </div>
      <div className='cat-image'>
        <img src={catImage} alt="cat" />
      </div>
    </section>
  );
}

export default Home;
