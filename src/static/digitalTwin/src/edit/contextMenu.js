"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextMenu = void 0;
const grid_1 = require("./grid");
/**
 * A context menu which will allow options such as copy, cut, paste, and delete.
 */
class ContextMenu {
    constructor(stage) {
        this.clipboardPosition = { x: 0, y: 0 };
        this.menu = document.getElementById('menu');
        this.stage = stage;
        this.layer = this.stage.equipmentLayer;
        this.transformer = this.layer.transformer;
        this.clipboard = [];
        this.setUpMenu();
        this.addButtonListeners();
    }
    setUpMenu() {
        this.stage.on('contextmenu', (e) => {
            if (this.stage.previewingWorkstations ||
                e.target.getLayer() === this.stage.controlLayer) {
                this.menu.style.display = 'none';
                return;
            }
            e.evt.preventDefault();
            document.getElementById('paste').disabled =
                this.clipboard.length === 0;
            const disabled = e.target.getLayer() !== this.layer;
            document.getElementById('copy').disabled =
                disabled;
            document.getElementById('cut').disabled = disabled;
            document.getElementById('delete').disabled =
                disabled;
            this.menu.style.top = e.evt.pageY + 1 + 'px';
            this.menu.style.left = e.evt.pageX + 1 + 'px';
            this.menu.style.display = 'initial';
        });
        window.addEventListener('click', () => {
            this.menu.style.display = 'none';
        });
    }
    addButtonListeners() {
        document.getElementById('copy').addEventListener('click', () => {
            this.addSelectedToClipboard();
        });
        document.getElementById('cut').addEventListener('click', () => {
            this.addSelectedToClipboard();
            this.deleteSelected();
        });
        document.getElementById('paste').addEventListener('click', () => {
            const position = this.layer.getRelativePointerPosition();
            this.pasteClipboard(position.x, position.y);
        });
        document.getElementById('delete').addEventListener('click', () => {
            this.deleteSelected();
        });
    }
    addSelectedToClipboard() {
        const selected = this.transformer.getSelected();
        this.clipboard = selected.map((equipment) => equipment.getCopy());
        this.clipboardPosition = {
            x: (this.layer.transformer.x() - this.layer.x()) / this.layer.scaleX(),
            y: (this.layer.transformer.y() - this.layer.y()) / this.layer.scaleY(),
        };
    }
    deleteSelected() {
        const selected = this.transformer.getSelected();
        selected.forEach((element) => {
            const index = this.layer.equipment.indexOf(element);
            if (index !== -1) {
                this.layer.equipment.splice(index, 1);
            }
            element.remove();
            element.destroy();
        });
        this.transformer.clearSelections();
    }
    pasteClipboard(x, y) {
        const pastedEquipment = [];
        this.clipboard.forEach((equipment) => {
            const copy = equipment.getCopy();
            copy.position({
                x: grid_1.snapToGrid(x + equipment.x() - this.clipboardPosition.x),
                y: grid_1.snapToGrid(y + equipment.y() - this.clipboardPosition.y),
            });
            this.layer.addLabelEditingToEquipment(copy);
            this.layer.equipment.push(copy);
            this.layer.add(copy);
            pastedEquipment.push(copy);
        });
        this.transformer.makeSelected(pastedEquipment);
    }
}
exports.ContextMenu = ContextMenu;
