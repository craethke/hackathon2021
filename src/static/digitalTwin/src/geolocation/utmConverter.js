"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUtmConverter = void 0;
const utm_1 = require("geodesy/utm");
/** Create a GeolocationPosition convert to UTM (Universal Transverse Mercator) using an initial offset position. */
const createUtmConverter = (offsetPosition) => {
    const offsetLatLon = new utm_1.LatLon(offsetPosition.coords.latitude, offsetPosition.coords.longitude);
    const offsetUtm = offsetLatLon.toUtm();
    return {
        convert: (position) => {
            const latLon = new utm_1.LatLon(position.coords.latitude, position.coords.longitude);
            const utm = latLon.toUtm();
            return Object.assign(Object.assign({}, utm), { easting: utm.easting, northing: utm.northing });
        },
    };
};
exports.createUtmConverter = createUtmConverter;
