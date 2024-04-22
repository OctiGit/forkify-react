import { useSelector } from "react-redux";
import { ICONS_PATH } from "../config";
import PreviewView from "./PreviewView";
import useResults from "../hooks/useResults";

function ResultsView() {
  const recipe = useSelector((state) => state.recipe.data);
  const { searchQuery, searchResults, searchResultsPage, error, isLoading } =
    useResults();

  let content;
  if (isLoading) {
    content = (
      <div className="spinner">
        <svg>
          <use href={`${ICONS_PATH}#icon-loader`}></use>
        </svg>
      </div>
    );
  } else if (
    error ||
    (searchQuery && Array.isArray(searchResults) && searchResults.length === 0)
  ) {
    content = (
      <div className="error">
        <div>
          <svg>
            <use href={`${ICONS_PATH}#icon-alert-triangle`}></use>
          </svg>
        </div>
        <p>{"No recipes found for your query! Please try again ;)"}</p>
      </div>
    );
  } else if (searchResultsPage.length) {
    content = searchResultsPage.map(({ id, image, title, publisher, key }) => (
      <PreviewView
        id={id}
        active={id === recipe.id}
        image={image}
        title={title}
        publisher={publisher}
        key={id}
        userGeneratedKey={key}
      />
    ));
  }

  return <ul className="results">{content}</ul>;
}

export default ResultsView;
