import React, { useEffect, useState } from "react";

interface SongPostCardProps {
  title: string;
  authorName: string;
  genre: string;
  image: string;
  audio: string;
  prompt: string;
  visibility: string;
}

const SongPostCard: React.FC<SongPostCardProps> = ({
  title,
  authorName,
  genre,
  image,
  audio,
  prompt,
  visibility,
}) => {
  
  return (
    <div className="song-post-card">
      {/* 🎵 Render Image (Show Loading if Not Ready) */}
      {image ? (
        <img src={image} alt={title} className="song-image" />
      ) : (
        <p>Loading image...</p>
      )}

      <h2 className="song-title">{title}</h2>
      <p className="song-author">by {authorName}</p>
      <p className="song-genre">Genre: {genre}</p>

      {/* 🎧 Render Audio Player (Show Loading if Not Ready) */}
      {audio ? (
        <audio controls className="song-audio">
          <source src={audio} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <p>Loading audio...</p>
      )}

      <p className="song-prompt">Prompt: {prompt}</p>
      <p className="song-visibility">Visibility: {visibility}</p>
    </div>
  );
};

export default SongPostCard;