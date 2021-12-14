import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SphericalMercator from "@mapbox/sphericalmercator";
import { MapView, Constants } from "expo";

const merc = new SphericalMercator();

const getZoomLevelFromRegion = (region, viewport) => {
    const { longitudeDelta } = region;
    const { width } = viewport;

    // Normalize longitudeDelta which can assume negative values near central meridian
    const lngD = (360 + longitudeDelta) % 360;

    // Calculate the number of tiles currently visible in the viewport
    const tiles = width / 256;

    // Calculate the currently visible portion of the globe
    const portion = lngD / 360;

    // Calculate the portion of the globe taken up by each tile
    const tilePortion = portion / tiles;

    // Return the zoom level which splits the globe into that number of tiles
    return Math.log2(1 / tilePortion);
};

const getRegionByZoomLevel = (center, zoomLevel, viewport) => {
    const { latitude, longitude } = center;
    const { width, height } = viewport;

    // Calculate the projected coordinates center coordinates
    const [x, y] = merc.px([lng, lat], zoomLevel);

    // Subtract screen dimensions to get projected boundaries
    const xmin = Math.floor(x - width / 2);
    const xmax = xmin + width;
    const ymin = Math.floor(y - height / 2);
    const ymax = ymin + height;

    // Use reverse projection to convert boundaries to geographical coordinates
    const nw = merc.ll([xmin, ymin], zoomLevel);
    const se = merc.ll([xmax, ymax], zoomLevel);

    // Calculate latitude and longitude deltas as difference between boundary coordinates
    const latitudeDelta = nw[1] - se[1];
    const longitudeDelta = se[0] - nw[0];

    // Return react-native-maps compatible region
    return {
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta
    };
};

const getRegionBoundaries = (center, zoomLevel, viewport) => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = center;
    const { width, height } = viewport;

    const [x, y] = merc.px([longitude, latitude], zoomLevel);
    const xmin = Math.floor(x - width / 2);
    const xmax = xmin + width;
    const ymin = Math.floor(y - height / 2);
    const ymax = ymin + height;

    const [westLongitude, northLatitude] = merc.ll([xmin, ymin], zoomLevel);
    const [eastLongitude, southLatitude] = merc.ll([xmax, ymax], zoomLevel);

    return {
        northLatitude,
        southLatitude,
        westLongitude,
        eastLongitude
    };
};

export default class TestMap extends React.Component {
    state = {
        region: null,
        layout: null
    };

    getZoomLevel() {
        const { region, layout } = this.state;

        if (!region || !layout) return null;

        return getZoomLevelFromRegion(region, layout);
    }

    renderNextZoomRegion() {
        const zoomLevel = this.getZoomLevel();

        if (!zoomLevel) {
            return null;
        }

        const { latitude, longitude } = this.state.region;
        const { width, height } = this.state.layout;
        const {
            northLatitude,
            southLatitude,
            westLongitude,
            eastLongitude
        } = getRegionBoundaries(
            { latitude, longitude },
            Math.floor(zoomLevel) + 1,
            { width, height }
        );

        return (
            <MapView.Polygon
                coordinates={[
                    { latitude: northLatitude, longitude: westLongitude },
                    { latitude: northLatitude, longitude: eastLongitude },
                    { latitude: southLatitude, longitude: eastLongitude },
                    { latitude: southLatitude, longitude: westLongitude }
                ]}
            />
        );
    }

    render() {
        const zoomLevel = this.getZoomLevel();

        return (
            <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
                <MapView
                    style={{ flex: 1 }}
                    onRegionChange={region => this.setState({ region })}
                    onLayout={e => this.setState({ layout: e.nativeEvent.layout })}
                >
                    {this.renderNextZoomRegion()}
                </MapView>
                {this.state.layout && (
                    <View
                        style={{
                            height: 48,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Text>Width: {this.state.layout.width}</Text>
                    </View>
                )}
                {this.state.region && (
                    <View
                        style={{
                            height: 48,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Text>LngD: {this.state.region.longitudeDelta}</Text>
                    </View>
                )}
                <View
                    style={{ height: 48, alignItems: "center", justifyContent: "center" }}
                >
                    {zoomLevel !== null ? (
                        <Text>Current Zoom Level: {zoomLevel.toFixed(5)}</Text>
                    ) : (
                        <Text>Drag the map around</Text>
                    )}
                </View>
            </View>
        );
    }
}
