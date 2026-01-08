import { useState } from "react";
import '../assets/styles/Home.css';
import dogImage from '../assets/images/dog.png';
import catImage from '../assets/images/cat.png';

function Donation() {
  const loggedUser = localStorage.getItem("loggedUser")
    ? JSON.parse(localStorage.getItem("loggedUser"))
    : null;

  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [code, setCode] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({});

  const handleDonation = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Inserisci il tuo nome e cognome";
    if (!cardNumber.trim()) newErrors.cardNumber = "Inserisci il numero della carta";
    if (!code.trim()) newErrors.code = "Inserisci il codice CVV";
    if (!amount.trim()) newErrors.amount = "Inserisci l'importo";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert("Donazione avvenuta con successo!");

    setName("");
    setCardNumber("");
    setCode("");
    setAmount("");
    setErrors({});
  };

  return (
    <section className="container-home">
      <div className={`${loggedUser ? "block" : "hidden"} w-75`}>
        <form onSubmit={handleDonation} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name and Surname</label>
            <input
              id="name"
              type="text"
              placeholder="Name and surname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-bold mb-2">Card Number</label>
            <input
              id="cardNumber"
              type="text"
              maxLength={19}
              placeholder="XXXX - XXXX - XXXX - XXXX"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="code" className="block text-gray-700 text-sm font-bold mb-2">Code</label>
            <input
              id="code"
              type="text"
              maxLength={3}
              placeholder="XXX"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.code && <p className="text-red-500 text-sm">{errors.code}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="00.00$"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Donate
            </button>
          </div>
        </form>
      </div>

      <div className="dog-image">
        <img src={dogImage} alt="dog" />
      </div>
      <div className="cat-image">
        <img src={catImage} alt="cat" />
      </div>
    </section>
  );
}

export default Donation;
