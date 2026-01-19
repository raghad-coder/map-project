import React, { useState, useEffect } from 'react';
import { areaData } from './data';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [activeArea, setActiveArea] = useState(null);
  const [isFS, setIsFS] = useState(false);

  // 1. تحميل الصور مسبقاً لمنع التأخير عند فتح المودال
  useEffect(() => {
    areaData.forEach((area) => {
      const img = new Image();
      img.src = area.img;
    });
  }, []);

  // 2. دالة ملء الشاشة والدوران
  const handleStart = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) elem.requestFullscreen();
      else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen(); // Safari
      setIsFS(true);
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      setIsFS(false);
    }
  };

  // متابعة حالة الشاشة (لو المستخدم خرج بالزر الفعلي للموبايل)
  useEffect(() => {
    const fsChange = () => {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) setIsFS(false);
    };
    document.addEventListener('fullscreenchange', fsChange);
    document.addEventListener('webkitfullscreenchange', fsChange);
    return () => {
      document.removeEventListener('fullscreenchange', fsChange);
      document.removeEventListener('webkitfullscreenchange', fsChange);
    };
  }, []);

  return (
    <div className="app-holder"> {/* حذفنا الشرط الخاص بـ rotated-mode */}
    <div className="map-box">
      <img src="/map.png" alt="Map" className="map-img" />
      {areaData.map((item) => (
        <div 
          key={item.id} 
          className="map-marker" 
          style={{ top: item.top, left: item.left }}
          onClick={() => setActiveArea(item)}
        >
          {item.id}
        </div>
      ))}
    </div>

      <AnimatePresence>
        {activeArea && (
          <motion.div className="modal-overlay" onClick={() => setActiveArea(null)}>
            <motion.div 
              className="modal-body"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="btn-close" onClick={() => setActiveArea(null)}>&times;</button>
              <img src={activeArea.img} className="content-img" alt="Area info" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;