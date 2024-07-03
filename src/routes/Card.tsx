
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardType, ErrorType } from "../@types/types";
import { getCardById } from "../services/cards";

const Card = () => {
  // dynamic route: /cards/:id
  const { id } = useParams();
  const [card, setCard] = useState<CardType>();
  const [error, setError] = useState<ErrorType>();

  useEffect(() => {
    getCardById(id ?? "")
      .then((res) => {
        setCard(res.data);
      })
      .catch((e) => {
        const status = e.response.status;
        const message = e.message;
        const details = e.response.data;

        setError({ status, message, details });
      });
  }, [id]); // הוספת id כתלות כדי להימנע מאזהרות

  return error ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-red-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4">{error.message}</h2>
      <p className="text-lg">{error.details}</p>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-4xl font-extrabold mb-4">{card?.title}</h2>
      <p className="text-2xl mb-4">{card?.subtitle}</p>
      {card?.image && (
        <img
          className="w-full max-w-lg h-auto object-cover rounded-md shadow-md"
          src={card.image.url}
          alt={card.image.alt}
        />
      )}
    </div>
  );
};

export default Card;
