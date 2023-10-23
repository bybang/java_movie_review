import React from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import "./Trailer.css";

const Trailer = () => {
  let params = useParams();
  const key = params.yTrailerId;

  return (
    <div className="react-player-container">
      {key != null ? (
        <ReactPlayer
          controls="true"
          playing={true}
          width="100%"
          height="100%"
          url={`http://www.youtube.com/watch?v=${key}`}
        />
      ) : null}
    </div>
  );
};

export default Trailer;
