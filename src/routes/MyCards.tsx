
import { useEffect, useState, useContext } from 'react'; // מייבא הוקים ורכיבים מ-React
import axios from 'axios'; // מייבא את axios לביצוע קריאות API
import { Link } from 'react-router-dom'; // מייבא את Link מ-react-router-dom
import Spinners from '../components/Spinners'; // מייבא רכיב ספינר
import FavoriteButton from '../components/FavoriteButton'; // מייבא רכיב כפתור מועדפים
import { AuthContext } from '../context/AuthContext'; // מייבא את הקונטקסט של האותנטיקציה
import { useSearch } from '../context/SearchContext'; // מייבא את הקונטקסט של החיפוש
import Swal from 'sweetalert2'; // מייבא את SweetAlert2 להצגת התראות
import { FaEdit, FaTrash } from 'react-icons/fa'; // מייבא אייקונים לעריכה ומחיקה
import { Card } from '../@types/cardsData'; // מייבא את סוג הנתונים של הכרטיסים

const MyCards = () => { // הגדרת רכיב פונקציונלי MyCards
    const [cards, setCards] = useState<Card[]>([]); // סטייט לכרטיסים
    const [loading, setLoading] = useState<boolean>(true); // סטייט לטעינה
    const [error, setError] = useState<string | null>(null); // סטייט לשגיאות
    const authContext = useContext(AuthContext); // שימוש בקונטקסט של האותנטיקציה
    const token = authContext ? authContext.token : null; // קבלת הטוקן מהקונטקסט
    const [favorites, setFavorites] = useState<string[]>(
        () => JSON.parse(localStorage.getItem('favorites') || '[]')
    ); // סטייט למועדפים
    const { searchTerm } = useSearch(); // שימוש בקונטקסט של החיפוש

    useEffect(() => { // אפקט לריצת קוד בהתחלת הרכיב
        if (!token) {
            setLoading(false);
            return; // יציאה מוקדמת אם אין טוקן
        }

        setLoading(true); // התחלת טעינה
        axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards', {
            headers: { 'x-auth-token': token }
        }) // קריאת API לקבלת הכרטיסים שלי עם טוקן
            .then(response => {
                setCards(response.data); // שמירת הכרטיסים בסטייט
                setLoading(false); // סיום טעינה
            })
            .catch(err => {
                setError(err.toString()); // שמירת השגיאה בסטייט
                setLoading(false); // סיום טעינה
            });
    }, [token]); // הרצה מחדש של האפקט כאשר הטוקן משתנה

    const deleteCard = (cardId: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
                    headers: { 'x-auth-token': token }
                })
                .then(() => {
                    setCards(cards.filter(card => card._id !== cardId)); // עדכון סטייט לאחר מחיקה
                    Swal.fire(
                        'Deleted!',
                        'Your card has been deleted.',
                        'success'
                    );
                })
                .catch(err => {
                    console.error("Error deleting card:", err);
                    Swal.fire(
                        'Failed!',
                        'There was a problem deleting your card.',
                        'error'
                    );
                });
            }
        });
    };

    const addToFavorites = (cardId: string) => {
        const newFavorites = favorites.includes(cardId)
            ? favorites.filter(id => id !== cardId) // הסרה מהמועדפים
            : [...favorites, cardId]; // הוספה למועדפים
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    const filteredCards = cards.filter(c => 
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!token) return <p>Please log in to view your cards.</p>;
    if (loading) return <Spinners />;
    if (error) return <div>Error loading your cards: {error}</div>;

    return (
        <div className="min-h-screen flex flex-wrap justify-center items-start p-4 bg-gray-100 dark:bg-gray-800">
            {filteredCards.map((card) => (
                <div key={card._id} className="bg-white dark:bg-gray-700 dark:text-white rounded-lg shadow-lg p-4 m-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                    <div className="flex justify-between mb-2">
                        <Link to={`/update/${card._id}`} className="text-blue-500 hover:text-blue-700">
                            <FaEdit />
                        </Link>
                        <FaTrash
                            onClick={() => deleteCard(card._id)}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                        />
                    </div>
                    <Link to={`/cards/${card._id}`} className="block">
                        <FavoriteButton
                            cardId={card._id}
                            isFavorite={favorites.includes(card._id)}
                            onToggleFavorite={addToFavorites}
                            token={token}
                        />
                        <h2 className="text-xl font-bold mb-2">{card.title}</h2>
                        <hr className="mb-2" />
                        <p className="mb-2">{card.subtitle}</p>
                        <img src={card.image.url} alt={card.image.alt} className="w-full h-48 object-cover rounded-md" />
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default MyCards;
