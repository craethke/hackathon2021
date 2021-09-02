"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditableEquipmentLayer = void 0;
const equipmentLayer_1 = require("../view/equipmentLayer");
const equipment_1 = require("../view/equipment");
const editableStackingArea_1 = require("./editableStackingArea");
const editableChute_1 = require("./editableChute");
const transformer_1 = require("./transformer");
const selector_1 = require("./selector");
const grid_1 = require("./grid");
/**
 * The layer where all the equipment will be added.
 */
class EditableEquipmentLayer extends equipmentLayer_1.EquipmentLayer {
    constructor(x) {
        super();
        this.x(x);
        this.transformer = new transformer_1.Transformer();
        this.add(this.transformer);
        this.selector = new selector_1.Selector(this);
        this.add(this.selector);
        this.editor = document.createElement('textarea');
        this.setUpEditor();
        this.setUpMouseEvents();
    }
    addEquipment(equipmentType, posX, posY, labelText, width, height) {
        const equipment = super.addEquipment(equipmentType, posX, posY, labelText, width, height);
        this.addLabelEditingToEquipment(equipment);
        return equipment;
    }
    getGroup(node) {
        const parent = node.getParent();
        if (parent !== null && parent instanceof equipment_1.Equipment) {
            return parent;
        }
        else {
            return node;
        }
    }
    updateLabel() {
        if (document.body.contains(this.editor) &&
            this.currentLabel !== undefined) {
            this.currentLabel.text(this.editor.value);
            this.currentLabel.y(this.getGroup(this.currentLabel).height() / 2 -
                this.currentLabel.height() / 2);
            document.body.removeChild(this.editor);
            this.currentLabel = undefined;
        }
    }
    addLabelEditingToEquipment(equipment) {
        const label = equipment.label;
        const editor = this.editor;
        label.on('dblclick', () => {
            this.currentLabel = label;
            const labelPosition = label.getAbsolutePosition();
            const container = this.getStage().container();
            labelPosition.x += container.offsetLeft;
            labelPosition.y += container.offsetTop;
            editor.value = label.text();
            editor.style.left = labelPosition.x + 'px';
            editor.style.top = labelPosition.y + 'px';
            editor.style.width = label.width() * this.scaleX() - 4 + 'px';
            editor.style.height = label.height() + 'px';
            document.body.appendChild(editor);
            editor.focus();
        });
    }
    addChute(posX, posY, labelText, width, height) {
        return new editableChute_1.EditableChute(posX, posY, labelText, width, height);
    }
    addStackingArea(posX, posY, labelText) {
        return new editableStackingArea_1.EditableStackingArea(posX, posY, labelText);
    }
    setUpMouseEvents() {
        this.on('click', (e) => {
            const equipment = this.getGroup(e.target);
            if (!(equipment instanceof equipment_1.Equipment) ||
                this.transformer.getSelected().some((element) => element === equipment)) {
                return;
            }
            equipment.moveToTop();
            this.transformer.makeSelected([equipment]);
        });
        this.on('dragmove', (e) => {
            if (!(e.target instanceof equipment_1.Equipment)) {
                return;
            }
            e.target.x(grid_1.snapToGrid(e.target.x()));
            e.target.y(grid_1.snapToGrid(e.target.y()));
        });
    }
    setUpEditor() {
        const style = this.editor.style;
        style.position = 'absolute';
        style.fontFamily = equipment_1.EQUIPMENT_TEXT_FONT;
        style.fontSize = equipment_1.EQUIPMENT_TEXT_SIZE + 'px';
        this.editor.addEventListener('keydown', (e) => {
            if (e.code === 'Enter') {
                this.updateLabel();
            }
        });
    }
}
exports.EditableEquipmentLayer = EditableEquipmentLayer;
