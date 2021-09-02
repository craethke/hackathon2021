"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeolocationProvider = exports.useGeolocation = exports.GeolocationContext = exports.GEOLOCATION_OPTIONS = exports.POSITION_HISTORY_SIZE = void 0;
const react_1 = __importStar(require("react"));
const react_2 = require("react");
exports.POSITION_HISTORY_SIZE = 100;
exports.GEOLOCATION_OPTIONS = {
    enableHighAccuracy: true,
    // timeout: 5000,
    maximumAge: 0
};
exports.GeolocationContext = react_1.default.createContext({});
const useGeolocation = () => {
    return react_2.useContext(exports.GeolocationContext);
};
exports.useGeolocation = useGeolocation;
const GeolocationProvider = (props) => {
    // state for the watch request
    const [currentPosition, setCurrentPosition] = react_1.useState();
    const [error, setError] = react_1.useState();
    const [initialPosition, setInitialPosition] = react_1.useState();
    const [positions, setPositions] = react_1.useState([]);
    // use effect for wiring up the geolocation watcher
    react_1.useEffect(() => {
        const id = navigator.geolocation.watchPosition(setCurrentPosition, setError, exports.GEOLOCATION_OPTIONS);
        console.log("Starting watch handler: " + id);
        return () => {
            console.log("Clearing watch handler for " + id);
            navigator.geolocation.clearWatch(id);
        };
    }, []);
    // use effect for maintaining initial and historical state
    react_1.useEffect(() => {
        if (currentPosition) {
            if (!initialPosition) {
                setInitialPosition(currentPosition);
            }
            setPositions([currentPosition, ...positions].slice(0, exports.POSITION_HISTORY_SIZE));
        }
    }, [currentPosition]);
    return (react_1.default.createElement(exports.GeolocationContext.Provider, { value: {
            initialPosition: initialPosition,
            position: currentPosition,
            positionHistory: positions.slice(1, exports.POSITION_HISTORY_SIZE),
            error,
        } }, props.children));
};
exports.GeolocationProvider = GeolocationProvider;
