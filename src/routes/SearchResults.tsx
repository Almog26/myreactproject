import { Link, useLocation } from "react-router-dom";
import Spinners from "../components/Spinners";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import auth from "../services/auth";

interface Card {
    _id: string;
    title: string;
    subtitle: string;
    image: {
        url: string;
        alt: string;
    };
}

const SearchResults = () => {
    const { theme } = useTheme();
    const { token } = useAuth();
    const location = useLocation();
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [clickedStates, setClickedStates] = useState<boolean[]>([]);

    const query = new URLSearchParams(location.search).get("query") || "";

    useEffect(() => {
        const fetchCards = async () => {
            setLoading(true);
            try {
                const response = await auth.searchCards(query, token);
                setCards(response);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, [query, token]);

    useEffect(() => {
        const savedClickedStates = JSON.parse(localStorage.getItem("clickedStates") || "[]");
        if (savedClickedStates && savedClickedStates.length === cards.length) {
            setClickedStates(savedClickedStates);
        } else {
            setClickedStates(Array(cards.length).fill(false));
        }
    }, [cards.length]);

    const toggleClickedState = (index: number) => {
        setClickedStates((prevClickedStates) => {
            const newState = [...prevClickedStates];
            newState[index] = !newState[index];
            localStorage.setItem("clickedStates", JSON.stringify(newState));
            return newState;
        });
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this card?")) {
            try {
                await auth.deleteCard(id, token);
                setCards(cards.filter((card) => card._id !== id));
            } catch (error) {
                console.error("Failed to delete card:", error);
            }
        }
    };

    return (
        <div className={`cards-container flex flex-col items-center p-5 ${theme === "light" ? "bg-gray-100" : "bg-gray-800"}`}>
            {loading && <Spinners />}
            {error && <div>{error}</div>}

            <div className="flex flex-wrap justify-center items-center">
                {cards.map((card, index) => (
                    <div
                        key={card._id}
                        className="shadow-2xl p-5 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mx-2 rounded-md my-2 text-center flex flex-col justify-center items-center bg-white dark:bg-gray-700 text-black dark:text-white"
                    >
                        <h2 className="text-xl font-bold mb-2">{card.title}</h2>
                        <hr className="w-full mb-2" />
                        <p className="mb-2">{card.subtitle}</p>
                        <img className="img-home w-full h-48 object-cover mb-2 rounded-md" src={card.image.url} alt={card.image.alt} />
                        <hr className="w-full mb-2" />
                        <div className="flex justify-between w-full">
                            <FontAwesomeIcon
                                icon={faHeart}
                                onClick={() => toggleClickedState(index)}
                                className={`text-2xl cursor-pointer ${clickedStates[index] ? "text-red-500" : "text-gray-300"}`}
                            />
                            <Link to={`/update/${card._id}`} className="text-blue-500 hover:underline">
                                <FontAwesomeIcon icon={faEdit} className="text-2xl" />
                            </Link>
                            <FontAwesomeIcon
                                icon={faTrash}
                                onClick={() => handleDelete(card._id)}
                                className="text-2xl cursor-pointer text-red-500 hover:text-red-700"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
