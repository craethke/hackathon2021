"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoBar = void 0;
const konva_1 = __importDefault(require("konva"));
const sidebar_1 = require("../edit/sidebar");
const INFO_BAR_WIDTH = sidebar_1.SIDEBAR_WIDTH;
const INFO_BAR_COLOR = sidebar_1.SIDEBAR_COLOR;
const INFO_BAR_OUTLINE_COLOR = sidebar_1.SIDEBAR_OUTLINE_COLOR;
const INFO_BAR_OUTLINE_WIDTH = sidebar_1.SIDEBAR_OUTLINE_WIDTH;
const INFO_BAR_TEXT_FONT = 'Arial';
const INFO_BAR_TITLE_TEXT_SIZE = 18;
const INFO_BAR_TEXT_SIZE = 14;
const INFO_BAR_TEXT_COLOR = 'black';
const INFO_BAR_TEXT_PADDING = 10;
/**
 * A bar that will appear on the right side showing information when a workstation is clicked.
 */
class InfoBar extends konva_1.default.Group {
    constructor(stageWidth, stageHeight) {
        super({
            width: INFO_BAR_WIDTH,
            height: stageHeight,
            x: stageWidth - INFO_BAR_WIDTH,
            visible: false,
        });
        this.add(new konva_1.default.Rect({
            width: INFO_BAR_WIDTH,
            height: stageHeight,
            fill: INFO_BAR_COLOR,
            stroke: INFO_BAR_OUTLINE_COLOR,
            strokeWidth: INFO_BAR_OUTLINE_WIDTH,
        }));
        this.title = new konva_1.default.Text({
            width: INFO_BAR_WIDTH,
            fontFamily: INFO_BAR_TEXT_FONT,
            fontSize: INFO_BAR_TITLE_TEXT_SIZE,
            fill: INFO_BAR_TEXT_COLOR,
            padding: INFO_BAR_TEXT_PADDING,
        });
        this.add(this.title);
        this.info = new konva_1.default.Text({
            y: this.title.height(),
            width: INFO_BAR_WIDTH,
            fontFamily: INFO_BAR_TEXT_FONT,
            fontSize: INFO_BAR_TEXT_SIZE,
            fill: INFO_BAR_TEXT_COLOR,
            padding: INFO_BAR_TEXT_PADDING,
        });
        this.add(this.info);
    }
    updateInfo(workstation) {
        this.title.text(workstation.workstationName);
        let equipmentText = 'Equipment: \n  ';
        for (let i = 0; i < workstation.equipment.length; i++) {
            equipmentText += workstation.equipment[i].label.text() + '\n  ';
        }
        this.info.text(equipmentText);
    }
}
exports.InfoBar = InfoBar;
