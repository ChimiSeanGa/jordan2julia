// This is where I imagine the math functionality can go

// Checks if two lines intersect
function isIntersect(p1, p2, p3, p4) {
   const x1 = p1.get('x');
   const y1 = p1.get('y');

   const x2 = p2.get('x');
   const y2 = p2.get('y');

   const x3 = p3.get('x');
   const y3 = p3.get('y');

   const x4 = p4.get('x');
   const y4 = p4.get('y');

   if ((Math.max(x1, x2) < Math.min(x3, x4)) ||
      (Math.max(x3, x4) < Math.min(x1, x2)) ||
      (Math.max(y1, y2) < Math.min(y3, y4)) ||
      (Math.max(y3, y4) < Math.min(y1, y2))) {
      return false;
   }

   const a1 = (y1 - y2) / (x1 - x2);
   const a2 = (y3 - y4) / (x3 - x4);
   const b1 = y1 - a1 * x1;
   const b2 = y3 - a2 * x3;

   const epsilon = 0.0000000001;
   if (Math.abs(a1 - a2) < epsilon) {
      return false; // parallel lines
   }

   const xa = (b2 - b1) / (a1 - a2);

   if ((xa < Math.max(Math.min(x1, x2), Math.min(x3, x4))) ||
      (xa > Math.min(Math.max(x1, x2), Math.max(x3, x4)))) {
      return false; // intersection is out of bound
   }

   return true;
}

// Checks if collection of points forms a simple curve
export function isSimple(curve, detail=5) {
   for (let i = 0; i < curve.size - detail; i++) {
      for (let j = i + detail + 1; j < curve.size - detail; j++) {
         if (i === 0 && j + detail + 1 === curve.size) {
            continue
         }
         const p1 = curve.get(i);
         const p2 = curve.get(i + detail);
         const p3 = curve.get(j);
         const p4 = curve.get(j + detail);

         if (isIntersect(p1, p2, p3, p4)) {
            return false;
         }
      }
   }

   return true;
}