import { useDispatch, useSelector } from "react-redux";
import { ICONS_PATH } from "../config";
import { setSuccessMessage, toggleAddRecipeWindow } from "../store";
import PreviewView from "./PreviewView";

function Navigation() {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks.data);
  const recipe = useSelector((state) => state.recipe.data);

  const onClickHandler = () => {
    dispatch(toggleAddRecipeWindow());
    dispatch(setSuccessMessage(""));
  };

  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <button
            onClick={onClickHandler}
            className="nav__btn nav__btn--add-recipe"
          >
            <svg className="nav__icon">
              <use href={`${ICONS_PATH}#icon-edit`}></use>
            </svg>
            <span>Add recipe</span>
          </button>
        </li>
        <li className="nav__item">
          <button className="nav__btn nav__btn--bookmarks">
            <svg className="nav__icon">
              <use href={`${ICONS_PATH}#icon-bookmark`}></use>
            </svg>
            <span>Bookmarks</span>
          </button>
          <div className="bookmarks">
            <ul className="bookmarks__list">
              {bookmarks.length > 0 ? (
                bookmarks.map(({ id, image_url, title, publisher, key }) => (
                  <PreviewView
                    id={id}
                    active={id === recipe.id}
                    image={image_url}
                    title={title}
                    publisher={publisher}
                    key={id}
                    userGeneratedKey={key}
                  />
                ))
              ) : (
                <div className="message">
                  <div>
                    <svg>
                      <use href={`${ICONS_PATH}#icon-smile`}></use>
                    </svg>
                  </div>
                  <p>No bookmarks yet. Find a nice recipe and bookmark it :)</p>
                </div>
              )}
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
