import { useDispatch, useSelector } from "react-redux";
import { setRecipeId, setSearchResults, useFetchResultsQuery } from "../store";
import { useEffect } from "react";
import { ICONS_PATH } from "../config";

function ResultsView() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search.query);
  const searchResults = useSelector((state) => state.search.results);
  const page = useSelector((state) => state.search.page);
  const resultsPerPage = useSelector((state) => state.search.resultsPerPage);
  const { data, error, isFetching } = useFetchResultsQuery(searchQuery);

  const pageStart = (page - 1) * resultsPerPage; // 0
  const pageEnd = page * resultsPerPage; // 9
  const searchResultsPage = searchResults.slice(pageStart, pageEnd);

  useEffect(() => {
    if (data) {
      dispatch(setSearchResults(data));
    }
  }, [data, dispatch]);

  // const id = window.location.hash.slice(1);
  const id = null;
  const onClickHandler = (id) => {
    dispatch(setRecipeId(id));
  };

  let content;

  if (isFetching) {
    content = (
      <div className="spinner">
        <svg>
          <use href={`${ICONS_PATH}#icon-loader`}></use>
        </svg>
      </div>
    );
  } else if (error || (Array.isArray(data) && data.length === 0)) {
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
    content = searchResultsPage.map((res) => (
      <li key={res.id} className="preview">
        <a
          className={`preview__link ${
            res.id === id ? "preview__link--active" : ""
          }`}
          href={`#${res.id}`}
          onClick={() => onClickHandler(res.id)}
        >
          <figure className="preview__fig">
            <img src={res.image} alt={res.title} />
          </figure>
          <div className="preview__data">
            <h4 className="preview__title">{res.title}</h4>
            <p className="preview__publisher">{res.publisher}</p>
            <div
              className={`preview__user-generated ${res.key ? "" : "hidden"}`}
            >
              <svg>
                <use href={`${ICONS_PATH}#icon-user`}></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    ));
  }

  return <ul className="results">{content}</ul>;
}

export default ResultsView;
