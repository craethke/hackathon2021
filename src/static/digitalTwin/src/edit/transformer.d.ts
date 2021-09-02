import Konva from 'konva';
import { Equipment } from '../view/equipment';
/**
 * A layer that has the transformer, which has the ability to select and resize equipment.
 */
export declare class Transformer extends Konva.Transformer {
    constructor();
    getSelected(): Array<Equipment>;
    makeSelected(equipment: Array<Equipment>): void;
    clearSelections(): void;
    private enableAnchors;
}
//# sourceMappingURL=transformer.d.ts.map