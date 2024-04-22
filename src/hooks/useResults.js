import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage, setSearchResults } from "../store";
import { API_URL, KEY } from "../config";
import axios from "axios";

const useResults = () => {
  const dispatch = useDispatch();
  const {
    query: searchQuery,
    results: searchResults,
    page,
    resultsPerPage,
  } = useSelector((state) => state.search);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const pageStart = (page - 1) * resultsPerPage; // 0
  const pageEnd = page * resultsPerPage; // 9
  const searchResultsPage = searchResults.slice(pageStart, pageEnd);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchQuery === "") {
          return;
        } else {
          setIsLoading(true);
          const { data } = await axios.get(
            `${API_URL}?search=${searchQuery}&key=${KEY}`
          );
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
          dispatch(setPage(1));
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchQuery, dispatch]);

  return { searchQuery, searchResults, searchResultsPage, error, isLoading };
};

export default useResults;
