import React, { useState, useEffect } from 'react';
import { areaData } from './data';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [activeArea, setActiveArea] = useState(null);
  const [isFS, setIsFS] = useState(false);

  // دالة تفعيل ملء الشاشة الحقيقي
  const enterFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    }
    setIsFS(true);
  };

  // متابعة الخروج من Fullscreen (عبر زر الرجوع مثلاً)
  useEffect(() => {
    const checkFS = () => {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        setIsFS(false);
      }
    };
    document.addEventListener('fullscreenchange', checkFS);
    document.addEventListener('webkitfullscreenchange', checkFS);
    return () => {
      document.removeEventListener('fullscreenchange', checkFS);
      document.removeEventListener('webkitfullscreenchange', checkFS);
    };
  }, []);

  return (
    <div className={`app-container ${isFS ? 'fullscreen-mode' : ''}`}>
      
      {!isFS && (
        <button className="fs-trigger" onClick={enterFullScreen}>
          اضغط هنا لتفعيل الخريطة ⛶
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
              className="modal-card"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-x" onClick={() => setActiveArea(null)}>&times;</button>
              <img src={activeArea.img} className="modal-content-img" alt="Content" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;