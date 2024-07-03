import { Stack, TextField } from "@mui/material";
import { useSearch } from "../context/SearchContext";
import "./Search.scss";
const Search = () => {
    const { setSearchTerm } = useSearch(); // Access the search term setter from the context

    return (
        <Stack className="search-container">
            <TextField
                className="search-input dark:bg-gray-700 dark:text-white"
                onChange={(e) => {
                    setSearchTerm(e.currentTarget.value); // Update the search term in the context
                }}
                variant="outlined"
                label="Search"
                required

                InputProps={{
                    style: {
                        color: 'white', // Ensures text color is white
                        borderColor: 'white' // You might need to adjust border via theme or global styles
                    }
                }}
                InputLabelProps={{
                    style: { color: 'white' } // Ensures label text color is white
                }}
            />
        </Stack>
    );
};

export default Search;