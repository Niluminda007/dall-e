import React, { useState } from "react";

const SearchForm = ({ searchImages, setQuery }) => {
  const [keyword, setKeyWord] = useState("");
  const searchParams = new URLSearchParams();
  const handleChange = async (e) => {
    try {
      setKeyWord(e.target.value);
      setQuery(e.target.value);
      searchParams.append("keyword", e.target.value);

      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/v1/post/search?${searchParams.toString()}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        const data = result.data;
        searchImages([...data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex gap-4">
      <input
        value={keyword}
        onChange={handleChange}
        className="w-[32rem] bg-space_white text-dark outline-none border-none px-4 py-2 text-xl"
      />
    </form>
  );
};

export default SearchForm;
