import React from 'react';

export default function DrawingLine({ line }) {
   const pathData = "M " + line.map(p => {
      return `${p.get('x')} ${p.get('y')}`;
   }).join(" L ");

   return <path className="path" d={pathData} />;
}
