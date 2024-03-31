import {
  createApi,
  fakeBaseQuery,
  // fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { API_URL, KEY } from "../../config";

const recipeApi = createApi({
  reducerPath: "recipeApi",
  baseQuery: fakeBaseQuery(),
  endpoints(builder) {
    return {
      fetchRecipe: builder.query({
        async queryFn(id) {
          try {
            const { data } = await axios.get(`${API_URL}${id}?key=${KEY}`);
            const recipe = data.data.recipe;
            const newRecipe = {
              id: recipe.id,
              title: recipe.title,
              publisher: recipe.publisher,
              sourceUrl: recipe.source_url,
              image: recipe.image_url,
              ingredients: recipe.ingredients,
              servings: recipe.servings,
              cookingTime: recipe.cooking_time,
              ...(recipe.key && { key: recipe.key }),
            };
            return { data: newRecipe };
          } catch (error) {
            return { error };
          }
        },
      }),
    };
  },
});

export const { useFetchRecipeQuery } = recipeApi;
export { recipeApi };
