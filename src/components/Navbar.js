import React, {useState} from 'react';
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import {Map} from './map';
import {Event} from './event';
import {Account} from "./account";
import {NavigationContainer} from "@react-navigation/native";


const Tab = createBottomTabNavigator()

export const Navbar = () => {
    const [i,setI]=useState(0)
    return(
        <Tab.Navigator
            // initialRouteName={'Аккаунт'}

        >
            <Tab.Screen name="Карта">
                {props => <Map {...props} i={i} />}
            </Tab.Screen>
            <Tab.Screen name="Происшествия">
                {props => <Event {...props} i={ setI} />}

            </Tab.Screen>
            <Tab.Screen name="Аккаунт" >
                {props => <Account {...props} i={1}/>}

            </Tab.Screen>

        </Tab.Navigator>
    )
}
