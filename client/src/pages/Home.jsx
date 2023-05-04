import React, { useEffect, useState } from "react";
import SearchForm from "../components/SearchForm";
import ImageCard from "../components/ImageCard";
import Loader from "../components/Loader";

const Home = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/post`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          setData([...result.data.reverse()]);
        }
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className="flex flex-col gap-4 w-full mt-9 items-center justify-center px-64">
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl text-space_white flex justify-center">
          The Community Showcase
        </h2>
        <p className="text-lg text-light_green font-medium">
          Explore amazing and stunning collection of arts inspired by the ideas
          of community members and generated through DALL-E AI
        </p>
      </div>
      <SearchForm searchImages={setData} setQuery={setQuery} />
      {query !== "" && data.length !== 0 && (
        <p className="text-space_white text-md">Showing Resutls for {query}</p>
      )}
      {loading ? (
        <Loader />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:gird-cols-2 grid-cols-1 gap-3 ">
          {data.length !== 0 ? (
            data.map((obj, i) => <ImageCard key={i} obj={obj} />)
          ) : (
            <p className="text-space_white text-md">No results Found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
