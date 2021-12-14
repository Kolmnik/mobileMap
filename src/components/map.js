import React from 'react';
import MapView from "react-native-maps";
import {Marker } from 'react-native-maps';
import Geojson from "react-native-geojson";
import {StyleSheet, Text, View} from "react-native";
import roads_kaluga from '../data/kaluga_roads_geojson.json';






const alcatraz = {
    type: 'FeatureCollection',
    features: [
        { "type": "Feature", "properties": { "ogc_fid": 31, "building": "yes", "addr_city": "Калуга", "a_strt": "площадь Старый Торг", "a_sbrb": null, "a_hsnmbr": "2", "a_place": null, "a_pstcd": null, "b_levels": "4", "name": "Областная администрация", "name_en": null, "name_ru": null, "osm_type": "relation", "osm_id": 1343949.0 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 36.2516667, 54.5064809 ], [ 36.2522413, 54.5061543 ], [ 36.2528121, 54.5058298 ], [ 36.2521632, 54.505445 ], [ 36.2510179, 54.5060961 ], [ 36.2516667, 54.5064809 ] ], [ [ 36.2522221, 54.5059732 ], [ 36.251901, 54.5057845 ], [ 36.2521915, 54.5056178 ], [ 36.2525126, 54.5058065 ], [ 36.2522221, 54.5059732 ] ], [ [ 36.2516424, 54.5062968 ], [ 36.2513213, 54.5061081 ], [ 36.251588, 54.505955 ], [ 36.2519091, 54.5061437 ], [ 36.2516424, 54.5062968 ] ] ] ] } },
    ]
};


export const Map = (props) => {
    let count = props.i

    const Shows = (props) => {
        const show = [roads_kaluga, alcatraz, alcatraz];

        if (props.count === 1) {
            return(
                <Geojson geojson={show[0]} />
            )
        } else if (props.count === 2) {
            return(
                <Geojson geojson={show[1]} />
            )
        } else if (props.count === 3) {
            return(
                <Geojson geojson={show[2]} />
            )
        } else {
            return null
        }

    }


        return (
            <View style={styles.map}>
                <MapView
                    style={styles.map}
                    onRegionChange={region => console.log(region)}
                    initialRegion={{
                        latitude: 54.520495480184536,
                        longitude: 36.24867798731824,
                        latitudeDelta: 0.0099,
                        longitudeDelta: 0.0099,
                    }}
                >
                    <Shows count={count}/>
                    <Marker
                        coordinate={{
                            latitude:  54.520495480184536,
                            longitude: 36.24867798731824
                        }}
                    />
                </MapView>
            </View>
        )
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    navigator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
    }
})

