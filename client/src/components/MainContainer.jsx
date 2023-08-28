import React, { useState } from "react";
import CardsContainer from "./CardsContainer";
import VideoForm from "./VideoForm";
import fullData from "../exampleresponse.json";

function MainContainer() {
    const [videoData, setVideoData] = useState(fullData);
    
    console.log("Video Data from MainContainer---> ", videoData);
    return (
        <div>
            <VideoForm videoData={videoData} setVideoData={setVideoData}/>
            <CardsContainer videoData={videoData} setVideoData={setVideoData}/>
        </div>
    )
}

export default MainContainer;