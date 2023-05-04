import React, { useState } from "react";
import { surpriseMePrompts } from "../utils/constant";
import { preview } from "../assets";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const ImageForm = () => {
  const [form, setForm] = useState({ name: "", prompt: "", photo: "" });
  const [generatingImg, setGeneratingImg] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { value, id } = e.target;
    setForm((prevForm) => {
      return {
        ...prevForm,
        [id]: value,
      };
    });
  };
  const handleSuprise = () => {
    const rnd = Math.floor(Math.random() * surpriseMePrompts.length);
    const rndPrompt = surpriseMePrompts[rnd];
    setForm((prevForm) => {
      return {
        ...prevForm,
        prompt: rndPrompt,
      };
    });
  };
  const handleGenerate = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/dalle`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: form.prompt,
            }),
          }
        );

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please provide proper prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt !== "" && form.photo) {
      setGeneratingImg(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/post`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );

        await response.json();
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    }
  };
  return (
    <form className="flex flex-col gap-8 my-8" onSubmit={handleSubmit}>
      <label htmlFor="name">Your Name</label>
      <input
        id="name"
        type="text"
        value={form.name}
        onChange={handleChange}
        className="w-[32rem] bg-space_white text-dark outline-none border-none px-4 py-2"
      />
      <div className="flex gap-8">
        <label htmlFor="prompt">Prompt</label>
        <button
          type="button"
          className="rounded-md  px-3 py-1 bg-grey text-space_white  font-medium transition ease-linear hover:scale-[1.1] hover:text-black hover:bg-light_green"
          onClick={handleSuprise}
        >
          suprise me
        </button>
      </div>

      <input
        className="w-[32rem] bg-space_white text-dark outline-none border-none px-4 py-2"
        id="prompt"
        type="text"
        value={form.prompt}
        onChange={handleChange}
      />
      <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
        {form.photo ? (
          <img
            src={form.photo}
            alt={form.prompt}
            className="w-full h-full object-contain"
          />
        ) : (
          <img
            src={preview}
            alt="preview"
            className="w-9/12 h-9/12 object-contain opacity-40"
          />
        )}

        {generatingImg && (
          <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
            <Loader />
          </div>
        )}
      </div>
      <button
        className="text-dark text-xl px-3 py-2 rounded-md bg-light_green font-medium transition ease-linear hover:scale-[1.1] hover:bg-grey hover:text-space_white"
        type="button"
        onClick={handleGenerate}
      >
        Generate
      </button>
      <div className="flex flex-col gap-6">
        <p className="text-white text-lg">
          You can share the master piece you created with the community and
          stand tall among others with your creation
        </p>
        <button
          type="submit"
          className="text-dark bg-white px-4 py-2 rounded-md font-medium text-xl transition ease-linear  hover:text-white hover:bg-grey hover:scale-[1.1]"
        >
          Share with the community
        </button>
      </div>
    </form>
  );
};

export default ImageForm;
