import React from 'react';
import styles from "./About.module.css";
import Navbar from "../Navbar/Navbar"
//import Sea from "../Sea/Sea"

const About = () => {
  return (
    <>
      <Navbar />
      <div className={styles.about}>
        <h2>About TechVoyage 2023</h2>
        <p>
          Hey, Future Tech Navigators! Embark on an exhilarating journey through
          the vast and dynamic realm of technology with IET Cipher's flagship
          event for first-year enthusiasts - "TechVoyage 2023: Navigating the Tech
          Ocean." Brace yourselves for an unforgettable expedition where waves of
          innovation, currents of knowledge, and the winds of inspiration will
          propel you into the heart of the digital sea.
        </p>
        <p>
          TechVoyage is not just an event; it's a compass for your tech journey.
          Whether you're a coding prodigy or a curious mind eager to explore, this
          event is your gateway to understanding the vast ocean of opportunities
          that the tech world offers. Don't miss the chance to set sail on this
          extraordinary adventure with IET Cipher and discover the exciting
          horizons that await you in the boundless Tech Ocean.
        </p>
        <p>
          Secure your spot now and be ready to embark on a journey that will
          redefine your perception of technology! See you at TechVoyage 2023!
        </p>
        <h2>CodeQuest Chronicles</h2>
        <p>
          “The Ultimate Story Encoding Competition" Embark on an extraordinary
          journey into the realms of technology and problem-solving with "CodeQuest
          Chronicles," the ultimate story encoding competition that unfolds an
          epic tale of challenges across diverse domains.
        </p>
        <p>
          Assemble your team of intrepid coders and brace yourselves for a
          narrative like no other. The pinnacle of CodeQuest Chronicles where all
          the encoded solutions converge to unveil the climax of the story.
          Decrypt the final challenge, demonstrate your mastery across domains
          such as Capture The Flag, Cryptography, Competitive Programming, Version
          Control Systems, ML & AI and emerge as the ultimate CodeQuest Champion.
        </p>
        <p>
          This event would be conducted through a Self-Designed Website Under Our
          Web-Team. Grading would be done as per the difficulty level of questions
          solved (leaderboard).
        </p>
        <h3>Web Team</h3>
        <ul>
          <li>Atharv Vats</li>
          <li>Sudeep YM</li>
        </ul>
      </div>
    </>
  );
};

export default About;