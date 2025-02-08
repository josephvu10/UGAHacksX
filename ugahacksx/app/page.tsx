import Image from "next/image";
import styles from "./page.module.css";
"use client";
export const dynamic = 'force-static';
//import NavigationBar from "./components/navBar";
import { useState, useEffect } from "react";
import Link from "next/link";
//import { useUserCtx } from "./context/UserContext";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Home() {
  //const { userData, logout } = useUserCtx();

  const [currentSlide, setCurrentSlide] = useState(Array(8).fill(0));
  const [displayedImages, setDisplayedImages] = useState([]);

  const images = [
    "cover1.png",
    "cover2.png",
    "cover3.png",
    "cover4.png",
    "cover5.png",
    "cover6.png",
    "cover7.png",
    "cover8.png",
    "cover9.png",
    "cover10.png",
    "cover11.png",
    "cover12.png",
    "cover13.png",
    "cover14.png",
    "cover15.png",
    "cover16.png",
    "cover17.png",
    "cover18.png",
  ];

  useEffect(() => {
    // Change displayed images initially
    changeDisplayedImages();

    // Set interval to change displayed images every 3 seconds
    const interval = setInterval(() => {
      changeDisplayedImages();
    }, 3000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const changeDisplayedImages = () => {
    const randomImages = [];
    const availableImages = [...images]; // Create a copy of the images array

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * availableImages.length);
      const selectedImage = availableImages[randomIndex];
      randomImages.push(selectedImage);
      // Remove the selected image from the available images
      availableImages.splice(randomIndex, 1);
    }

    //setDisplayedImages(randomImages);
  };

  return (
    <div className={styles.hpContainer}>
      <nav className={styles.navBar}>
        <ul className={styles.navList}>
              <li className={styles.navItem}>
                <Link href="/createAccount">
                  <button className={styles.navButton}>Create Account</button>
                </Link>
              </li>
              <li className={styles.navItem2}>
                <Link href="/login">
                  <button className={styles.navButton}>Login</button>
                </Link>
              </li>
            <>
              <li>
                <Link href="/playlist">
                  <button className={styles.navButton}>Playlist</button>
                </Link>
              </li>
              <li>
                <button className={styles.navButton} >Logout</button>
              </li>
            </>
        </ul>
      </nav>

      <div className={styles.welcomeBanner}>
        <div className={styles.welcomeTextContainer}>
          <div className={styles.welcomeText}>
            <h1>
              {" "}
              Welcome to <br /> SoundPalette{" "}
            </h1>
            <h2> Where playlists paint your mood </h2>
          </div>
        </div>
        <div className={styles.overlay}></div>
        <img
          src="Images/HPBanner.gif"
          alt="banner"
          className={styles.bannerImage}
        />
      </div>
      <div className={styles.searchBarContainer}>
      </div>
      <p> See what's trending near you</p>

      <div className={styles.gridContainer}>
        {displayedImages.map((imageName, index) => (
          <div key={index} className={styles.gridCell}>
            <div className={styles.imageContainer}>
              <Image
                src={`/images/${imageName}`}
                alt={`Image ${index}`}
                width={150}
                height={150}
              />
            </div>
          </div>
        ))}
      </div>

      <Link href="/createAccount">
        <button className={styles.mixButton}>Start mixing your playlist</button>
      </Link>
    </div>
  );
}