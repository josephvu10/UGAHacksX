import React from "react";
import styles from "./workspaceCard.module.css"; 

interface WorkspaceCardProps {
  title: string;
  authorName: string;
  genre: string;
  image: string;
  audio: string;
  prompt: string;
  visibility: string;
}

const WorkspaceCard: React.FC<WorkspaceCardProps> = ({
  title,
  authorName,
  genre,
  image,
  audio,
  prompt,
  visibility,
}) => {
  const pinataGateway = "ugahacksx.mypinata.cloud";
  
  return (
    <div className="song-post-card">
      {/* 🎵 Render Image (Show Loading if Not Ready) */}
      {image ? (
        <img src={image} alt={title}/>
      ) : (
        <p>Loading image...</p>
      )}
      <h2 className="song-title">{title}</h2>
      <p className="song-author">by {authorName}</p>
      <p className="song-genre">Genre: {genre}</p>
      {/* 🎧 Render Audio Player (Show Loading if Not Ready) */}
      {audio ? (
        <audio controls>
          <source src={audio} type="audio/wav" />

          Your browser does not support the audio element.
        </audio>
      ) : (
        <p>Loading audio...</p>
      )}


      <p className={styles.songPrompt}>Prompt: {prompt}</p>
      <p className={styles.songVsibility}>Visibility: {visibility}</p>
    </div>
  );
};

export default WorkspaceCard;
