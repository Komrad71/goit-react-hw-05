import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

const errorNotify = () => toast.error("The search field cannot be empty.");

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const { search } = event.target.elements;
    const userQuery = search.value.trim();

    if (!userQuery) {
      errorNotify();
      return;
    }

    onSearch(userQuery);
    search.value = "";
  };

  return (
    <form onSubmit={handleSubmit} className={css.searchBar}>
      <input
        className={css.searchInput}
        type="text"
        name="search"
        placeholder="Search images and photos..."
        autoComplete="off"
        autoFocus
      />
      <button type="submit" className={css.searchButton}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;