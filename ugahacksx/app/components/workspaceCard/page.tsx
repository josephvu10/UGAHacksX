import React from "react";
import styles from "./workspaceCard.module.css"; 

interface WorkspaceCardProps {
  title: string;
  authorName: string;
  genre: string;
  imageCID: string;
  audioCID: string;
  prompt: string;
  visibility: string;
}

const WorkspaceCard: React.FC<WorkspaceCardProps> = ({
  title,
  authorName,
  genre,
  imageCID,
  audioCID,
  prompt,
  visibility,
}) => {
  const pinataGateway = "ugahacksx.mypinata.cloud";
  
  return (
    <div className={styles.songPostCard}>

      {imageCID ? (
        <img src={imageCID} alt={title} className={styles.songImage} />
      ) : (
        <p>Loading image...</p>
      )}

      <h2 className={styles.songTitle}>{title}</h2>
      <p className={styles.songAuthor}>by {authorName}</p>
      <p className={styles.songGenre}>Genre: {genre}</p>
      {audioCID ? (
        <audio controls className={styles.audioPlayer}>
          <source src={audioCID} type="audio/wav" />
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
