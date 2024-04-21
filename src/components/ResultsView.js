import { useDispatch, useSelector } from "react-redux";
import { setRecipeId, setSearchResults, useFetchResultsQuery } from "../store";
import { useEffect, useState } from "react";
import { API_URL, ICONS_PATH, KEY } from "../config";
import axios from "axios";
import PreviewView from "./PreviewView";

function ResultsView() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search.query);
  const searchResults = useSelector((state) => state.search.results);
  const page = useSelector((state) => state.search.page);
  const resultsPerPage = useSelector((state) => state.search.resultsPerPage);
  const { resultId } = useSelector((state) => state.recipe);
  // const { data, error, isFetching } = useFetchResultsQuery(searchQuery);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const pageStart = (page - 1) * resultsPerPage; // 0
  const pageEnd = page * resultsPerPage; // 9
  const searchResultsPage = searchResults.slice(pageStart, pageEnd);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchQuery === "") {
          // return { data: null };
          return;
        } else {
          setIsLoading(true);
          const { data } = await axios.get(
            `${API_URL}?search=${searchQuery}&key=${KEY}`
          );
          // return { data: data.data.recipes };
          const recipes = data.data.recipes.map((rec) => {
            return {
              id: rec.id,
              title: rec.title,
              publisher: rec.publisher,
              image: rec.image_url,
              ...(rec.key && { key: rec.key }),
            };
          });
          dispatch(setSearchResults(recipes));
        }
      } catch (error) {
        // return { error };
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchQuery, dispatch]);

  // useEffect(() => {
  //   if (data) {
  //     dispatch(setSearchResults(data));
  //   }
  // }, [data, dispatch]);

  // const id = window.location.hash.slice(1);
  const id = null;

  let content;

  // if (isFetching) {
  if (isLoading) {
    content = (
      <div className="spinner">
        <svg>
          <use href={`${ICONS_PATH}#icon-loader`}></use>
        </svg>
      </div>
    );
    // } else if (error || (Array.isArray(data) && data.length === 0)) {
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
        active={id === resultId}
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
