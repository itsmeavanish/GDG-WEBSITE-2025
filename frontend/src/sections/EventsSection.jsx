import React, { useState } from 'react';
import NextEventCountdown from '../components/events/NextEventCountdown';
import RegisterModal from '../components/RegisterForm';
import styled from 'styled-components';
import { QrCode } from 'lucide-react';

const QR = styled(QrCode)`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 auto;
`;

const Verify = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  padding: 1.5rem 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;

  label {
    color: ${({ theme }) => theme.colors.text.tertiary};
    font-weight: 600;
  }

  input {
    height: 48px;
    padding: 0.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  button {
    width: 100%;
    background-color: #3b82f6;
    color: white;
    font-weight: 600;
    font-size: 1rem;
    padding: 0.75rem;
    border-radius: 6px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #2563eb;
    }
  }
`;

const EventsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  padding: 2rem;
  border-radius: 8px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 6rem;
    gap: 2rem;
  }
  @media(max-width:768px){
    gap: 2rem;
  }
`;

const ExploreButton = styled.button`
  display: block;
  margin: 2rem auto; /* Center the button horizontally */
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2563eb;
  }

  @media (min-width: 768px) {
    margin-top: 3rem;
  }
`;

const eventsData = [
  {
    id: '1',
    title: 'Google I/O Extended MMMUT 2025',
    description:
      "Join us for Google I/O Extended, where we'll watch and discuss the keynote and sessions from Google I/O 2025. Network with fellow developers and learn about the latest Google technologies.",
    date: '2025-06-15',
    time: '10:00 AM - 5:00 PM',
    location: 'MMMUT Campus, Gorakhpur',
    image:
      'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    status: 'upcoming',
    tags: ['Conference', 'Google I/O', 'Android', 'Web'],
    attendees: 250,
    speakers: [
      {
        name: 'Dr. Aisha Kumar',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        title: 'AI Research Lead, Google',
      },
      {
        name: 'Raj Patel',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        title: 'Senior Android Developer',
      },
    ],
  },
];

export default function EventsSection() {
  const [close, setClose] = useState(true);
  const [verify, setVerify] = useState(false);
  const nextEvent = eventsData.find((event) => event.status === 'upcoming');

  function handleClose() {
    setClose(true);
  }

  return (
    <>
      <EventsWrapper>
        <Verify>
          <h3 style={{ fontFamily: 'Google Sans, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#3b82f6' }}>
            Certificate Verification
          </h3>
          <QR size={70} />
          <label htmlFor="serial">Serial Number</label>
          <input id="serial" type="text" placeholder="e.g., ABC123456789" />
          <button onClick={() => setVerify(true)}>Verify Now</button>
        </Verify>
        <NextEventCountdown event={nextEvent} setClose={setClose} />
      </EventsWrapper>

      <ExploreButton onClick={() => (window.location.href = '/events')}>Explore More</ExploreButton>

      {!close && <RegisterModal event={nextEvent} onClose={handleClose} />}
    </>
  );
}
