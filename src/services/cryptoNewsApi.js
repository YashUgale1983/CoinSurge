import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Key": process.env.REACT_APP_NEWS_RAPIDAPI_KEY,
  "X-RapidAPI-Host": process.env.REACT_APP_NEWS_RAPIDAPI_HOST,
};

const baseUrl = process.env.REACT_APP_NEWS_URL;

export const cryptoNewsApi = createApi({
  reducerPath: "cryptonews",
  baseQuery: fetchBaseQuery({ baseUrl, headers: cryptoApiHeaders }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => {
        const defaultParams = {
          q: newsCategory || "Crypto",
          count: count || "100",
          freshness: "Day",
          textFormat: "Raw",
          safeSearch: "Off",
        };
        const paramsString = new URLSearchParams(defaultParams).toString();

        return `news/search?${paramsString}`;
      },
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
