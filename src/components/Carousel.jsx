import React, { useState } from 'react';
import {
  GrNext as NextIcon,
  GrPrevious as PreviousIcon
} from 'react-icons/gr';

const Carousel = ({ items }) => {
  const [currentItem, setCurrentItem] = useState(0);

  const nextSlide = () => {
    if (currentItem < items.length - 1) {
      setCurrentItem((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentItem > 0) {
      setCurrentItem((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-1/2 h-1/2 rounded-lg overflow-hidden">
        <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentItem * 100}%)` }}>
          {items.map((item) => (
            <a key={item.id} href={item.link} className="w-full flex-shrink-0">
              <img src={item.image} alt={`Slide ${item.name}`} className="w-full h-full object-cover" />
            </a>
          ))}
        </div>

        <button onClick={prevSlide} disabled={currentItem === 0} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg opacity-75 hover:opacity-100 disabled:opacity-25">
          <PreviousIcon className="w-6 h-6" />
        </button>
        <button onClick={nextSlide} disabled={currentItem === items.length - 1} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg opacity-75 hover:opacity-100 disabled:opacity-25">
          <NextIcon className="w-6 h-6" />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {items.map((_, index) => (
            <button key={index} onClick={() => setCurrentItem(index)} className={`w-3 h-3 rounded-full ${currentItem === index ? 'bg-blue-500 w-9' : 'bg-gray-300'}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
