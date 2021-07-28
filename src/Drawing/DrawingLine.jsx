import React from 'react';

export default function DrawingLine({ curve }) {
   let pathData = "M " + curve.map(p => {
      return `${p.get('x')} ${p.get('y')}`;
   }).join(" L ");

   if (pathData === "M ") {
      pathData = "";
   }

   return <path className="path" d={pathData} />;
}
