import { useDispatch, useSelector } from "react-redux";
import { ICONS_PATH } from "../config";
import { setPage } from "../store";

function PaginationView() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.search.page);
  const { results, resultsPerPage } = useSelector((state) => state.search);

  const curPage = page;
  const numPages = Math.ceil(results.length / resultsPerPage);

  const onClickHandler = (newPage) => {
    dispatch(setPage(newPage));
  };

  let content = "";
  if (curPage === 1 && numPages > 1) {
    content = (
      <button
        onClick={() => onClickHandler(curPage + 1)}
        className="btn--inline pagination__btn--next"
      >
        <span>Page {curPage + 1}</span>
        <svg className="search__icon">
          <use href={`${ICONS_PATH}#icon-arrow-right`}></use>
        </svg>
      </button>
    );
  } else if (curPage === numPages && numPages > 1) {
    content = (
      <button
        onClick={() => onClickHandler(curPage - 1)}
        className="btn--inline pagination__btn--prev"
      >
        <svg className="search__icon">
          <use href={`${ICONS_PATH}#icon-arrow-left`}></use>
        </svg>
        <span>Page {curPage - 1}</span>
      </button>
    );
  } else if (curPage < numPages) {
    content = (
      <>
        <button
          onClick={() => onClickHandler(curPage - 1)}
          className="btn--inline pagination__btn--prev"
        >
          <svg className="search__icon">
            <use href={`${ICONS_PATH}#icon-arrow-left`}></use>
          </svg>
          <span>Page {curPage - 1}</span>
        </button>
        <button
          onClick={() => onClickHandler(curPage + 1)}
          className="btn--inline pagination__btn--next"
        >
          <span>Page {curPage + 1}</span>
          <svg className="search__icon">
            <use href={`${ICONS_PATH}#icon-arrow-right`}></use>
          </svg>
        </button>
      </>
    );
  }

  return <div className="pagination">{content}</div>;
}

export default PaginationView;
