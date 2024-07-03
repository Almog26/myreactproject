import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinners from "../components/Spinners";
import { useCards } from "../hooks/useCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext"; // שימוש בקונטקסט של החיפוש
import auth from "../services/auth";

const Cards = () => {
  const { theme } = useTheme();
  const { cards, loading, error } = useCards();
  const [clickedStates, setClickedStates] = useState<{ [key: string]: boolean }>({});
  const { searchTerm } = useSearch(); // שימוש בקונטקסט של החיפוש
  const { token } = useAuth();

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

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        await auth.deleteCard(id, token);
        window.location.reload();
      } catch (error) {
        console.error("Failed to delete card:", error);
      }
    }
  };

  // סינון כרטיסים לפי המונח שחיפשו
  const filteredCards = cards.filter(card =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`cards-container flex flex-wrap justify-center items-center p-5 ${theme === "light" ? "bg-gray-100" : "bg-gray-800"}`}>
      {loading && <Spinners />}
      {error && <div>{error}</div>}

      {filteredCards.map((card) => (
        <div
          key={card._id}
          className={`shadow-2xl p-5 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mx-2 rounded-md my-2 text-center flex flex-col justify-center items-center bg-white dark:bg-gray-700 text-black dark:text-white ${
            clickedStates[card._id] ? "transform scale-105 transition-transform duration-300" : ""
          }`}
        >
          <Link to={`/cards/${card._id}`} className="w-full h-full flex flex-col justify-center items-center" onClick={() => toggleClickedState(card._id)}>
            <h2 className="text-xl font-bold mb-2">{card.title}</h2>
            <hr className="w-full mb-2" />
            <p className="mb-2">{card.subtitle}</p>
            <img className="img-home w-full h-48 object-cover mb-2 rounded-md" src={card.image.url} alt={card.image.alt} />
            <hr className="w-full mb-2" />
          </Link>
          <div className="flex justify-between w-full">
            <FontAwesomeIcon
              icon={faHeart}
              onClick={(e) => {
                e.stopPropagation();
                toggleClickedState(card._id);
              }}
              className={`text-2xl cursor-pointer ${clickedStates[card._id] ? "text-red-500" : "text-gray-300"}`}
            />
            <Link to={`/update/${card._id}`} className="text-blue-500 hover:underline">
              <FontAwesomeIcon icon={faEdit} className="text-2xl" />
            </Link>
            <FontAwesomeIcon
              icon={faTrash}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(card._id);
              }}
              className="text-2xl cursor-pointer text-red-500 hover:text-red-700"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
