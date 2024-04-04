import Navigation from "./components/Navigation";
import PaginationView from "./components/PaginationView";
import RecipeView from "./components/RecipieView";
import ResultsView from "./components/ResultsView";
import SearchView from "./components/SearchView";
import "./styles/main.scss";

function App() {
  return (
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
          &copy; Copyright on website project, functionality, design and Forkify
          Api by {""}
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
      {/* <div className="recipe">
        <div className="message">
          <div>
            <svg>
              <use href="src/img/icons.svg#icon-smile"></use>
            </svg>
          </div>
          <p>Start by searching for a recipe or an ingredient. Have fun!</p>
        </div>
      </div> */}
      <RecipeView />
    </div>
  );
}

export default App;
