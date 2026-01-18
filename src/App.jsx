import React, { useState } from 'react';
import { areaData } from './data'; // تأكد من وجود ملف data.js في مجلد src
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  // حالة لتخزين المنطقة المفتوحة حالياً
  const [activeArea, setActiveArea] = useState(null);

  return (
    <div className="container">
      {/* حاوية الخريطة الأساسية */}
      <div className="map-wrapper">
        <img src="/map.png" alt="Festival Map" className="main-map" />
        
        {/* رسم النقاط (Markers) التسعة فوق الخريطة */}
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

      {/* شاشة البوب أب (Modal) مع تأثيرات الحركة */}
      <AnimatePresence>
        {activeArea && (
          <motion.div 
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveArea(null)} // إغلاق عند الضغط على الخلفية
          >
            <motion.div 
              /* المفتاح (key) ضروري جداً لمنع تكرار الصور عند التنقل */
              key={activeArea.id} 
              
              /* كلاس مخصص للمنطقة 4 إذا كانت أكبر من الشاشة */
              className={`modal ${activeArea.id === 1 ? 'large-modal' : ''}`}
              
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // منع الإغلاق عند الضغط داخل البطاقة
            >
              {/* زر الإغلاق X: أحمر، دائري، سميك، وفي المنتصف */}
              <button className="close-btn" onClick={() => setActiveArea(null)}>
                &times;
              </button>

              {/* الصورة الملونة التي تحتوي على محتوى المنطقة */}
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