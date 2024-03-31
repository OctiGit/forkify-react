import RecipeView from "./components/RecipieView";
import "./styles/main.scss";

function App() {
  return (
    <div className="container">
      <header className="header">
        <img src="src/img/logo.png" alt="Logo" className="header__logo" />
        <form className="search">
          <input
            type="text"
            className="search__field"
            placeholder="Search over 1,000,000 recipes..."
          />
          <button className="btn search__btn">
            <svg className="search__icon">
              <use href="src/img/icons.svg#icon-search"></use>
            </svg>
            <span>Search</span>
          </button>
        </form>

        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <button className="nav__btn nav__btn--add-recipe">
                <svg className="nav__icon">
                  <use href="src/img/icons.svg#icon-edit"></use>
                </svg>
                <span>Add recipe</span>
              </button>
            </li>
            <li className="nav__item">
              <button className="nav__btn nav__btn--bookmarks">
                <svg className="nav__icon">
                  <use href="src/img/icons.svg#icon-bookmark"></use>
                </svg>
                <span>Bookmarks</span>
              </button>
              <div className="bookmarks">
                <ul className="bookmarks__list">
                  <div className="message">
                    <div>
                      <svg>
                        <use href="src/img/icons.svg#icon-smile"></use>
                      </svg>
                    </div>
                    <p>
                      No bookmarks yet. Find a nice recipe and bookmark it :)
                    </p>
                  </div>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </header>
      <div className="search-results">
        <ul className="results"></ul>
        <div className="pagination"></div>
        <p className="copyright">
          &copy; Copyright by
          <a
            className="twitter-link"
            // target="_blank"
            href="https://twitter.com/jonasschmedtman"
          >
            Jonas Schmedtmann
          </a>
          . Use for learning or your portfolio. Don't use to teach. Don't claim
          as your own.
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
