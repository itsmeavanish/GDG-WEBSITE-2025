import React, { useEffect, useRef } from 'react';
import { Code, Globe, Users, Lightbulb, Network, Github } from 'lucide-react';
import styled from 'styled-components';
import '../styles/About.css';

const Aboutid = styled.section`
  color: ${({ theme }) => theme.colors.text.primary};
  padding: 80px 20px;
  @media (max-width: 768px) {
    padding: 80px 15px;
  }
  @media (max-width: 480px) {
    padding: 90px 10px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;

  .feature-card {
    background-color: ${({ theme }) => theme.colors.background.secondary};\
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    opacity: 0;
    transform: translateY(30px);

    &.visible {
      opacity: 1;
      transform: translateY(0);
    }

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 10px 30px ${({ theme }) => theme.colors.shadow};
    }
  }

  .feature-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    background-color: ${({ theme }) => theme.colors.background.primary};
    box-shadow: 0 2px 10px ${({ theme }) => theme.colors.shadow};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 2.5rem;
    transition: transform 0.3s ease;

    .feature-card:hover & {
      transform: scale(1.1) rotate(5deg);
    }
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: 600;
  }

  p {
    color: ${({ theme }) => theme.colors.text.tertiary};
    font-size: 1rem;
    line-height: 1.5;
  }
`

const AboutStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 2rem;
  margin-top: 4rem;

  .stat-card {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.background.primary}, ${({ theme }) => theme.colors.background.secondary});
    color: ${({ theme }) => theme.colors.text.primary};
    border-radius: 1rem;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    box-shadow: 0 4px 15px ${({ theme }) => theme.colors.shadow};
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    transform: translateY(30px);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px ${({ theme }) => theme.colors.shadow};
    }
  }

  .stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
    background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    background-size: 200% 200%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .stat-label {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 1rem;
    font-weight: 500;
  }
`;

const About = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    cardsRef.current.forEach(card => card && observer.observe(card));

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      cardsRef.current.forEach(card => card && observer.unobserve(card));
    };
  }, []);

  const features = [
    {
      icon: <Globe size={36} />,
      title: 'Web Development',
      description: "Connect with developers from around the world and be part of Google's global developer network.",
    },
    {
      icon: <Code size={36} />,
      title: 'Android Development',
      description: 'Learn new technologies through practical workshops led by industry experts and Google Developer Experts.',
    },
    {
      icon: <Users size={36} />,
      title: 'Artificial Intelligence & Machine Learning',
      description: 'Meet like-minded developers, form valuable connections, and collaborate on exciting projects.',
    },
    {
      icon: <Lightbulb size={36} />,
      title: 'Cybersecurity and Cryptography',
      description: 'Get inspired, share ideas, and stay ahead of the curve with the latest Google technologies and tools.',
    },
    {
      icon: <Network size={36} />,
      title: 'Blockchain & Web 3.0',
      description: 'Focus on the future of decentralized technologies.',
    },
    {
      icon: <Github size={36} />,
      title: 'Open Source & Cloud Computing',
      description: 'Harness the power of open-source tools and scalable cloud solutions.',
    },
  ];

  return (
    <Aboutid className="about">
      <Container>
        <div ref={sectionRef} className="about-header animate-on-scroll">
          <h2 className="section-title">About GDG on Campus MMMUT</h2>
          <p className="about-description">
            Founded on 26th September 2020 by our visionary alumnus, Abhishek Kumar Yadav, GDG MMMUT has grown from its roots as Developer Student Clubs (DSC) under the Google Developers Program to the largest developer community in our campus and region. With a mission to drive innovation, promote technology, and empower skill development, we are a thriving hub for tech enthusiasts committed to shaping the future of technology.
          </p>
          <h3>Join a thriving community of Google developers.</h3>
        </div>

        <FeaturesGrid>
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              ref={el => (cardsRef.current[index] = el)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </FeaturesGrid>

        <AboutStats>
          <div className="stat-card">
            <span className="stat-number">1000+</span>
            <span className="stat-label">Community Members</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">50+</span>
            <span className="stat-label">Events Organized</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">10+</span>
            <span className="stat-label">Speakers</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">2+</span>
            <span className="stat-label">Hackathons</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">10+</span>
            <span className="stat-label">Workshops</span>
          </div>
        </AboutStats>
      </Container>
    </Aboutid>
  );
};

export default About;
