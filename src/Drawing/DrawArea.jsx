import React from 'react';
import Drawing from './Drawing.jsx';
import Immutable from 'immutable';

export default class DrawArea extends React.Component {
   constructor() {
      super();
      this.state = {
         isDrawing: false,
         lines: Immutable.List(),
      };

      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.handleMouseDown = this.handleMouseDown.bind(this);
      this.handleMouseUp = this.handleMouseUp.bind(this);
   }

   handleMouseMove(mouseEvent) {
      if (!this.state.isDrawing) {
         return;
      }

      const point = this.relativeCoordinatesForEvent(mouseEvent);

      this.setState(prevState => {
         return {
            lines: prevState.lines.updateIn([prevState.lines.size - 1], line => line.push(point)),
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
            lines: prevState.lines.push(Immutable.List([point])),
            isDrawing: true,
         }
      });
   }

   handleMouseUp() {
      this.setState({ isDrawing: false });
   }

   relativeCoordinatesForEvent(mouseEvent) {
      const boundingRect = this.refs.drawArea.getBoundingClientRect();
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
            ref="drawArea"
            onMouseDown={this.handleMouseDown}
            onMouseMove={this.handleMouseMove}
         >
            <Drawing lines={this.state.lines} />
         </div>
      );
   }
}