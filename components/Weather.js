import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Icon } from 'react-native-elements'
import GetLocation from 'react-native-get-location'

// https://dmigw.govcloud.dk/metObs/v1/observation/stationId/06156?api-key=d90269de-1778-4642-8031-f246ee6024ed
// https://dmigw.govcloud.dk/metObs/v1/observation/stationId/06156/parameterId/temp_dry?api-key=d90269de-1778-4642-8031-f246ee6024ed&limit=1 // GET FIRST/RECENT ITEM
// https://dmigw.govcloud.dk/metObs/v1/observation/stationId/06156/parameterId/temp_dry?api-key=d90269de-1778-4642-8031-f246ee6024ed&limit=1&field=value // ONLY VALUE (IN CELCIUS)
// https://dmigw.govcloud.dk/metObs/v1/station/stationId/06156?api-key=d90269de-1778-4642-8031-f246ee6024ed&limit=1&field=name // HOLBÆK NAME

const API_KEY = 'd90269de-1778-4642-8031-f246ee6024ed'
const BASE_URL = "https://dmigw.govcloud.dk/metObs"
const STATION_ID_HOLBAEK = '06156'
const TEMP_PARAM = 'temp_dry'
const WIN_SPEED_PARAM = 'wind_speed'
const VISIBILITY = 'visibility'
const VERSION = 'v1'
const SCHEMA = 'observation'

const GET_WEATHER_API = BASE_URL + "/" +
    VERSION + "/" +
    SCHEMA + "/" +
    'stationId' + "/" +
    STATION_ID_HOLBAEK + "/" +
    "parameterId" + "/" +
    TEMP_PARAM + "?" +
    "api-key=" + API_KEY + "&" +
    "limit=1"

const getUserLocation = () => {
    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    })
        .then(location => {
            console.log(location)
            return location
        })
        .catch(error => {
            const { code, message } = error
            console.warn(code, message)
        })
}

export default Weather = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(GET_WEATHER_API)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <View style={{ color: "#fffdd0", borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
            {isLoading ? <ActivityIndicator /> : (
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={{ margin: 10 }}>Placeholder: {data[0].value} </Text>
                        {getUserLocation()}
                    </View>

                    <View>
                        <Icon
                            style={{ margin: 5 }}
                            name='sun'
                            type='feather'
                            color='#517fa4' />
                    </View>
                </View>
            )}
        </View>
    );
};
