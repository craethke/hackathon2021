import Konva from 'konva';
export interface Position {
    x: number;
    y: number;
    radius: number;
}
export interface TrackerData {
    currentPosition?: Position;
    positionHistory?: Position[];
}
/**
 * A layer which display an overlays to track the movement entities in realtime.
 */
export declare class TrackerLayer extends Konva.Layer {
    currentPositionMarker?: Konva.Circle;
    readonly positionHistoryMarkers: Konva.Circle[];
    constructor(width: number, height: number);
    /** Callback when a tracker position is updated. */
    onUpdate(trackerData: TrackerData): void;
    private updateCurrentPosition;
    private updatePositionHistory;
}
//# sourceMappingURL=trackerLayer.d.ts.map