import { useEffect } from "react";
import AddRecipeView from "./components/AddRecipeView";
import Navigation from "./components/Navigation";
import PaginationView from "./components/PaginationView";
import RecipeView from "./components/RecipieView";
import ResultsView from "./components/ResultsView";
import SearchView from "./components/SearchView";
import { ICONS_PATH } from "./config";
import "./styles/main.scss";
import { useDispatch, useSelector } from "react-redux";
import { setBookmarks } from "./store";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storage = localStorage.getItem("bookmarks");
    if (storage) dispatch(setBookmarks(JSON.parse(storage)));
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <header className="header">
          <img
            src={`${process.env.PUBLIC_URL}/img/logo.png`}
            alt="Logo"
            className="header__logo"
          />
          <SearchView />
          <Navigation />
        </header>
        <div className="search-results">
          <ResultsView />
          <PaginationView />
          <p className="copyright">
            &copy; Copyright on website project, functionality, design and
            Forkify Api by {""}
            <a
              className="twitter-link"
              // target="_blank"
              href="https://twitter.com/jonasschmedtman"
            >
              Jonas Schmedtmann
            </a>
            . Transpiling from Javascript to React.js by {""}
            <a
              className="twitter-link"
              // target="_blank"
              href="https://github.com/OctiGit"
            >
              Octavio Aicardi.
            </a>
          </p>
        </div>
        <RecipeView />
      </div>
      <AddRecipeView />
    </>
  );
}

export default App;
