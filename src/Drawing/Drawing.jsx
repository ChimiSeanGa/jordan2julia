import React from 'react';
import DrawingLine from './DrawingLine.jsx';

export default function Drawing({ curve }) {
   return (
      <svg className="drawing">
         <DrawingLine curve={curve} />
      </svg>
   );
}
