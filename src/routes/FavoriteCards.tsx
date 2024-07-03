import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinners from "../components/Spinners";
import { useCards } from "../hooks/useCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSearch } from "../context/SearchContext";

const FavoriteCards = () => {
  const { cards, loading, error } = useCards();
  const [clickedStates, setClickedStates] = useState<{ [key: string]: boolean }>({});
  const { searchTerm } = useSearch(); // שימוש בקונטקסט של החיפוש

  useEffect(() => {
    const savedClickedStates = JSON.parse(localStorage.getItem("clickedStates") || "{}");
    setClickedStates(savedClickedStates);
  }, [cards.length]);

  const toggleClickedState = (id: string) => {
    setClickedStates((prevClickedStates) => {
      const newState = { ...prevClickedStates, [id]: !prevClickedStates[id] };
      localStorage.setItem("clickedStates", JSON.stringify(newState));
      return newState;
    });
  };

  // סינון כרטיסים לפי המונח שחיפשו ולפי הכרטיסים שנלחצו
  const filteredCards = cards.filter(card =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase()) && clickedStates[card._id]
  );

  return (
    <div className="cards-container flex flex-wrap justify-center items-center">
      {loading && <Spinners />}
      {error && <div>{error}</div>}

      {filteredCards.map((card) => (
        <div
          key={card._id}
          className="shadow-2xl p-5 w-1/3 mx-auto rounded-md my-2 text-center flex flex-col justify-center items-center bg-white dark:bg-gray-700 text-black dark:text-white"
        >
          <Link to={`/cards/${card._id}`} className="w-full h-full flex flex-col justify-center items-center">
            <h2 className="text-xl font-bold mb-2">{card.title}</h2>
            <hr className="w-full mb-2" />
            <p className="mb-2">{card.subtitle}</p>
            <img className="img-home w-full h-48 object-cover rounded-md mb-2" src={card.image.url} alt={card.image.alt} />
          </Link>
          <div className="flex justify-between w-full">
            <FontAwesomeIcon
              icon={faHeart}
              onClick={() => toggleClickedState(card._id)}
              className={`text-2xl cursor-pointer ${clickedStates[card._id] ? "text-red-500" : "text-gray-300"}`}
            />
            <Link to={`/update/${card._id}`} className="text-blue-500 hover:underline">
              UPDATE
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoriteCards;
