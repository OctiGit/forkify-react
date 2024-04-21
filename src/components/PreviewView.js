import { useDispatch, useSelector } from "react-redux";
import { ICONS_PATH } from "../config";
import { setRecipe, setRecipeId } from "../store";

function PreviewView({
  id,
  active,
  image,
  title,
  publisher,
  userGeneratedKey,
}) {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks.data);

  const onClickHandler = (id) => {
    const bookmarkedRecipe = bookmarks.find((bookmark) => bookmark.id === id);
    if (bookmarkedRecipe) dispatch(setRecipe(bookmarkedRecipe));
    else dispatch(setRecipeId(id));
  };
  return (
    <li key={id} className="preview">
      {/* <li className="preview"> */}
      <a
        className={`preview__link ${active ? "preview__link--active" : ""}`}
        href={`#${id}`}
        onClick={() => onClickHandler(id)}
      >
        <figure className="preview__fig">
          <img src={image} alt={title} />
        </figure>
        <div className="preview__data">
          <h4 className="preview__title">{title}</h4>
          <p className="preview__publisher">{publisher}</p>
          <div
            className={`preview__user-generated ${
              userGeneratedKey ? "" : "hidden"
            }`}
          >
            <svg>
              <use href={`${ICONS_PATH}#icon-user`}></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
  );
}

export default PreviewView;
