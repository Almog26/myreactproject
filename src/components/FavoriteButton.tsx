import axios from 'axios'; // מייבא את axios לביצוע קריאות HTTP
import { FaHeart, FaRegHeart } from "react-icons/fa"; // מייבא אייקונים של לב ממולא ולב ריק מ- react-icons
import { useAuth } from "../context/AuthContext"; // מייבא את הפונקציה useAuth מקובץ ה-AuthContext

type FavoriteButtonProps = {
    cardId: string; // מזהה הכרטיס
    isFavorite: boolean; // סטטוס אם הכרטיס במועדפים או לא
    onToggleFavorite: (cardId: string) => void; // פונקציה שמופעלת כאשר מעדכנים את המועדפים
    token: string; // טוקן האותנטיקציה
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ cardId, isFavorite, onToggleFavorite, token }) => {
    const { isLoggedIn } = useAuth(); // בדיקה אם המשתמש מחובר
    
    const toggleFavorite = () => {
        const url = `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`; // URL לשרת לעדכון הכרטיס

        // ביצוע בקשת PATCH לעדכון סטטוס המועדפים על השרת
        axios.patch(url, {}, {
            headers: { 'x-auth-token': token } // שליחת הטוקן בכותרות הבקשה
        })
            .then(() => {
                onToggleFavorite(cardId); // עדכון הסטטוס המקומי לאחר הצלחת הקריאה לשרת
            })
            .catch(err => {
                console.error('Error toggling favorite:', err); // טיפול בשגיאות אם הבקשה נכשלה
            });
    };

    if (!isLoggedIn) return null; // אם המשתמש לא מחובר, לא מציג את הכפתור

    return (
        <button
            className="add-to-favorite-button"
            onClick={(e) => {
                e.preventDefault(); // מונע את הפעולה הדיפולטיבית של הכפתור
                e.stopPropagation(); // מונע את פעולת הקליק מלהשפיע על רכיבים אחרים
                toggleFavorite(); // קורא לפונקציה לעדכון המועדפים
            }}
        >
            {isFavorite ? <FaHeart /> : <FaRegHeart />} {/* מציג לב ממולא אם הכרטיס במועדפים, אחרת לב ריק */}
        </button>
    );
};

export default FavoriteButton; // מייצא את הרכיב FavoriteButton
