import React, { useState, useEffect } from 'react';
import { areaData } from './data';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [activeArea, setActiveArea] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // تحميل الصور مسبقاً لمنع التأخير (Fixes the lag issue)
  useEffect(() => {
    areaData.forEach((area) => {
      const img = new Image();
      img.src = area.img;
    });
  }, []);

  const handleStart = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true);
      });
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  // متابعة حالة الفول سكرين لو المستخدم خرج بزر الرجوع
  useEffect(() => {
    const handler = () => {
      if (!document.fullscreenElement) setIsFullScreen(false);
    };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  return (
    <div className={`container ${isFullScreen ? 'force-view' : ''}`}>
      
      {!isFullScreen && (
        <button className="start-btn" onClick={handleStart}>
          عرض الخريطة كاملة ⛶
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
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
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