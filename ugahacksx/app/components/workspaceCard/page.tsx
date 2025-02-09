import React from "react";

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
    <div className="song-post-card">
      <img src={`${pinataGateway}${imageCID}`} alt={title} className="song-image" />
      <h2 className="song-title">{title}</h2>
      <p className="song-author">by {authorName}</p>
      <p className="song-genre">Genre: {genre}</p>
      <audio controls className="song-audio">
        <source src={`${pinataGateway}${audioCID}`} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
      <p className="song-prompt">Prompt: {prompt}</p>
      <p className="song-visibility">Visibility: {visibility}</p>
    </div>
  );
};

export default WorkspaceCard;
