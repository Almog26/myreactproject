
import { useSearch } from "../../context/SearchContext";
import './inputSearch.css'; // ייבוא קובץ ה-CSS

const InputSearch = () => {
    const { searchTerm, setSearchTerm } = useSearch();
    return (
        <div className="input-group">
            <input
                type="text"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon1"
                className="container"
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};

export default InputSearch;
