import React from 'react'

import YoutubeView from "react-youtube"
import styles from "../styles/home.module.css"

function getYouTubeId(url) {
    let videoId = '';
    const match = url?.match(/[?&]v=([^&]+)/);
    if (match) {
      videoId = match[1];
    } else {
      const shortUrlMatch = url?.match(/youtu.be\/([^?]+)/);
      if (shortUrlMatch) {
        videoId = shortUrlMatch[1];
      }
    }
    return videoId;
  }

const FeaturedVideo = ({ blog }) => {
    return (
        <div className={styles.home_featured_video}>
            <div className={styles.home_featured_video_content}>
                <h2>{blog?.title?.substring(0, 23)}</h2>
                <div dangerouslySetInnerHTML={{ __html: blog?.body }} ></div>
            </div>
            <div className={styles.home_featured_video_video}>
                <YoutubeView videoId={getYouTubeId(blog?.youtubeUrl)} opts={{height: "200", width: "320", playerVars: {autoplay: 1}}} />
            </div>
        </div>
    )
}

export default FeaturedVideo