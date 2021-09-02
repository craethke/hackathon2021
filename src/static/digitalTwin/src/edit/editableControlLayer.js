"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditableControlLayer = void 0;
const konva_1 = __importDefault(require("konva"));
const controlLayer_1 = require("../view/controlLayer");
const sidebar_1 = require("./sidebar");
const grid_1 = require("./grid");
const SCROLLBAR_SIZE = 10;
const SCROLLBAR_PADDING = 15;
const SCROLLBAR_COLOR = 'silver';
const SCROLLBAR_OPACITY = 0.5;
const SCROLLBAR_HOVER_OPACITY = 0.8;
const SCROLLBAR_ROUNDED_BORDER = 5;
const SCROLL_SENSITIVITY = 2;
const ZOOM_SCALE_MULTIPLE = 1.1;
/**
 * A layer that contains the controls, such as the sidebar and the scrollbars.
 */
class EditableControlLayer extends controlLayer_1.ControlLayer {
    constructor(width, height, layer, grid) {
        super(width, height);
        this.equipmentLayer = layer;
        this.grid = grid;
        this.sidebar = new sidebar_1.Sidebar(height, layer);
        this.add(this.sidebar);
        this.horizontalBar = new konva_1.default.Rect({
            width: (this.stageDimensions.width - sidebar_1.SIDEBAR_WIDTH) / grid_1.GRID_RATIO_TO_STAGE -
                SCROLLBAR_PADDING * 2,
            height: SCROLLBAR_SIZE,
            fill: SCROLLBAR_COLOR,
            opacity: SCROLLBAR_OPACITY,
            cornerRadius: SCROLLBAR_ROUNDED_BORDER,
            x: this.stageDimensions.width / 4 +
                (3 * sidebar_1.SIDEBAR_WIDTH) / 4 +
                SCROLLBAR_PADDING,
            y: this.stageDimensions.height - SCROLLBAR_SIZE - SCROLLBAR_PADDING,
            draggable: true,
        });
        this.horizontalBar.x((this.stageDimensions.width -
            sidebar_1.SIDEBAR_WIDTH -
            this.horizontalBar.width()) /
            2 +
            sidebar_1.SIDEBAR_WIDTH);
        this.add(this.horizontalBar);
        this.verticalBar = new konva_1.default.Rect({
            width: SCROLLBAR_SIZE,
            height: this.stageDimensions.height / grid_1.GRID_RATIO_TO_STAGE -
                SCROLLBAR_PADDING * 2,
            fill: SCROLLBAR_COLOR,
            opacity: SCROLLBAR_OPACITY,
            cornerRadius: SCROLLBAR_ROUNDED_BORDER,
            x: this.stageDimensions.width - SCROLLBAR_SIZE - SCROLLBAR_PADDING,
            draggable: true,
        });
        this.verticalBar.y((this.stageDimensions.height - this.verticalBar.height()) / 2);
        this.add(this.verticalBar);
        this.totalScrollablePage = {
            width: this.stageDimensions.width -
                sidebar_1.SIDEBAR_WIDTH -
                SCROLLBAR_PADDING * 2 -
                this.horizontalBar.width(),
            height: this.stageDimensions.height -
                SCROLLBAR_PADDING * 2 -
                this.verticalBar.height(),
        };
        this.percentagePage = { width: 0.5, height: 0.5 };
        const initialLayerPosition = {
            x: (this.stageDimensions.width + sidebar_1.SIDEBAR_WIDTH - this.grid.totalWidth) / 2,
            y: (this.stageDimensions.height - this.grid.totalHeight) / 2,
        };
        this.equipmentLayer.position(initialLayerPosition);
        this.grid.position(initialLayerPosition);
        this.addInteractionToScrollbars();
        this.setUpZooming();
    }
    onWheel(wheeledAmount, previewingWorkstations) {
        if (this.sidebar.isDragging() || previewingWorkstations) {
            return;
        }
        this.equipmentLayer.updateLabel();
        this.verticalBar.y(Math.max(Math.min(this.verticalBar.y() + wheeledAmount * SCROLL_SENSITIVITY, this.stageDimensions.height -
            this.verticalBar.height() -
            SCROLLBAR_PADDING), SCROLLBAR_PADDING));
        this.scrollVertical();
    }
    zoomToFit() {
        this.equipmentLayer.transformer.clearSelections();
        const initialScale = this.equipmentLayer.scaleX();
        const attributes = this.calculateFitAttributes(this.equipmentLayer, sidebar_1.SIDEBAR_WIDTH);
        this.equipmentLayer.setAttrs(attributes);
        this.grid.setAttrs(attributes);
        this.changeBars(attributes.scale.x / initialScale);
        this.disableZoomOut(attributes.scale.x <= 1 / grid_1.GRID_RATIO_TO_STAGE);
    }
    addInteractionToScrollbars() {
        this.horizontalBar.dragBoundFunc((position) => {
            position.x = Math.max(Math.min(position.x, this.stageDimensions.width -
                this.horizontalBar.width() -
                SCROLLBAR_PADDING), SCROLLBAR_PADDING + sidebar_1.SIDEBAR_WIDTH);
            position.y =
                this.stageDimensions.height - SCROLLBAR_SIZE - SCROLLBAR_PADDING;
            return position;
        });
        this.verticalBar.dragBoundFunc((position) => {
            position.x =
                this.stageDimensions.width - SCROLLBAR_SIZE - SCROLLBAR_PADDING;
            position.y = Math.max(Math.min(position.y, this.stageDimensions.height -
                this.verticalBar.height() -
                SCROLLBAR_PADDING), SCROLLBAR_PADDING);
            return position;
        });
        this.horizontalBar.on('dragmove', () => {
            this.scrollHorizontal();
        });
        this.verticalBar.on('dragmove', () => {
            this.scrollVertical();
        });
        this.addHoverOpacity(this.horizontalBar);
        this.addHoverOpacity(this.verticalBar);
    }
    addHoverOpacity(bar) {
        bar.on('mouseover', () => {
            bar.opacity(SCROLLBAR_HOVER_OPACITY);
        });
        bar.on('mouseout', () => {
            bar.opacity(SCROLLBAR_OPACITY);
        });
    }
    setUpZooming() {
        document.getElementById('zoom-in').addEventListener('click', () => {
            this.zoomIn(ZOOM_SCALE_MULTIPLE);
        });
        document.getElementById('zoom-out').addEventListener('click', () => {
            this.zoomOut(1 / ZOOM_SCALE_MULTIPLE);
        });
        document.getElementById('zoom-to-fit').addEventListener('click', () => {
            this.zoomToFit();
        });
    }
    zoomIn(multiple) {
        if (this.equipmentLayer.scaleX() <= 1 / grid_1.GRID_RATIO_TO_STAGE) {
            this.disableZoomOut(false);
        }
        this.zoomLayers(multiple);
        this.changeBars(multiple);
    }
    zoomOut(multiple) {
        if (Math.floor(this.equipmentLayer.scaleX() * multiple * 1e3) / 1e3 <=
            1 / grid_1.GRID_RATIO_TO_STAGE) {
            this.disableZoomOut(true);
        }
        else {
            this.zoomLayers(multiple);
            this.changeBars(multiple);
        }
    }
    zoomLayers(multiple) {
        const center = {
            x: (this.stageDimensions.width + sidebar_1.SIDEBAR_WIDTH) / 2,
            y: this.stageDimensions.height / 2,
        };
        const newScale = this.equipmentLayer.scaleX() * multiple;
        this.equipmentLayer.scale({ x: newScale, y: newScale });
        this.grid.scale({ x: newScale, y: newScale });
        const newPosition = {
            x: this.equipmentLayer.x() * multiple + center.x * (1 - multiple),
            y: this.equipmentLayer.y() * multiple + center.y * (1 - multiple),
        };
        this.equipmentLayer.position(newPosition);
        this.grid.position(newPosition);
    }
    disableZoomOut(disable) {
        document.getElementById('zoom-out').disabled =
            disable;
        this.horizontalBar.visible(!disable);
        this.verticalBar.visible(!disable);
        if (disable) {
            this.horizontalBar.width(this.stageDimensions.width - sidebar_1.SIDEBAR_WIDTH - SCROLLBAR_PADDING * 2);
            this.verticalBar.height(this.stageDimensions.height - SCROLLBAR_PADDING * 2);
            const attributes = {
                x: sidebar_1.SIDEBAR_WIDTH,
                y: 0,
                scaleX: 1 / grid_1.GRID_RATIO_TO_STAGE,
                scaleY: 1 / grid_1.GRID_RATIO_TO_STAGE,
            };
            this.equipmentLayer.setAttrs(attributes);
            this.grid.setAttrs(attributes);
        }
    }
    changeBars(scaleMultiple) {
        this.percentagePage.width =
            (this.equipmentLayer.x() - sidebar_1.SIDEBAR_WIDTH) /
                (this.stageDimensions.width -
                    sidebar_1.SIDEBAR_WIDTH -
                    this.grid.totalWidth * this.equipmentLayer.scaleX());
        this.percentagePage.height =
            this.equipmentLayer.y() /
                (this.stageDimensions.height -
                    this.grid.totalHeight * this.equipmentLayer.scaleY());
        const initialWidth = this.horizontalBar.width();
        const initialHeight = this.verticalBar.height();
        const newWidth = initialWidth / scaleMultiple;
        const newHeight = initialHeight / scaleMultiple;
        this.horizontalBar.width(newWidth);
        this.verticalBar.height(newHeight);
        this.totalScrollablePage.width += initialWidth - newWidth;
        this.totalScrollablePage.height += initialHeight - newHeight;
        let newBarX = this.percentagePage.width * this.totalScrollablePage.width +
            SCROLLBAR_PADDING +
            sidebar_1.SIDEBAR_WIDTH;
        if (newBarX < SCROLLBAR_PADDING + sidebar_1.SIDEBAR_WIDTH) {
            newBarX = SCROLLBAR_PADDING + sidebar_1.SIDEBAR_WIDTH;
            this.equipmentLayer.x(sidebar_1.SIDEBAR_WIDTH);
            this.grid.x(sidebar_1.SIDEBAR_WIDTH);
        }
        else if (newBarX >
            this.stageDimensions.width - newWidth - SCROLLBAR_PADDING) {
            newBarX = this.stageDimensions.width - newWidth - SCROLLBAR_PADDING;
            const layerX = this.stageDimensions.width - this.grid.totalWidth * this.grid.scaleX();
            this.equipmentLayer.x(layerX);
            this.grid.x(layerX);
        }
        this.horizontalBar.x(newBarX);
        let newBarY = this.percentagePage.height * this.totalScrollablePage.height +
            SCROLLBAR_PADDING;
        if (newBarY < SCROLLBAR_PADDING) {
            newBarY = SCROLLBAR_PADDING;
            this.equipmentLayer.y(0);
            this.grid.y(0);
        }
        else if (newBarY >
            this.stageDimensions.height - newHeight - SCROLLBAR_PADDING) {
            newBarY = this.stageDimensions.height - newHeight - SCROLLBAR_PADDING;
            const layerY = this.stageDimensions.height -
                this.grid.totalHeight * this.grid.scaleY();
            this.equipmentLayer.y(layerY);
            this.grid.y(layerY);
        }
        this.verticalBar.y(newBarY);
    }
    scrollHorizontal() {
        this.percentagePage.width =
            (this.horizontalBar.x() - sidebar_1.SIDEBAR_WIDTH - SCROLLBAR_PADDING) /
                this.totalScrollablePage.width;
        const layersPositionX = (this.stageDimensions.width -
            this.grid.totalWidth * this.grid.scaleX() -
            sidebar_1.SIDEBAR_WIDTH) *
            this.percentagePage.width +
            sidebar_1.SIDEBAR_WIDTH;
        this.equipmentLayer.x(layersPositionX);
        this.grid.x(layersPositionX);
    }
    scrollVertical() {
        this.percentagePage.height =
            (this.verticalBar.y() - SCROLLBAR_PADDING) /
                this.totalScrollablePage.height;
        const layersPositionY = (this.stageDimensions.height -
            this.grid.totalHeight * this.grid.scaleY()) *
            this.percentagePage.height;
        this.equipmentLayer.y(layersPositionY);
        this.grid.y(layersPositionY);
    }
}
exports.EditableControlLayer = EditableControlLayer;
