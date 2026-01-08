import "../assets/styles/Filter.css";

const AnimalFilter = ({ setSize, setGender }) => {
  return (
    <section className="my-6">
      <h2 className="text-2xl font-bold flex justify-start">Filters:</h2>
      <div className="container">
        <div className=" select">
          <label
            htmlFor="size"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Size
          </label>
          <select
            id="size"
            className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
            onChange={(event) => {
              setSize(event.target.value);
            }}
          >
            <option value="">All</option>
            <option value="s">Small</option>
            <option value="m">Medium</option>
            <option value="l">Large</option>
          </select>
        </div>
        <div className="mx-4 select">
          <label
            htmlFor="gender"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Gender
          </label>
          <select
            id="gender"
            className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
            onChange={(event) => {
              setGender(event.target.value);
            }}
          >
            <option value="">All</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>
      </div>
    </section>
  );
};
export default AnimalFilter;
