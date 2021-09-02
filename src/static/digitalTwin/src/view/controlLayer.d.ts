import Konva from 'konva';
import { EquipmentLayer } from './equipmentLayer';
/**
 * A control layer for the view-only map.
 */
export declare class ControlLayer extends Konva.Layer {
    readonly stageDimensions: {
        width: number;
        height: number;
    };
    constructor(width: number, height: number);
    calculateFitAttributes(layer: EquipmentLayer, horizontalOffset?: number): {
        position: {
            x: number;
            y: number;
        };
        scale: {
            x: number;
            y: number;
        };
    };
}
//# sourceMappingURL=controlLayer.d.ts.map