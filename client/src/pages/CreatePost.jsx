import React from "react";
import ImageForm from "../components/ImageForm";

const CreatePost = () => {
  return (
    <div className="flex flex-col gap-8 justify-center items-center mt-20">
      <div className="flex flex-col gap-8 ">
        <h1 className="text-4xl text-space_white">Create Post</h1>
        <p className="text-lg text-light_green">
          Create an amazing image using your imagination and generate it with
          DALL-E AI and share across the community
        </p>
      </div>
      <ImageForm />
    </div>
  );
};

export default CreatePost;
