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
  return (
    <div className={styles.songPostCard}>
      {image ? (
        <img src={image} alt={title} className={styles.songImage} />
      ) : (
        <p>Loading image...</p>
      )}
      <h2 className={styles.songTitle}>{title}</h2>
      <p className={styles.songAuthor}>by {authorName}</p>
      <p className={styles.songGenre}>
        <span className={styles.genreLabel}>Genre: </span>
        <span className={styles.genreValue}>{genre}</span>
      </p>
      {audio ? (
        <audio controls className={styles.audioPlayer}>
          <source src={audio} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <p>Loading audio...</p>
      )}
      <p className={styles.songPrompt}>Prompt: {prompt}</p>
      <p className={styles.songVisibility}>Visibility: {visibility}</p>
    </div>
  );
};

export default WorkspaceCard;