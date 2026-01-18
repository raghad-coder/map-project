import React, { useState } from 'react';
import { areaData } from './data';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [activeArea, setActiveArea] = useState(null);

  return (
    <div className="container">
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
          <motion.div 
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveArea(null)}
          >
            <motion.div 
              className="modal"
              /* هنا نطبق لون الخلفية الخاص بكل رقم */
              style={{ backgroundColor: activeArea.color }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* زر الإغلاق X في الزاوية */}
              <button className="close-btn" onClick={() => setActiveArea(null)}>
                ×
              </button>

              {/* الصورة الملونة التي تحتوي على اسم المنطقة */}
              <img 
                src={activeArea.img} 
                alt={activeArea.title} 
                className="modal-img" 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

