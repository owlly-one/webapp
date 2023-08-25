import React from 'react';
import styles from '../styles/aboutus.module.css';
import kadenJerryImage from "../images/kaden_jerry.jpg";
import Image from "next/image"

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Kaden Jerry',
      position: 'CEO',
      description: 'Tennis team, Coder, Caddie, Outside Services at Treesdale Country Club, Golfer, ',
      image: kadenJerryImage,
    },
    {
      name: 'Avyu Nagrath',
      position: 'CEO',
      description: 'Validictorian Pine Richland High school, Weight lifter, Coder, ',
      image: kadenJerryImage,
    },
    {
      name: 'Brian Ock',
      position: 'GOD',
      description: 'Casual Sex',
      image: kadenJerryImage,
    },
    {
      name: 'Brayden Stiscak',
      position: 'Influencer',
      description: '315',
      image: kadenJerryImage,
    },
    {
      name: 'Joseph Crivelli',
      position: 'Lead Mans',
      description: '"I\'m Gay"',
      image: kadenJerryImage,
    },
    {
      name: 'Miles Lasky',
      position: 'Influencer',
      description: 'Sex until failure',
      image: kadenJerryImage,
    },
    {
      name: 'Ryder Edwards',
      position: 'Influencer',
      description: 'Za master',
      image: kadenJerryImage,
    },
    {
      name: 'Yuki Qian',
      position: 'Influencer',
      description: '"Lifts" until "failure"',
      image: kadenJerryImage,
    },
    {
      name: 'Jules Jung',
      position: 'Influencer',
      description: 'Lifter',
      image: kadenJerryImage,
    },
  ];

 
  return (
    <div className={styles['about-us-container']}>
      <div className = {styles['header']}>Our Team</div>
      <div className={styles['team-members']}>
        {teamMembers.map((member, index) => (
          <div className={styles['team-member']} key={index}>
            <div className={styles['team-member-details']}>
              <div className={styles['team-member-name-position']}>
                <h3>{member.name}</h3>
                <p>{member.position}</p>
              </div>
              {/* Set dynamic percentages for the image */}
              <div className={styles['team-member-image-container']}>
                <Image
                  src={member.image}
                  alt={member.name}
                  className={styles['team-member-image']}
                  layout="responsive" // Use layout="responsive" for dynamic sizing
                  width={400} // Set the initial width for the image
                  height={400} // Set the initial height for the image
                  objectFit="cover" // Maintain aspect ratio and cover the container
                />
              </div>
            </div>
            <p>{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};



export default AboutUs;
console.log(kadenJerryImage);
