import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useInView, useScroll } from 'framer-motion';
import { FaGit, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Uploadbox from '../../Upload/Uploadbox';
import {useAuth} from "../contexts/useAuth"
const TeamSectionContainer = styled.section`
  padding: 6rem 2rem;
  background-color: ${({ theme }) => theme.colors.background.primary};
  position: relative;
  overflow: hidden;
`;
const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;
const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -0.5rem;
    height: 4px;
    width: 60px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;
const SectionDescription = styled.p`
  font-size: 1.125rem;
  max-width: 700px;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.text.secondary};
`;
const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;
const TeamMemberCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 30px ${({ theme }) => theme.colors.shadow};
  }
`;
const MemberImage = styled.div`
  height: 250px;
  overflow: hidden;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(
      to bottom,
      transparent,
      ${({ theme }) => theme.colors.background.secondary}
    );
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  ${TeamMemberCard}:hover & img {
    transform: scale(1.05);
  }
`;
const MemberContent = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

const RoleBadge = styled.span`
  display: inline-block;
  background-color: ${({ theme, $role }) => {
    switch($role) {
      case 'lead': return theme.googleColors.blue.light;
      case 'core': return theme.googleColors.red.light;
      case 'organizer': return theme.googleColors.green.light;
      case 'volunteer': return theme.googleColors.yellow.light;
      default: return theme.colors.primary;
    }
  }};
  color: ${({ theme, $role }) => {
    switch($role) {
      case 'lead': return theme.googleColors.blue.darker;
      case 'core': return theme.googleColors.red.darker;
      case 'organizer': return theme.googleColors.green.darker;
      case 'volunteer': return theme.googleColors.yellow.darker;
      default: return theme.colors.text.inverse;
    }
  }};
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
`;
const MemberName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;
const MemberRole = styled.h4`
  font-size: 1.125rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;
const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;
const SocialLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.25rem;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
const FilterButton = styled.button`
  padding: 10px 20px;
  border-radius: 25px;
  border: 2px solid ${props => props.theme.primary};
  background: ${props => props.active ? props.theme.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.text.primary};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.primary};
    color: white;
  }
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

// Dummy team data
const teamData =[
  {
    "id": 1,
    "name": "Avanish Upadhyay",
    "role": "Web Dev Lead",
    "badge": "Web Developer",
    "year": "2024",
    "image": "https://res.cloudinary.com/dfstpdwih/image/upload/v1747396588/Codehelp/tmp-4-1747396587840.jpg",
    "social": {
      "linkedin": "https://www.linkedin.com/in/avanish633/",
      "twitter": "https://x.com/AvanishU1807",
      "github": "https://github.com/itsmeavanish"
    }
  },
  {
    "id": 2,
    "name": "Anmol Tomar",
    "role": "Web Dev Lead",
    "badge": "Web Developer",
    "year": "2024",
    "image": "https://media.licdn.com/dms/image/v2/D5603AQF1BCDvEoRJZw/profile-displayphoto-crop_800_800/B56Zgnixf7HkAM-/0/1753010086392?e=1757548800&v=beta&t=IDNeaYzST-b8KtrbAgQI4uw7G9VUpLX_Wh8-2g9X8K4",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 3,
    "name": "Aditya Pratap Singh",
    "role": "Web Dev Lead",
    "badge": "Web Developer",
    "year": "2024",
    "image": "https://media.licdn.com/dms/image/v2/D5603AQEa89vnpYSKzg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1723404895368?e=1757548800&v=beta&t=aOn0H36gOZyAc-MaRTbdu5pdlENlcoXqyZ9SV7zyPDM",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 4,
    "name": "Ujjwal Gupta",
    "role": "Web Dev Lead",
    "badge": "Web Developer",
    "year": "2024",
    "image": "https://media.licdn.com/dms/image/v2/D5603AQEZ_19pHOlqUA/profile-displayphoto-crop_800_800/B56Zh1xBNaG4AM-/0/1754322443287?e=1757548800&v=beta&t=Kp_N7f1S9ELbxD2ozM_WNllpL2Xm-D9h0LBDiz_9ds8",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 5,
    "name": "Saksham Mishra",
    "role": "Android Dev Lead",
    "badge": "Android Developer",
    "year": "2024",
    "image": "https://media.licdn.com/dms/image/v2/D4D03AQFJJlEyHTS5zw/profile-displayphoto-shrink_400_400/B4DZaYK.6JG0Ak-/0/1746309739690?e=1757548800&v=beta&t=PaC9ykbJEQlhiBj0EzVjHVw_oLByBShfekRBPyoZVJ0",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 6,
    "name": "Vikhyat Singh",
    "role": "Android Dev Lead",
    "badge": "Android Developer",
    "year": "2024",
    "image": "https://media.licdn.com/dms/image/v2/D5603AQHmb7KWgJr-oQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1733056715934?e=1757548800&v=beta&t=jjKb4Tf9hBTpF83hBZCjm1Ixi3TLorvKoMNfiXmRAHs",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 7,
    "name": "Vivek Maurya",
    "role": "Android Dev Lead",
    "badge": "Android Developer",
    "year": "2024",
    "image": "https://media.licdn.com/dms/image/v2/D5603AQF4NNPlcjywzA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1703076685260?e=1757548800&v=beta&t=whaauTeZzv5JFZ0WEfIE4493W7Tuttcl-cNHO-PR84A",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 8,
    "name": "Anurag Yadav",
    "role": "Design Lead",
    "badge": "Designer",
    "year": "2024",
    "image": "https://media.licdn.com/dms/image/v2/D5603AQFKDYvrS4DpMg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1710610293596?e=1757548800&v=beta&t=4rSmedSBlreiwIO1Bt04Huju2nf22ZX-nWFgdbb5Ba4",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 9,
    "name": "Devesh Sharma",
    "role": "Design Lead",
    "badge": "Designer",
    "year": "2024",
    "image": "https://media.licdn.com/dms/image/v2/D5603AQHLboAv1WBDOA/profile-displayphoto-shrink_800_800/B56ZdgLlZpG0Ac-/0/1749665339927?e=1757548800&v=beta&t=2K-igXb45Ra9uccHSdYrFiNUqI2KDDj4NsVfMNhA0cg",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 10,
    "name": "Madhu Yadav",
    "role": "Design Lead",
    "badge": "Designer",
    "year": "2024",
    "image": "https://media.licdn.com/dms/image/v2/D5603AQGdNAk-qG4hKw/profile-displayphoto-shrink_800_800/B56ZSFAiQcHoAc-/0/1737398299316?e=1757548800&v=beta&t=a4n6u5hmzDdXaLY9D9kC8YQ2szpgLYA7R1ql7LeKlm0",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 11,
    "name": "Prateek Khare",
    "role": "Design Lead",
    "badge": "Designer",
    "year": "2024",
    "image": "https://media.licdn.com/dms/image/v2/D5603AQGWwlhXsCP9lw/profile-displayphoto-shrink_800_800/B56ZY._EODGQAk-/0/1744813443460?e=1757548800&v=beta&t=mAYbj1konDnvfCNf01kF-zt-yXUgLFo6IY-YCPNO1Go",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 12,
    "name": "Harshit Singh",
    "role": "DSA/CP Lead",
    "badge": "Competitive Programmer",
    "year": "2024",
    "image": "https://media.licdn.com/dms/image/v2/D5603AQFbKt16IW12Ag/profile-displayphoto-crop_800_800/B56ZhLiDHXHkAI-/0/1753613875792?e=1757548800&v=beta&t=UiguwgxlfpUIfa7zyz2Va-iDECH-E3WoqDCayFqk_DE",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 13,
    "name": "Shivam Singh",
    "role": "DSA/CP Lead",
    "badge": "Competitive Programmer",
    "year": "2024",
    "image": "https://media.licdn.com/dms/image/v2/D5603AQGycROglmsqBQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724610837222?e=1757548800&v=beta&t=qwXEG5C4PYO7ga9Gkt1sFfaamAJmoHfy3xJhgB2QlIo",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 14,
    "name": "Kriti Yadav",
    "role": "DSA/CP Lead",
    "badge": "Competitive Programmer",
    "year": "2024",
    "image": "https://media.licdn.com/dms/image/v2/D5603AQECWBk897J3zw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1729078511479?e=1757548800&v=beta&t=eSkzFgmswrjpVirQwGFVdHL9s0uW7BjdRaw_yfczVp0",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 15,
    "name": "Kunal Shrivastav",
    "role": "DSA/CP Lead",
    "badge": "Competitive Programmer",
    "year": "2024",
    "image": "https://media.licdn.com/dms/image/v2/D4D35AQEnfej3Rn6K9w/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1702121778771?e=1754974800&v=beta&t=LUhT2Ib91vAhsPDHAXv3XnjjIIcycUiYhtWkaXYXSIs",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 16,
    "name": "Ananya Gupta",
    "role": "Content & Management Lead",
    "badge": "Content Creator",
    "year": "2024",
    "image": "https://media.licdn.com/dms/image/v2/D5603AQHSeE_4U6GRrg/profile-displayphoto-shrink_800_800/B56ZOhcq0SGwAc-/0/1733580480295?e=1757548800&v=beta&t=EcvAhwC6cagz-NWne_bt4dOX-ujwoAn-VZTrenrVZuM",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 17,
    "name": "Ananya",
    "role": "Content & Management Lead",
    "badge": "Content Creator",
    "year": "2024",
    "image": "https://media.licdn.com/dms/image/v2/D5603AQHRMH-HEBPM6A/profile-displayphoto-crop_800_800/B56ZeHZyFuGQAQ-/0/1750323375140?e=1757548800&v=beta&t=aWonbYhBNeGiS49iUIhsudlveptxJD-sHSQnC-hwH80",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 18,
    "name": "Ashutosh Maurya",
    "role": "Content & Management Lead",
    "badge": "Content Creator",
    "year": "2024",
    "image": "https://media.licdn.com/dms/image/v2/D4E03AQEdfpiCZDBydg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1722261829049?e=1757548800&v=beta&t=xrhwlwVFRImdJp2MKLZUEQhJfDM9X7lt7uZTtyZomb0",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 19,
    "name": "Atishay Kumar Pandey",
    "role": "Content & Management Lead",
    "badge": "Content Creator",
    "year": "2024",
    "image": "https://media.licdn.com/dms/image/v2/D5603AQGUxCdpq4t6Ww/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1729175434582?e=1757548800&v=beta&t=xxIS4ohaFE1sI5nk8tQ3myMOy6oUtSlsoAib6jSttpc",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 20,
    "name": "Jahnawi Agarwal",
    "role": "Content & Management Lead",
    "badge": "Content Creator",
    "year": "2024",
    "image": "https://media.licdn.com/dms/image/v2/D4E03AQG_P2_fBxurTA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1710781652551?e=1757548800&v=beta&t=gmb5_8m7DDg3BOpafOubXHyrRjut_0NayixneRYeDm0",
    "social": {
      "linkedin": "https://linkedin.com",
      "twitter": "https://twitter.com",
      "github": "https://github.com"
    }
  },
  {
    "id": 21,
    "name": "Madhur Pratap Singh Gaur",
    "role": "Web & Firebase Team",
    "badge": "Web Developer",
    "year": "2023",
    "image":"https://media.licdn.com/dms/image/v2/D5603AQGkEqGr3-BnRQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718821349966?e=1757548800&v=beta&t=3eubEjrzfO9m8m1YUxAMPrBwbT3OSQIQ7TNVtlFrXG0",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 22,
    "name": "Sandeep Singh (ECE)",
    "role": "Web & Firebase Team",
    "badge": "Web Developer",
    "image":"https://media.licdn.com/dms/image/v2/D5603AQGhTq9LehoOAQ/profile-displayphoto-shrink_400_400/B56ZUjUVFPGsAg-/0/1740054287396?e=1757548800&v=beta&t=J0qOBfMYam5QmcL4BhUeJqKFokFonxnafn4Ve2TV1L0",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 23,
    "name": "Aditya Gaur",
    "role": "Web & Firebase Team",
    "badge": "Web Developer",
    "year": "2023",
    "image":"https://media.licdn.com/dms/image/v2/D5635AQFKYMQbEvwlxA/profile-framedphoto-shrink_400_400/B56ZYk4fCOGUAc-/0/1744375509778?e=1754974800&v=beta&t=9KS8yVb3ebL-nwMbnWCdeHlMXq5Ys0RvWDYYkvvn9SM",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 24,
    "name": "Pranjal Mani",
    "role": "Web & Firebase Team",
    "badge": "Web Developer",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 25,
    "name": "Jyoti Maurya",
    "role": "Web & Firebase Team",
    "badge": "Web Developer",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 26,
    "name": "Gayetri Verma",
    "role": "AI/ML, Cybersecurity & Cloud Team",
    "badge": "AI/ML Enthusiast",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 27,
    "name": "Aditya Patel",
    "role": "AI/ML, Cybersecurity & Cloud Team",
    "badge": "AI/ML Enthusiast",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 28,
    "name": "Sarika Kaushal",
    "role": "AI/ML, Cybersecurity & Cloud Team",
    "badge": "AI/ML Enthusiast",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 29,
    "name": "Aditya Kumar Kasaudhan",
    "role": "Android Team",
    "badge": "Android Developer",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 30,
    "name": "Aastha Gupta",
    "role": "GDG Lead 2024",
    "badge": "Android Developer",
    "year": "2023",
    "image": "https://media.licdn.com/dms/image/v2/D5603AQFesvWVoJIP6Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1711456735826?e=1757548800&v=beta&t=JOEvScITNvMTpYdAaAOG293lHxhA69wFObtbl51S8o8",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 31,
    "name": "Suraj Kasaudhan",
    "role": "Android Team",
    "badge": "Android Developer",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 32,
    "name": "Sandeep Singh (ECE)",
    "role": "Android Team",
    "badge": "Android Developer",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 33,
    "name": "Ritika Yadav",
    "role": "Graphics & Creativity Team",
    "badge": "Designer",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 34,
    "name": "Divyansh Gupta",
    "role": "Graphics & Creativity Team",
    "badge": "Designer",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 35,
    "name": "Tanya Batham",
    "role": "Content Team",
    "badge": "Content Creator",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 36,
    "name": "Avinash Mishra",
    "role": "Content Team",
    "badge": "Content Creator",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 37,
    "name": "Abhinav Kumar",
    "role": "Event Coordination & Sponsorship Team",
    "badge": "Event Coordinator",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 38,
    "name": "Nainsi Gupta",
    "role": "Event Coordination & Sponsorship Team",
    "badge": "Event Coordinator",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 39,
    "name": "Abhirup Pratap Chaurasiya",
    "role": "Event Coordination & Sponsorship Team",
    "badge": "Event Coordinator",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 40,
    "name": "Paridhi Mittal",
    "role": "Event Coordination & Sponsorship Team",
    "badge": "Event Coordinator",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 41,
    "name": "Anuj Kashyap",
    "role": "Event Coordination & Sponsorship Team",
    "badge": "Event Coordinator",
    "year": "2023",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  }
  ,
  {
    "id": 42,
    "name": "Aastha Singh Sachan",
    "role": "Web & Firebase Team",
    "badge": "Web Developer",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 43,
    "name": "Abhishek Yadav",
    "role": "Web & Firebase Team",
    "badge": "Web Developer",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 44,
    "name": "Madhur Vatsal Bharti",
    "role": "Web & Firebase Team",
    "badge": "Web Developer",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 45,
    "name": "Saurabh Singh",
    "role": "Web & Firebase Team",
    "badge": "Web Developer",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 46,
    "name": "Sonali Rao",
    "role": "Web & Firebase Team",
    "badge": "Web Developer",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 47,
    "name": "Anubhav Gupta",
    "role": "GDG Lead 2023",
    "badge": "AI/ML Enthusiast",
    "year": "2022",
    "image":"https://media.licdn.com/dms/image/v2/D5635AQGAoP64cbfVPw/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1736012190248?e=1754974800&v=beta&t=kM8fJhOGIzOB0-ccuz98xdUiXSAyQpXnUtnD6HfbJUs",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 48,
    "name": "Ritika Agrahari",
    "role": "AI/ML & Cybersecurity Team",
    "badge": "AI/ML Enthusiast",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 49,
    "name": "Satvik Tripathi",
    "role": "AI/ML & Cybersecurity Team",
    "badge": "AI/ML Enthusiast",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 50,
    "name": "Ankit Verma",
    "role": "Android Team",
    "badge": "Android Developer",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 51,
    "name": "Devansh Tripathi",
    "role": "Android Team",
    "badge": "Android Developer",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 52,
    "name": "Sarthak Vishwakarma",
    "role": "Android Team",
    "badge": "Android Developer",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 53,
    "name": "Aniket Chaudhary",
    "role": "Graphics & Creativity Team",
    "badge": "Designer",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 54,
    "name": "Atul Kumar",
    "role": "Graphics & Creativity Team",
    "badge": "Designer",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 55,
    "name": "Sumit Kumar",
    "role": "Graphics & Creativity Team",
    "badge": "Designer",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 56,
    "name": "Anam Kumar Tiwari",
    "role": "Content Team",
    "badge": "Content Creator",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 57,
    "name": "Gaurav Kumar Sen",
    "role": "Content Team",
    "badge": "Content Creator",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 58,
    "name": "Saemvi Gupta",
    "role": "Content Team",
    "badge": "Content Creator",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 59,
    "name": "Ajit Kumar Yadav",
    "role": "Marketing & Sponsorship Team",
    "badge": "Marketing Specialist",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 60,
    "name": "Atulya Vaibhav Pandey",
    "role": "Marketing & Sponsorship Team",
    "badge": "Marketing Specialist",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 61,
    "name": "Yogeshwar Gupta",
    "role": "Marketing & Sponsorship Team",
    "badge": "Marketing Specialist",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 62,
    "name": "Aniket Gupta",
    "role": "Event Coordination Team",
    "badge": "Event Coordinator",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 63,
    "name": "Anjali Gupta",
    "role": "Event Coordination Team",
    "badge": "Event Coordinator",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 64,
    "name": "Ishita Shukla",
    "role": "Event Coordination Team",
    "badge": "Event Coordinator",
    "year": "2022",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
   {
    "id": 65,
    "name": "Abhay Nandan Singh",
    "role": "Media and CP Executive",
    "badge": "Media Coordinator",
    "year": "2021",
    "image": "",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 66,
    "name": "Archana Chaurasiya",
    "role": "Media and CP Executive",
    "badge": "Content Creator",
    "year": "2021",
    "image": "",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 67,
    "name": "Aradhya Srivastav",
    "role": "Media and CP Executive",
    "badge": "Public Relations",
    "year": "2021",
    "image": "",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 68,
    "name": "Anubhav Aggrawal",
    "role": "Media and CP Executive",
    "badge": "Social Media Manager",
    "year": "2021",
    "image": "",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 69,
    "name": "Bhaskar Trivedi",
    "role": "GDG Lead 2022",
    "badge": "Event Coordinator",
    "year": "2021",
    "image": "",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 70,
    "name": "Aman Kumar Poddar",
    "role": "Web, App, and Project Development Executive",
    "badge": "Developer",
    "year": "2021",
    "image": "",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 71,
    "name": "Ikchhit Kumar",
    "role": "Web, App, and Project Development Executive",
    "badge": "Frontend Developer",
    "year": "2021",
    "image": "",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 72,
    "name": "Aditya Dixit",
    "role": "Web, App, and Project Development Executive",
    "badge": "Backend Developer",
    "year": "2021",
    "image": "",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 73,
    "name": "Kumari Astha Rani",
    "role": "Web, App, and Project Development Executive",
    "badge": "Full Stack Developer",
    "year": "2021",
    "image": "",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 74,
    "name": "Sanjay Chaurasiya",
    "role": "Web, App, and Project Development Executive",
    "badge": "Mobile Developer",
    "year": "2021",
    "image": "",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 75,
    "name": "Shivam Pandey",
    "role": "Partnership and Outreach Executive",
    "badge": "Outreach Coordinator",
    "year": "2021",
    "image": "",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 76,
    "name": "Aryan Singh",
    "role": "Partnership and Outreach Executive",
    "badge": "Partnership Manager",
    "year": "2021",
    "image": "",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 77,
    "name": "Prehans Gupta",
    "role": "Partnership and Outreach Executive",
    "badge": "Sponsor Manager",
    "year": "2021",
    "image": "",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 78,
    "name": "Riva Diwan",
    "role": "Partnership and Outreach Executive",
    "badge": "Networking Coordinator",
    "year": "2021",
    "image": "",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
  {
    "id": 79,
    "name": "Khushi Singh",
    "role": "Partnership and Outreach Executive",
    "badge": "Marketing Lead",
    "year": "2021",
    "image": "",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
   {
    "id": 80,
    "name": "Abhinash Kumar yadav",
    "role": "GDG Lead 2021",
    "badge": "",
    "year": "2020",
    "image": "",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  },
     {
    "id": 81,
    "name": "Abhishek Kumar yadav",
    "role": "GDG Lead 2020",
    "badge": "",
    "year": "2019",
    "image": "",
    "social": {
      "linkedin": "",
      "twitter": "",
      "github": ""
    }
  }
]
;

export default function Team() {
  const {fileUrl}=useAuth();
  const [upload,setUpload]=useState(false);
  const [selectedYear,setSelectedYear]=useState("GDG Lead");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  function handleUpload() {
    setUpload(true);
  }
const filteredMembers = selectedYear.includes( 'GDG Lead')? teamData.filter(member=>member.role.includes("GDG Lead")) : teamData.filter(member => member.year === selectedYear);
console.log("fileUrll",fileUrl)

  return (
    <>
    <TeamSectionContainer id="team" className="animate-section">
      <SectionContent ref={sectionRef}>
        <SectionHeader>
          <SectionTitle>Our Team</SectionTitle>
          <SectionDescription>
            Meet the passionate individuals who make GDG MMMUT possible. Our team is dedicated to fostering a vibrant tech community and organizing impactful events.
          </SectionDescription>
        </SectionHeader>
        <FilterContainer>
            <FilterButton 
          active={selectedYear==="GDG Lead"} 
          onClick={() => setSelectedYear('GDG Lead')}
        >
          All Leads
        </FilterButton>
        <FilterButton 
          active={selectedYear === '2024'} 
          onClick={() => setSelectedYear('2024')}
        >
          2024
        </FilterButton>
        <FilterButton 
          active={selectedYear === '2023'} 
          onClick={() => setSelectedYear('2023')}
        >
          2023
        </FilterButton>
        <FilterButton 
          active={selectedYear === '2022'} 
          onClick={() => setSelectedYear('2022')}
        >
          2022
        </FilterButton>
        <FilterButton 
          active={selectedYear === '2021'} 
          onClick={() => setSelectedYear('2021')}
        >
          2021
        </FilterButton>
        </FilterContainer>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <TeamGrid>
            {filteredMembers?.map((member) => (
              <TeamMemberCard key={member.id} variants={itemVariants}>
                <MemberImage>
                  <img src={member?.image} alt={member.name} />
                  <button onClick={handleUpload}>Upload</button>
                </MemberImage>
                
                <MemberContent>
                  <RoleBadge $role={member.badge}>
                    {member.badge.charAt(0).toUpperCase() + member.badge.slice(1)}
                  </RoleBadge>
      
                  <MemberName>{member.name}</MemberName>
                  <MemberRole>{member.role}</MemberRole>
                  <SocialLinks>
                    <SocialLink 
                      href={member.social.linkedin}
                      target="_ blank"
                      whileHover={{ y: -3 }}
                      aria-label={`${member.name}'s LinkedIn`}
                  >
                      <i className="fab fa-linkedin"><FaLinkedin /></i>
                    </SocialLink>
                    <SocialLink 
                      href={member.social.twitter}
                      target="_blank"
                      whileHover={{ y: -3 }}
                      aria-label={`${member.name}'s Twitter`}
                    >
                      <i className="fab fa-twitter"><FaTwitter /></i>
                    </SocialLink>
                    <SocialLink 
                      href={member.social.github}
                      target="_blank"
                      whileHover={{ y: -3 }}
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <i className="fab fa-github"><FaGit /></i>
                    </SocialLink>
                  </SocialLinks>
                </MemberContent>
              </TeamMemberCard>
            ))}
          </TeamGrid>
        </motion.div>
      </SectionContent>
    </TeamSectionContainer>
      {upload &&<motion.div style={{
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(5px)",
  display: "flex",
  justifyContent:" center",
  alignItems: "center",
  zIndex: "1000"
}}
>
      <Uploadbox setUpload={setUpload} />
     </motion.div>}
    </>
  );
};