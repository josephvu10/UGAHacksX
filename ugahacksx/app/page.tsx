"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import NavBar from './components/NavBar/page'; // Import the NavBar component
import OIAUIA from './public/oia-uia.gif';
import FLOWER from './public/flower2.gif';
import CIRCLE from './public/circle.gif';
import ARROWDOWN from './public/arrowDown.png';
<style>
@import url('https://fonts.googleapis.com/css2?family=Ballet:opsz@16..72&display=swap');
</style>

export default function Home() {
  // For Auth0
  const { user, error, isLoading } = useUser();

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

  const handleGenerateSound = () => {
    if (!user) {
      // 🚀 Redirect to Auth0 Login if Not Logged In
      router.push('/api/auth/login');
    } else {
      // ✅ Redirect to Workspace if Already Logged In
      router.push('/pages/workspace');
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    
    <div className={styles.page}>

      <NavBar />
      <div className={styles.titleContainer}>
        <h1 className ={styles.title1}> Express the </h1> 
        <h1 className = {styles.title2}> Sound of Your Soul</h1>


      <div className={styles.genBarContainer}>
        <input type="text" placeholder="Generate sounds..." />
        <button onClick={handleGenerateSound} type="button">Submit</button>
      </div>

      </div>
      

      <div className={styles.scrollContainer}>   
        <div className={styles.scrollText}>
          Learn More About the App! •
          What Inspired It? •
          What Does It Do? •
          How We Built it? 
        </div>
      </div>
    


    <div className = {styles.aboutContainer}>
    <h1 className={styles.aboutTitle}>
  {"A Little More About The App".split("").map((letter, index) => (
    <span key={index} className={styles.waveLetter} style={{ animationDelay: `${index * 0.1}s` }}>
      {letter}
    </span>
  ))}
</h1>


      <div className = {styles.aboutContainerRow}>
      <div className = {styles.about}> 
        <h2> Inspiration </h2>
        <p> Music is one of the most powerful forms of self-expression, yet not everyone has equal access to creating it. 
          We asked ourselves: How do we express ourselves through music? This question led us to explore the intersection of music, accessibility, and technology. 
          Throughout this year, we've met individuals with different challenges—language barriers, hearing impairments, speech disabilities, and limited mobility—who struggle to express themselves through traditional means. 
          With Sona, we wanted to bridge that gap and create an inclusive platform where anyone, regardless of their abilities, can create and share music effortlessly. </p>
      </div>

      <div className = {styles.does}> 
      <h2> Purpose </h2>
        <p> Sona is a web application designed to empower individuals who may face barriers in music creation. 
          Whether someone is deaf, mute, or has limited mobility, Sona allows them to generate music using simple phrases or lyrics that hold meaning to them. 
          Users can either keep their music private or share it with the world, fostering a community built on creative expression. </p>
      </div>
      </div>
      <div className = {styles.built}>
      <h2> Development </h2>
        <p> We developed Sona using Next.js for its efficient server-side rendering, ensuring a smooth and responsive experience. 
          The frontend was crafted with HTML, CSS, and TypeScript to provide an interactive and user-friendly interface. 
          Generative AI tools played a crucial role in our project—Beatoven for AI-generated music, Gemini AI for lyrical suggestions, and Stability AI for generating album cover art. 
          For decentralized file storage, we integrated Pinata, allowing us to securely store user-generated content, including images, audio files, and metadata. </p>
      </div>
      </div>

      <div className={styles.aboutCaptionContainer}>
        <p className = {styles.aboutCaption1}> Scroll Down </p>
        <p className = {styles.aboutCaption2}> to Learn More! </p>
      </div>
      
      <div className={styles.arrowDownContainer}>
      <Image 
         src={ARROWDOWN} 
         alt="arrow down" 
         width={135}
         height={165}/>
       </div>

      <div className={styles.groupBigContainer}>
      <div className={styles.groupContainer}>
        <h1>Who Are We</h1>
        <div className={styles.imageRow}>
          <div className={styles.imageContainer}>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/d/d4/Donkey_Kong_character.png"
              alt="Donkey Kong"
              className={styles.characterImage}
            />
            <p className={styles.caption}>Khoa Le</p>
            <p className={styles.captionDescription}>I'm just a chill dude</p>
          </div>
          <div className={styles.imageContainer}>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/d/db/Yoshi_%28Nintendo_character%29.png"
              alt="Yoshi"
              className={styles.characterImageYoshi}
            />
            <p className={styles.caption}>Daniel</p>
            <p className={styles.captionDescription}>OIAUIA</p>
          </div>
          <div className={styles.imageContainer}>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/b/be/Luigi_by_Shigehisa_Nakaue.png"
              alt="Luigi"
              className={styles.characterImageLuigi}
            />
            <p className={styles.caption}>Joseph</p>
            <p className={styles.captionDescription}>bonk smash bonk</p>
          </div>
          <div className={styles.imageContainer}>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/b/b9/Toad_by_Shigehisa_Nakaue.png"
              alt="Toad"
              className={styles.characterImage}
            />
            <p className={styles.caption}>Lauren</p>
            <p className={styles.captionDescription}>Last seen: at home</p>
          </div>
        </div>
      </div>
    </div>

      <div className={styles.footerContainer}>
        <div className={styles.footerRow}>
          <h1> Are you ready to unleash your power of music?</h1>
        </div>
        <div className={styles.footerBar}>
            <ul className= {styles.footerItems}>
            <li className = {styles.footerItem}> Instagram </li>
            <li className = {styles.footerItem}> LinkedIn</li>
            <li className = {styles.footerItem}> All Rights Reserved </li>
            <li className = {styles.footerItem}> Privacy Policy</li>
            </ul>
          </div>
          </div>
    </div>
  );
}