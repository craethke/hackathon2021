import Konva from 'konva';
import { Workstation } from './workstation';
/**
 * A bar that will appear on the right side showing information when a workstation is clicked.
 */
export declare class InfoBar extends Konva.Group {
    readonly title: Konva.Text;
    readonly info: Konva.Text;
    constructor(stageWidth: number, stageHeight: number);
    updateInfo(workstation: Workstation): void;
}
//# sourceMappingURL=infoBar.d.ts.map