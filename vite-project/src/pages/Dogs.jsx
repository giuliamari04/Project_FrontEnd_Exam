import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchDogs, setFilteredDogs } from "../features/dogSlice";
import fetchDogsAction  from "../features/dogs/action";
import {setFilteredDogs} from "../features/dogs/action"
import AnimalCard from "../components/AnimalCard";
import AnimalFilter from "../components/AnimalFilter";
import Loader from "../components/Loader";

const ITEMS_PER_PAGE = 4;

function Dogs() {
  const dispatch = useDispatch();
  const { allDogs,filteredDogs =[], loading, error } = useSelector(state => state.dogs);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState("");
  const [genderSelect, setGender] = useState("");

  useEffect(() => {
    if (!allDogs || allDogs.length === 0) {
      dispatch(fetchDogsAction());
    }
  }, [dispatch, allDogs]);


  // filtro locale
  useEffect(() => {
    let result = [...allDogs];

    if (size) {
      result = result.filter(dog => {
        const weightStr = dog.breeds[0].weight.metric;
        if (!weightStr) return false;
        const numbers = weightStr.split(" - ").map(Number);
        const avgWeight = (numbers[0] + numbers[1]) / 2;
        if (avgWeight < 5) return size === "xs";
        if (avgWeight <= 10) return size === "s";
        if (avgWeight <= 20) return size === "m";
        return size === "l";
      });
    }

    if (genderSelect) {
      result = result.filter(dog => dog.gender === genderSelect);
    }

    dispatch(setFilteredDogs(result));
    // setPage(1);
  }, [size, genderSelect, allDogs, dispatch]);

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const pagedDogs = (filteredDogs || []).slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil((filteredDogs || []).length / ITEMS_PER_PAGE);

  // if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
      <section className="container-elem py-3">
      <div className="content-wrapper-elem pb-4">
         <div className="mt-10 pt-10">
      <AnimalFilter setSize={setSize} setGender={setGender} type="dog" />
      <h2 className="font-bold text-2xl">Dogs available</h2>
      {loading && (
        <div className="flex justify-center my-4">
          <Loader/>
        </div>
      )}
      {!loading && (
        <>
        <section className={`${pagedDogs.length>0?"block":"hidden"}`}>
          <div className=" flex flex-wrap ">
         {pagedDogs.map((dog) => (
        <AnimalCard
          key={dog.id}
          id={dog.id}
          name={dog.name}
          gender= {dog.gender}
          breed={dog.breeds[0].name}
          temperament={dog.breeds[0].temperament}
          image={dog.url}
          like_btn="show"
          animal={dog}
          type="dog"
        />
      ))}
      </div>
       {/* paginazione */}
      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="disabled:opacity-50 my-btn-prev"
        >
        <svg viewBox="-0.6 -0.6 16.20 16.20" fill="none" xmlns="../assets/images/dog-paw.svg" stroke="#70e000" transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)" strokeWidth="0.51"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 0C3.89543 0 3 0.895431 3 2V3C3 4.10457 3.89543 5 5 5C6.10457 5 7 4.10457 7 3V2C7 0.895431 6.10457 0 5 0Z" fill="#38b000"></path> <path d="M10 0C8.89543 0 8 0.895431 8 2V3C8 4.10457 8.89543 5 10 5C11.1046 5 12 4.10457 12 3V2C12 0.895431 11.1046 0 10 0Z" fill="#38b000"></path> <path d="M2 5C0.895431 5 0 5.89543 0 7V7.5C0 8.60457 0.895431 9.5 2 9.5C3.10457 9.5 4 8.60457 4 7.5V7C4 5.89543 3.10457 5 2 5Z" fill="#38b000"></path> <path d="M13 5C11.8954 5 11 5.89543 11 7V7.5C11 8.60457 11.8954 9.5 13 9.5C14.1046 9.5 15 8.60457 15 7.5V7C15 5.89543 14.1046 5 13 5Z" fill="#38b000"></path> <path d="M9.61273 7.77893C8.51793 6.44953 6.48207 6.44953 5.38727 7.77893L2.46943 11.322C1.2614 12.7889 2.30486 15 4.20516 15C4.47668 15 4.74447 14.9368 4.98732 14.8154L5.34699 14.6355C6.70234 13.9578 8.29766 13.9578 9.65301 14.6355L10.0127 14.8154C10.2555 14.9368 10.5233 15 10.7948 15C12.6951 15 13.7386 12.7889 12.5306 11.322L9.61273 7.77893Z" fill="#38b000"></path> </g></svg>        </button>

        <span className="px-4 py-2 page-number">Page {page} of {totalPages}</span>

        <button
          onClick={() => setPage(prev => prev + 1)}
         disabled={page >= totalPages}
          className="px-4 py-2 rounded my-btn-next"
        >
        <svg viewBox="-0.6 -0.6 16.20 16.20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#70e000" transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)" strokeWidth="0.51"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 0C3.89543 0 3 0.895431 3 2V3C3 4.10457 3.89543 5 5 5C6.10457 5 7 4.10457 7 3V2C7 0.895431 6.10457 0 5 0Z" fill="#38b000"></path> <path d="M10 0C8.89543 0 8 0.895431 8 2V3C8 4.10457 8.89543 5 10 5C11.1046 5 12 4.10457 12 3V2C12 0.895431 11.1046 0 10 0Z" fill="#38b000"></path> <path d="M2 5C0.895431 5 0 5.89543 0 7V7.5C0 8.60457 0.895431 9.5 2 9.5C3.10457 9.5 4 8.60457 4 7.5V7C4 5.89543 3.10457 5 2 5Z" fill="#38b000"></path> <path d="M13 5C11.8954 5 11 5.89543 11 7V7.5C11 8.60457 11.8954 9.5 13 9.5C14.1046 9.5 15 8.60457 15 7.5V7C15 5.89543 14.1046 5 13 5Z" fill="#38b000"></path> <path d="M9.61273 7.77893C8.51793 6.44953 6.48207 6.44953 5.38727 7.77893L2.46943 11.322C1.2614 12.7889 2.30486 15 4.20516 15C4.47668 15 4.74447 14.9368 4.98732 14.8154L5.34699 14.6355C6.70234 13.9578 8.29766 13.9578 9.65301 14.6355L10.0127 14.8154C10.2555 14.9368 10.5233 15 10.7948 15C12.6951 15 13.7386 12.7889 12.5306 11.322L9.61273 7.77893Z" fill="#38b000"></path> </g></svg>
        </button>
      </div>
        </section>
        <section className={`${pagedDogs.length<=0?"block":"hidden"}`}>
          <div className="flex justify-center align-center py-16 mt-16 text-3xl">
            <h4>No dogs available with this features in this moment</h4>
          </div>
        </section>
       
        </>
      )}
      
     

    
    </div>
      </div>
    </section>
  );
}

export default Dogs;
