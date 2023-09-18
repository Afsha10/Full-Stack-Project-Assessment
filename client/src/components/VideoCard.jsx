import React from "react";
import Button from "./Button";
import { baseUrl } from "../config";

const VideoCard = ({ videoData, setVideoData, singleVideo, onDelete }) => {
  /**
    On the return statement of the map, for the when the condition is true, I need to create the appropriate value that will replace the original value. When the condition is false I can return the video.
   */

  function vote(voteType) {
    fetch(`${baseUrl}/videos/${singleVideo.id}/${voteType}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const likeRating = videoData.map((video) => {
          if (video.id === singleVideo.id) {
            video.rating = data.rating;
          }
          return video;
        });
        setVideoData(likeRating);
      });
  }

  function upVoteHandler() {
    vote("upvote");
  }

  function downVoteHandler() {
    vote("downvote");
  }

  return (
    <div className="w-400 sm:w-72 mx-4 sm:mx-3 sm:my-3 grid grid-col">
      <p className="text-left text-lg font-bold lg:text-2xl">
        {singleVideo.title}
      </p>

      <div className="grid-col grid w-fit gap-2">
        <iframe
          width="100%"
          height="120"
          src={singleVideo.url.replace("watch?v=", "embed/")}
          title={singleVideo.title}
          allowFullScreen
        ></iframe>

        {/* Rating section below: */}
        <div className="flex flex-row justify-between space-x-5 text-lg lg:text-2xl sm:space-x-7">
          <button type="button" onClick={upVoteHandler}>
            Up Vote 👍
          </button>

          <p>Rating: {singleVideo.rating}</p>

          <button type="button" onClick={downVoteHandler}>
            Down Vote 👎
          </button>
        </div>

        <Button onDelete={onDelete} id={singleVideo.id} />
      </div>

      <p className="text-lg">
        Time Uploaded: {new Date(singleVideo.createdat).toLocaleString()}
      </p>
    </div>
  );
};

export default VideoCard;
