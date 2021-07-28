import React from 'react';
import Drawing from './Drawing.jsx';
import Immutable from 'immutable';
import { isSimple } from '../Util/util.js';

export default class DrawArea extends React.Component {
   constructor() {
      super();
      this.state = {
         isDrawing: false,
         curve: Immutable.List(),
      };

      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.handleMouseDown = this.handleMouseDown.bind(this);
      this.handleMouseUp = this.handleMouseUp.bind(this);

      this.drawAreaRef = React.createRef();
   }

   handleMouseMove(mouseEvent) {
      if (!this.state.isDrawing) {
         return;
      }

      const point = this.relativeCoordinatesForEvent(mouseEvent);
      const prevPoint = this.state.curve.get(this.state.curve.size - 1);

      // Check if mouse did not move
      if (point.get('x') === prevPoint.get('x') && point.get('y') === prevPoint.get('y')) {
         return;
      }

      this.setState(prevState => {
         return {
            curve: prevState.curve.push(point),
         };
      });
   }

   handleMouseDown(mouseEvent) {
      if (mouseEvent.button !== 0) {
         return;
      }

      const point = this.relativeCoordinatesForEvent(mouseEvent);

      this.setState(prevState => {
         return {
            curve: Immutable.List([point]),
            isDrawing: true,
         }
      });
   }

   handleMouseUp(mouseEvent) {
      this.setState(prevState => {
         const initPoint = prevState.curve.get(0);
         return {
            curve: prevState.curve.push(initPoint),
            isDrawing: false,
         }
      });

      if (isSimple(this.state.curve)) {
         console.log("Curve is simple");
      }
      else {
         console.log("Curve is not simple");
      }
   }

   relativeCoordinatesForEvent(mouseEvent) {
      const boundingRect = this.drawAreaRef.current.getBoundingClientRect();
      return new Immutable.Map({
         x: mouseEvent.clientX - boundingRect.left,
         y: mouseEvent.clientY - boundingRect.top,
      });
   }

   componentDidMount() {
      document.addEventListener("mouseup", this.handleMouseUp);
   }

   componentWillUnmount() {
      document.removeEventListener("mouseup", this.handleMouseUp);
   }

   render() {
      return (
         <div
            className="drawArea"
            ref={this.drawAreaRef}
            onMouseDown={this.handleMouseDown}
            onMouseMove={this.handleMouseMove}
         >
            <Drawing curve={this.state.curve} />
         </div>
      );
   }
}