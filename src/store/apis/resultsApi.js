import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { API_URL, KEY } from "../../config";

const resultsApi = createApi({
  reducerPath: "resultsApi",
  baseQuery: fakeBaseQuery(),
  endpoints(builder) {
    return {
      fetchResults: builder.query({
        async queryFn(query) {
          try {
            if (query === "") {
              return { data: null };
            } else {
              const { data } = await axios.get(
                `${API_URL}?search=${query}&key=${KEY}`
              );
              return { data: data.data.recipes };
            }
          } catch (error) {
            return { error };
          }
        },
      }),
    };
  },
});

export const { useFetchResultsQuery } = resultsApi;
export { resultsApi };
