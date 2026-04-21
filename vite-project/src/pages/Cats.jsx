import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchCats, setFilteredCats } from "../features/catSlice";
import fetchCatsAction from "../features/cats/action";
import { setFilteredCats } from "../features/cats/action";
import AnimalCard from "../components/AnimalCard";
import AnimalFilter from "../components/AnimalFilter";
import Loader from "../components/Loader";


const ITEMS_PER_PAGE = 4;

function Cats() {
  const dispatch = useDispatch();
  const { allCats, filteredCats =[], loading, error } = useSelector(state => state.cats);
  console.log("cats from redux", allCats, filteredCats)
  const [page, setPage] = useState(1);
  const [size, setSize] = useState("");
  const [genderSelect, setGender] = useState("");

  // Fetch cats on mount
  useEffect(() => {
    if (!allCats || allCats.length === 0) {
      dispatch(fetchCatsAction()); // <-- qui chiami la thunk
    }
  }, [dispatch, allCats]);

  // Filtro locale
  useEffect(() => {
    let result = [...allCats];

    if (size) {
      result = result.filter(cat => {
        const weightStr = cat.breeds[0].weight.metric;
        if (!weightStr) return false;
        const numbers = weightStr.split(" - ").map(Number);
        const avgWeight = (numbers[0] + numbers[1]) / 2;
        if (avgWeight < 3) return size === "xs";
        if (avgWeight <= 4) return size === "s";
        if (avgWeight <= 6) return size === "m";
        return size === "l";
      });
    }

    if (genderSelect) {
      result = result.filter(cat => cat.gender === genderSelect);
    }

    dispatch(setFilteredCats(result)); // <-- aggiorni lo stato filtrato
    // setPage(1); // resetta la pagina quando cambi filtro
  }, [size, genderSelect, allCats, dispatch]);

  // Paginazione
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const pagedCats = (filteredCats || []).slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil((filteredCats || [].length) / ITEMS_PER_PAGE);

  if (error) return <p>{error}</p>;

  return (
    <section className="container-elem py-3">
      <div className="content-wrapper-elem pb-4">
        <div className="mt-10 pt-10">
          <AnimalFilter setSize={setSize} setGender={setGender} type="cat" />
          <h2 className="font-bold text-2xl">Cats available</h2>

          {loading && (
            <div className="flex justify-center my-4">
              <Loader />
            </div>
          )}

          {!loading && (
            <>
            <section className={`${pagedCats.length>0?"block":"hidden"}`}>
                <div className="flex flex-wrap">
                  {pagedCats.map((cat) => (
                    <AnimalCard
                      key={cat.id}
                      id={cat.id}
                      name={cat.name}
                      gender={cat.gender}
                      breed={cat.breeds[0].name}
                      temperament={cat.breeds[0].temperament}
                      image={cat.url}
                      like_btn="show"
                      animal={cat}
                      type="cat"
                    />
                  ))}
                </div>
              

              {/* Paginazione */}
              <div className="flex justify-center mt-4 gap-4">
                <button
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="disabled:opacity-50 my-btn-prev"
                >
<<<<<<< HEAD
                   <svg viewBox="-0.6 -0.6 16.20 16.20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#70e000" transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)" strokeWidth="0.51"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 0C3.89543 0 3 0.895431 3 2V3C3 4.10457 3.89543 5 5 5C6.10457 5 7 4.10457 7 3V2C7 0.895431 6.10457 0 5 0Z" fill="#38b000"></path> <path d="M10 0C8.89543 0 8 0.895431 8 2V3C8 4.10457 8.89543 5 10 5C11.1046 5 12 4.10457 12 3V2C12 0.895431 11.1046 0 10 0Z" fill="#38b000"></path> <path d="M2 5C0.895431 5 0 5.89543 0 7V7.5C0 8.60457 0.895431 9.5 2 9.5C3.10457 9.5 4 8.60457 4 7.5V7C4 5.89543 3.10457 5 2 5Z" fill="#38b000"></path> <path d="M13 5C11.8954 5 11 5.89543 11 7V7.5C11 8.60457 11.8954 9.5 13 9.5C14.1046 9.5 15 8.60457 15 7.5V7C15 5.89543 14.1046 5 13 5Z" fill="#38b000"></path> <path d="M9.61273 7.77893C8.51793 6.44953 6.48207 6.44953 5.38727 7.77893L2.46943 11.322C1.2614 12.7889 2.30486 15 4.20516 15C4.47668 15 4.74447 14.9368 4.98732 14.8154L5.34699 14.6355C6.70234 13.9578 8.29766 13.9578 9.65301 14.6355L10.0127 14.8154C10.2555 14.9368 10.5233 15 10.7948 15C12.6951 15 13.7386 12.7889 12.5306 11.322L9.61273 7.77893Z" fill="#38b000"></path> </g></svg>
=======
                          <svg viewBox="-0.6 -0.6 16.20 16.20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#70e000" transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)" strokeWidth="0.51"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 0C3.89543 0 3 0.895431 3 2V3C3 4.10457 3.89543 5 5 5C6.10457 5 7 4.10457 7 3V2C7 0.895431 6.10457 0 5 0Z" fill="#38b000"></path> <path d="M10 0C8.89543 0 8 0.895431 8 2V3C8 4.10457 8.89543 5 10 5C11.1046 5 12 4.10457 12 3V2C12 0.895431 11.1046 0 10 0Z" fill="#38b000"></path> <path d="M2 5C0.895431 5 0 5.89543 0 7V7.5C0 8.60457 0.895431 9.5 2 9.5C3.10457 9.5 4 8.60457 4 7.5V7C4 5.89543 3.10457 5 2 5Z" fill="#38b000"></path> <path d="M13 5C11.8954 5 11 5.89543 11 7V7.5C11 8.60457 11.8954 9.5 13 9.5C14.1046 9.5 15 8.60457 15 7.5V7C15 5.89543 14.1046 5 13 5Z" fill="#38b000"></path> <path d="M9.61273 7.77893C8.51793 6.44953 6.48207 6.44953 5.38727 7.77893L2.46943 11.322C1.2614 12.7889 2.30486 15 4.20516 15C4.47668 15 4.74447 14.9368 4.98732 14.8154L5.34699 14.6355C6.70234 13.9578 8.29766 13.9578 9.65301 14.6355L10.0127 14.8154C10.2555 14.9368 10.5233 15 10.7948 15C12.6951 15 13.7386 12.7889 12.5306 11.322L9.61273 7.77893Z" fill="#38b000"></path> </g></svg>       

>>>>>>> 468de2f (fix)
                </button>
                <span className="px-4 py-2 page-number">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(prev => prev + 1)}
                  disabled={page >= totalPages}
                  className="px-4 py-2 rounded my-btn-next"
                >
<<<<<<< HEAD
                   <svg viewBox="-0.6 -0.6 16.20 16.20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#70e000" transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)" strokeWidth="0.51"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 0C3.89543 0 3 0.895431 3 2V3C3 4.10457 3.89543 5 5 5C6.10457 5 7 4.10457 7 3V2C7 0.895431 6.10457 0 5 0Z" fill="#38b000"></path> <path d="M10 0C8.89543 0 8 0.895431 8 2V3C8 4.10457 8.89543 5 10 5C11.1046 5 12 4.10457 12 3V2C12 0.895431 11.1046 0 10 0Z" fill="#38b000"></path> <path d="M2 5C0.895431 5 0 5.89543 0 7V7.5C0 8.60457 0.895431 9.5 2 9.5C3.10457 9.5 4 8.60457 4 7.5V7C4 5.89543 3.10457 5 2 5Z" fill="#38b000"></path> <path d="M13 5C11.8954 5 11 5.89543 11 7V7.5C11 8.60457 11.8954 9.5 13 9.5C14.1046 9.5 15 8.60457 15 7.5V7C15 5.89543 14.1046 5 13 5Z" fill="#38b000"></path> <path d="M9.61273 7.77893C8.51793 6.44953 6.48207 6.44953 5.38727 7.77893L2.46943 11.322C1.2614 12.7889 2.30486 15 4.20516 15C4.47668 15 4.74447 14.9368 4.98732 14.8154L5.34699 14.6355C6.70234 13.9578 8.29766 13.9578 9.65301 14.6355L10.0127 14.8154C10.2555 14.9368 10.5233 15 10.7948 15C12.6951 15 13.7386 12.7889 12.5306 11.322L9.61273 7.77893Z" fill="#38b000"></path> </g></svg>
=======
                          <svg viewBox="-0.6 -0.6 16.20 16.20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#70e000" transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)" strokeWidth="0.51"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 0C3.89543 0 3 0.895431 3 2V3C3 4.10457 3.89543 5 5 5C6.10457 5 7 4.10457 7 3V2C7 0.895431 6.10457 0 5 0Z" fill="#38b000"></path> <path d="M10 0C8.89543 0 8 0.895431 8 2V3C8 4.10457 8.89543 5 10 5C11.1046 5 12 4.10457 12 3V2C12 0.895431 11.1046 0 10 0Z" fill="#38b000"></path> <path d="M2 5C0.895431 5 0 5.89543 0 7V7.5C0 8.60457 0.895431 9.5 2 9.5C3.10457 9.5 4 8.60457 4 7.5V7C4 5.89543 3.10457 5 2 5Z" fill="#38b000"></path> <path d="M13 5C11.8954 5 11 5.89543 11 7V7.5C11 8.60457 11.8954 9.5 13 9.5C14.1046 9.5 15 8.60457 15 7.5V7C15 5.89543 14.1046 5 13 5Z" fill="#38b000"></path> <path d="M9.61273 7.77893C8.51793 6.44953 6.48207 6.44953 5.38727 7.77893L2.46943 11.322C1.2614 12.7889 2.30486 15 4.20516 15C4.47668 15 4.74447 14.9368 4.98732 14.8154L5.34699 14.6355C6.70234 13.9578 8.29766 13.9578 9.65301 14.6355L10.0127 14.8154C10.2555 14.9368 10.5233 15 10.7948 15C12.6951 15 13.7386 12.7889 12.5306 11.322L9.61273 7.77893Z" fill="#38b000"></path> </g></svg>

>>>>>>> 468de2f (fix)
                </button>
              </div>
              </section>
              <section className={`${pagedCats.length<=0?"block":"hidden"}`}>
                  <div className="flex justify-center py-16 text-3xl">
                  <h4>No cats available with this features in this moment</h4>
                </div>
              </section>
            </>
          )}
        </div>
    
    
              
            </div>    
    </section>
  );
}

export default Cats;
