import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCats, setFilteredCats } from "../features/catSlice";
import AnimalCard from "../components/AnimalCard";
import AnimalFilter from "../components/AnimalFilter";
import Loader from "../components/Loader";


const ITEMS_PER_PAGE = 4;

function Cats() {
  const dispatch = useDispatch();
  const { allCats, filteredCats, loading, error } = useSelector(state => state.cats);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState("");
  const [genderSelect, setGender] = useState("");

  // Fetch cats on mount
  useEffect(() => {
    if (allCats.length === 0) {
      dispatch(fetchCats()); // <-- qui chiami la thunk
    }
  }, [dispatch, allCats.length]);

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
  const pagedCats = filteredCats.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredCats.length / ITEMS_PER_PAGE);

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
              {pagedCats.length > 0 ? (
                <div className="flex flex-wrap">
                  {pagedCats.map(cat => (
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
              ) : (
                <div className="flex justify-center py-16 text-3xl">
                  <h4>No cats available with this features in this moment</h4>
                </div>
              )}

              {/* Paginazione */}
              <div className="flex justify-center mt-4 gap-4">
                <button
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="disabled:opacity-50 my-btn-prev"
                >
                  Prev
                </button>
                <span className="px-4 py-2 page-number">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(prev => prev + 1)}
                  disabled={page >= totalPages}
                  className="px-4 py-2 rounded my-btn-next"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Cats;
