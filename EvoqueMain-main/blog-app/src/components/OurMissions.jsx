import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import logo from '../images/evoque_transparent.png'; 

const PageContainer = styled.div`
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
  width: 100%;
  scroll-padding-top: 60px; 
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 60px);  
  scroll-snap-align: start;

  &:nth-child(even) {
    flex-direction: row-reverse;
  }
`;

const Content = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
  text-transform: uppercase;
  font-style: italic;
`;

const Paragraph = styled.p`
  text-align: center;
  text-transform: uppercase;
  font-style: italic;
`;

const OurMissionPage = () => {

  return (
    <PageContainer>
      <Section id="section-0">
        <Content>
          <Title>Our Missions</Title>
        </Content>
      </Section>
      
      <Section id="section-1">
        <Content>
          <Title>Why We Started</Title>
          <Paragraph>Evoque was founded by high-schoolers Kaden and Avyu, two dedicated individuals who've triumphed over personal struggles with weight. They lacked access to reliable fitness information, so they are now creating a community to fill the gap for teens and young adults seeking holistic self-improvement. Evoque offers a curated selection of expert fitness, nutrition, and mental wellness resources created by teens, for teens, to help unlock your full potential. Embrace a life of vitality and confidence as you embark on the rebirth of your identity.</Paragraph>
        </Content>
        <Image src={logo} alt="section 1" width={500} height={300}/>
      </Section>
      
      <Section id="section-2">
        <Content>
          <Title>Our Purpose</Title>
          <Paragraph>At Evoque, our purpose is crystal clear: to empower teens and young adults to rise above the distractions of this fast-paced world and embrace a path of self-improvement through discipline and dedication. We believe that every individual has the potential to become their best self, and we're here to guide and support them on this transformative journey. By providing a platform that emphasizes discipline, resilience, and continuous growth, we aim to equip our community with the tools and knowledge they need to break free from distractions, unlock their true potential, and achieve greatness in every aspect of life. Together, we will conquer obstacles, celebrate successes, and redefine what it means to be extraordinary.</Paragraph>
        </Content>
        <Image src={logo} alt="section 2" width={500} height={300}/>
      </Section>
      
      <Section id="section-3">
        <Content>
          <Title>Giving Back</Title>
          <Paragraph>Giving back is at the core of Evoque's mission. We believe that success should be shared, and that's why we're committed to using a substantial portion of our profits from advertising and sales to make a positive impact on the world. Each year, our community will have the power to vote on a charitable project related to fitness, aligning with our vision of empowering teens and young adults. Whether it's building a state-of-the-art gym accessible for free to teens, supporting a food bank to combat hunger, or contributing to rebuilding efforts in disaster-stricken areas, our goal is to create meaningful change and leave a lasting, positive footprint on communities in need</Paragraph>
        </Content>
        <Image src={logo} alt="section 3" width={500} height={300}/>
      </Section>
    </PageContainer>
  );
};

export default OurMissionPage;
