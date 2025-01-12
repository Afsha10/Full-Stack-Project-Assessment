import React, { useState } from "react";
import validUrl from "valid-url";
import { baseUrl } from "../config";

function VideoForm({ videoData, setVideoAdded }) {
  const [errorMessage, setErrorMessage] = useState("");

  function addVideoHandler(event) {
    event.preventDefault();

    // Validate the form inputs
    function validateUrl(urlObject) {
      return (
        validUrl.isUri(urlObject) &&
        (urlObject.startsWith("https://www.youtube.com/") ||
          urlObject.startsWith("https://youtu.be") ||
          urlObject.startsWith("https://m.youtube.com") ||
          urlObject.startsWith("https://youtube.com/"))
      );
    }

    const formTitle = event.target.form.title.value;
    const formUrl = event.target.form.url.value;
    // cleaning up the YouTube url with timestamp or other paths so that I get to display the thumbnails of the YouTube videos in my app. For eg: https://www.youtube.com/watch?v=Pmx2cbLGzzo&t=2908s
    const cleanedUrl = formUrl.includes("&") ? formUrl.split("&")[0] : formUrl;

    if (validateUrl(formUrl) && formTitle !== "") {
      const newData = {
        title: formTitle,
        url: cleanedUrl,
      };

      fetch(`${baseUrl}/videos`, {
        method: "post",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      })
        .then((response) => {
          setVideoAdded(true);

          // Reset the form and clear the error message
          event.target.form.reset();
          setErrorMessage("");
        })
        .catch((error) => {
          console.log("Error adding video", error);
        });
    } else if (formTitle === "" && !validateUrl(formUrl)) {
      setErrorMessage("Add a title and a valid YouTube video URL");
    } else if (formTitle === "") {
      setErrorMessage("Add a title");
    } else {
      setErrorMessage("Add a valid YouTube video URL");
    }
  }
  return (
    <div className="sm:mx-auto sm:w-4/5">
      <form className="sm:w-500 mx-5 mb-3 mt-1 flex flex-col gap-2 pb-1 text-lg sm:mx-9 sm:px-9  sm:text-2xl">
        <div className="p-1 font-bold">
          <h2>Add a YouTube video to your vault</h2>
        </div>

        <div className="grid gap-2">
          <div className="flex flex-col">
            <label htmlFor="title">Please enter a title:</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Video title"
              required
              className="h-8 w-full rounded bg-gray-200 p-2 pl-4 pr-4"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="url">Please enter a YouTube video url:</label>
            <input
              type="url"
              name="url"
              id="url"
              placeholder="YouTube video URL"
              required
              className="h-8 w-full rounded bg-gray-200 p-2 pl-4 pr-4"
            />
          </div>
        </div>

        <button
          onClick={addVideoHandler}
          type="submit"
          className="m-2 rounded bg-black px-4 py-2 font-bold text-white transition-colors duration-200 hover:bg-red-300 active:bg-red-700 sm:rounded-lg sm:px-3 sm:py-6"
        >
          Add Video
        </button>

        <p className="text-red-700">{errorMessage}</p>
      </form>
    </div>
  );
}

export default VideoForm;
