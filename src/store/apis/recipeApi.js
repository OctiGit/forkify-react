import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
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
            if (!id) {
              return { data: null };
            } else {
              const { data } = await axios.get(`${API_URL}${id}?key=${KEY}`);
              const recipe = data.data.recipe;
              const newRecipe = {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                source_url: recipe.source_url,
                image_url: recipe.image_url,
                ingredients: recipe.ingredients,
                servings: recipe.servings,
                cookingTime: recipe.cooking_time,
                // bookmarked: recipe.bookmarked ? true : false,
                ...(recipe.key && { key: recipe.key }),
              };
              return { data: newRecipe };
            }
          } catch (error) {
            return { error };
          }
        },
      }),
      addRecipe: builder.mutation({
        async queryFn(recipe) {
          try {
            const { data } = await axios.post(`${API_URL}?key=${KEY}`, recipe);
            return { data: data.data.recipe };
          } catch (error) {
            return { error };
          }
        },
      }),
    };
  },
});

export const { useFetchRecipeQuery, useAddRecipeMutation } = recipeApi;
export { recipeApi };
