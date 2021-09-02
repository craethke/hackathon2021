import React, { PropsWithChildren } from "react";
export declare const POSITION_HISTORY_SIZE = 100;
export declare const GEOLOCATION_OPTIONS: {
    enableHighAccuracy: boolean;
    maximumAge: number;
};
export interface Geolocation {
    initialPosition?: GeolocationPosition;
    position?: GeolocationPosition;
    positionHistory?: GeolocationPosition[];
    error?: GeolocationPositionError;
}
export declare const GeolocationContext: React.Context<Geolocation>;
export declare const useGeolocation: () => Geolocation;
export declare const GeolocationProvider: React.FC<PropsWithChildren<unknown>>;
//# sourceMappingURL=geolocationProvider.d.ts.map