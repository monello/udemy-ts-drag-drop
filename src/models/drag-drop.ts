// Drag & Drop Interfaces
export interface Draggable {
    // DragEvent is a built-in type in TS
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
    // used to confirm that the element you are dragging over is indeed a drag-target
    dragOverHandler(event: DragEvent): void

    // reacts to the actual "drop" event (and for example update project state)
    dropHandler(event: DragEvent): void;

    // potentially be used to do things like give a visual confirmation that the drop was successful-
    dragLeaveHandler(event: DragEvent): void;
}
