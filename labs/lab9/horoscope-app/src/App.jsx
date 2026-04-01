import "./App.css";

import { useState } from "react";

import ZodiacGrid from "./components/ZodiacGrid";
import HoroscopeDetail from "./components/HoroscopeDetail";
import Header from "./components/header"; 
import Footer from "./components/footer";



const zodiacSigns = [
  {
    id: 1,
    name: "Aries",
    range: "Mar 21 - Apr 19",
    image: "/img/aries.png",
    mood: 4,
    success: 3,
    love: 5,
    horoscope: "Today is a great day to start something new. Trust your instincts and take bold steps forward."
  },
  {
    id: 2,
    name: "Taurus",
    range: "Apr 20 - May 20",
    image: "/img/taurus.png",
    mood: 3,
    success: 4,
    love: 2,
    horoscope: "Patience will bring rewards. Focus on your goals and avoid unnecessary distractions."
  },
  {
    id: 3,
    name: "Gemini",
    range: "May 21 - Jun 20",
    image: "/img/gemini.png",
    mood: 5,
    success: 2,
    love: 4,
    horoscope: "Communication is key today. Reach out to friends and share your ideas."
  },
  {
    id: 4,
    name: "Cancer",
    range: "Jun 21 - Jul 22",
    image: "/img/cancer.png",
    mood: 2,
    success: 5,
    love: 3,
    horoscope: "Take care of your emotional well-being. Home and family bring comfort."
  },
  {
    id: 5,
    name: "Leo",
    range: "Jul 23 - Aug 22",
    image: "/img/leo.png",
    mood: 5,
    success: 4,
    love: 4,
    horoscope: "Your confidence shines. Take the lead and inspire those around you."
  },
  {
    id: 6,
    name: "Virgo",
    range: "Aug 23 - Sep 22",
    image: "/img/virgo.png",
    mood: 3,
    success: 5,
    love: 2,
    horoscope: "Attention to detail will pay off. Organize your tasks for best results."
  },
  {
    id: 7,
    name: "Libra",
    range: "Sep 23 - Oct 22",
    image: "/img/libra.png",
    mood: 4,
    success: 3,
    love: 5,
    horoscope: "Seek balance in all things. Relationships bring joy and harmony."
  },
  {
    id: 8,
    name: "Scorpio",
    range: "Oct 23 - Nov 21",
    image: "/img/scorpio.png",
    mood: 2,
    success: 4,
    love: 3,
    horoscope: "Trust your intuition. Secrets may come to light, so stay alert."
  },
  {
    id: 9,
    name: "Sagittarius",
    range: "Nov 22 - Dec 21",
    image: "/img/sagittarius.png",
    mood: 5,
    success: 2,
    love: 4,
    horoscope: "Adventure awaits. Embrace new experiences and keep an open mind."
  },
  {
    id: 10,
    name: "Capricorn",
    range: "Dec 22 - Jan 19",
    image: "/img/capricorn.png",
    mood: 3,
    success: 5,
    love: 2,
    horoscope: "Hard work brings results. Stay focused on your ambitions."
  },
  {
    id: 11,
    name: "Aquarius",
    range: "Jan 20 - Feb 18",
    image: "/img/aquarius.png",
    mood: 4,
    success: 3,
    love: 5,
    horoscope: "Innovation is your strength. Share your unique ideas with others."
  },
  {
    id: 12,
    name: "Pisces",
    range: "Feb 19 - Mar 20",
    image: "/img/pisces.png",
    mood: 2,
    success: 4,
    love: 3,
    horoscope: "Let your creativity flow. Artistic pursuits bring satisfaction."
  }
];

function App() {
  const [selectedSign, setSelectedSign] = useState(null);

  return (
    <>
      <Header/>

      <main className="content-box">
        {!selectedSign ? (
          <>
            <h1>Choose Your Zodiac Sign</h1>
            <ZodiacGrid zodiacSigns={zodiacSigns} onSelectSign={setSelectedSign} />
          </>
        ) : (
          <HoroscopeDetail sign={selectedSign} />
        )}
      </main>

      <Footer/>
    </>
  );
}

export default App;