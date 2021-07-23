import React from 'react';
import DrawingLine from './DrawingLine.jsx';

export default function Drawing({ lines }) {
   return (
      <svg className="drawing">
         {lines.map((line, index) => (
            <DrawingLine key={index} line={line} />
         ))}
      </svg>
   );
}
