import Utm from 'geodesy/utm';
/** Create a GeolocationPosition convert to UTM (Universal Transverse Mercator) using an initial offset position. */
export declare const createUtmConverter: (offsetPosition: GeolocationPosition) => {
    convert: (position: GeolocationPosition) => Utm;
};
//# sourceMappingURL=utmConverter.d.ts.map