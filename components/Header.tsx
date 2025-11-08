
import React from 'react';
import { LinkedInIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex justify-center items-center gap-3">
        <LinkedInIcon />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
          Viral Post Generator
        </h1>
      </div>
      <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
        Craft engaging LinkedIn posts with the power of AI. Turn your ideas into shareable content that drives engagement.
      </p>
    </header>
  );
};

export default Header;
