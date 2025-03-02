import React from 'react';
import { HeartsAnimation } from './components/HeartsAnimation';
import { BirthdayCard } from './components/BirthdayCard';
import AudioComponent from './components/Audio';


const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <HeartsAnimation />
      <BirthdayCard />
      <AudioComponent />
    </div>
  );
};

export default App;