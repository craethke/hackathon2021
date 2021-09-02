import Konva from 'konva';
export declare const GRID_RATIO_TO_STAGE = 1.5;
/**
 * A grid background that aids in aligning equipment on the map.
 */
export declare class Grid extends Konva.Layer {
    readonly totalWidth: number;
    readonly totalHeight: number;
    constructor(stageWidth: number, stageHeight: number);
}
export declare function snapToGrid(current: number, scale?: number, offset?: number): number;
export declare function getOffset(position: number, scale: number): number;
//# sourceMappingURL=grid.d.ts.map