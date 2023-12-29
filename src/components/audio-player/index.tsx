import React, { useRef, useState } from 'react';
import './style.scss';
import { PauseIcon, PlaneIcon } from 'lucide-react';

const AudioPlayer: React.FC<{ src: string }> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const updateProgressBar = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setCurrentTime(current);
      setDuration(total);
    }
  };

  const convertSecondsToTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const handleProgressBarClick = (event: any) => {
    if (audioRef.current) {
      const progressBar = event.target;
      const clickPosition =
        event.clientX - progressBar.getBoundingClientRect().right;
      const percentage = Math.abs(clickPosition) / progressBar.offsetWidth;
      const newTime = percentage * duration;
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <div className={'w-100'}>
      <div className="audio-player d-flex flex-row flex-nowrap align-items-center gap-2 w-100">
        <div className="controls d-flex flex-row flex-nowrap gap-1">
          <div
            className={`image-container ${isPlaying ? 'flipped' : ''}`}
            onClick={() => {
              if (audioRef.current) {
                if (isPlaying) {
                  audioRef.current.pause();
                } else {
                  audioRef.current.play();
                }
                setIsPlaying(!isPlaying);
              }
            }}
          >
            <div className="image-inner">
              {isPlaying ? <PauseIcon /> : <PlaneIcon />}
            </div>
          </div>
        </div>
        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={updateProgressBar}
        ></audio>
        <div className="progress-bar g-cursor-pointer w-100">
          <div
            className="progress "
            style={{
              width: `${(currentTime / duration) * 100}%`,
              backgroundColor: '#500184',
            }}
          ></div>
        </div>
        <div
          className="progress-bar-hide g-cursor-pointer"
          onClick={handleProgressBarClick}
        ></div>
        <small className={'text3'}>{convertSecondsToTime(currentTime)}/</small>
        <small className={'text3'}>
          {duration ? convertSecondsToTime(duration) : '00:00'}
        </small>
      </div>
    </div>
  );
};

export default AudioPlayer;
