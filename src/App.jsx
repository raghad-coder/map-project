import React, { useState } from 'react';
import { areaData } from './data';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [activeArea, setActiveArea] = useState(null);

  // --- دالة ملء الشاشة ---
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Error: ${e.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="container">
      {/* 1. زر ملء الشاشة يوضع هنا ليكون فوق كل شيء */}
      <button className="fullscreen-btn" onClick={toggleFullScreen}>
        ملء الشاشة ⛶
      </button>

      <div className="map-wrapper">
        <img src="/map.png" alt="Festival Map" className="main-map" />
        
        {areaData.map((item) => (
          <div 
            key={item.id} 
            className="marker" 
            style={{ top: item.top, left: item.left }}
            onClick={() => setActiveArea(item)}
          >
            {item.id}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {activeArea && (
          <motion.div 
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveArea(null)}
          >
            <motion.div 
              key={activeArea.id} 
              className={`modal ${activeArea.id === 1 ? 'special-case' : ''}`}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={() => setActiveArea(null)}>
                &times;
              </button>
              <img src={activeArea.img} alt={activeArea.id} className="modal-img" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;