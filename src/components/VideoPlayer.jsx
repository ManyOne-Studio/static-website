import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default function VideoPlayer({ src, autoPlay, muted, loop, showControls = true }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      playerRef.current = videojs(videoRef.current, {
        autoplay: autoPlay,
        muted: muted,
        loop: loop,
        controls: showControls,
        responsive: true,
        fluid: true,
        controlBar: {
          children: [
            'playToggle',
            'progressControl',
            'fullscreenToggle',
            'pictureInPictureToggle',
            // Note: volumePanel est inclus mais le CSS le déplace en haut
            'volumePanel' 
          ]
        },
        sources: [{ src, type: 'video/mp4' }]
      });
    }
  }, [src]);

  return (
    <div className="w-full h-full relative rounded-[inherit] overflow-hidden">
      <div data-vjs-player className="w-full h-full">
        <video ref={videoRef} className="video-js vjs-fill vjs-big-play-centered" />
      </div>
    </div>
  );
}