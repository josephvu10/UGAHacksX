"use client";

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('pages/exampleUsage');
  };

  const handleClickSongPosts = () => {
    router.push('pages/songPosts');
  };

  const handleClickWorkspace = () => {
    router.push('pages/workspace');
  };

  //we should make this the homepage with the slogan and make it similar to the Suno homepage
  const khoaTest = () => {
    router.push('/khoaTest');
  }
  return (
    <div>
      <button onClick={handleClick}>Go to Example Usage</button>
      <button onClick={handleClickSongPosts}>Go to Public Songs</button> 
      <button onClick={handleClickWorkspace}>Go to Workspace</button>
      <a href="/api/auth/login">Login</a>
      <a href="/api/auth/logout">Logout</a>
    </div>
  );
}