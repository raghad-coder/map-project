import React, { useState } from 'react';
import { areaData } from './data';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [activeArea, setActiveArea] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleStartExperience = () => {
    // 1. تفعيل ملء الشاشة
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true);
      }).catch((e) => {
        console.error("Fullscreen error:", e);
      });
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  // مراقبة خروج المستخدم من الفول سكرين بزر الرجوع في الموبايل
  document.onfullscreenchange = () => {
    if (!document.fullscreenElement) setIsFullScreen(false);
  };

  return (
    // الكلاس "force-view" سيتم تفعيله فقط عند الضغط على الزر
    <div className={`container ${isFullScreen ? 'force-view' : ''}`}>
      
      {!isFullScreen && (
        <button className="start-btn" onClick={handleStartExperience}>
          عرض الخريطة بالكامل ⛶
        </button>
      )}

      <div className="map-wrapper">
        <img src="/map.png" alt="Map" className="main-map" />
        
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
          <motion.div className="overlay" onClick={() => setActiveArea(null)}>
            <motion.div 
              className="modal"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={() => setActiveArea(null)}>&times;</button>
              <img src={activeArea.img} className="modal-img" alt="Area" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;