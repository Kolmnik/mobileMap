import React,{useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from "react-native";


export const Event = (props) => {
    const [addEvent,setAddEvent] = useState({
        layer: 1,
        address: 'Плеханова 12',
        coord: '',
        date: new Date(),
        type: '',
        photo: '',
        comment: ''
    })
    const type1 = ['Яма', 'Авария','Ремонт','Уборка','Перекрыто']
    console.log(addEvent.layer)

    const Layer = () => {
        return(
            <View style={styles.block}>
                <Text style={styles.txt}>Слой</Text>
                <View style={styles.cheked}>
                    <TouchableOpacity style={styles.button} onPress={()=>(props.i(1))}>
                        <Text>Дорога</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>(props.i(2))}>
                        <Text>Здания</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>(props.i(3))}>
                        <Text>Подземка</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }

    const Address = (props) => {
        return(
            <View style={styles.block}>
                <Text style={styles.txt}>Адрес</Text>
                <View style={styles.full}>
                    <Text>{props.address}</Text>
                </View>
            </View>

        )
    }
    return(
        <View>
            <Layer/>
            <Address address={addEvent.address} />
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        paddingHorizontal: 20,
        paddingTop: 20
    },
    txt: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 5
    },
    cheked: {
        // padding: 5,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10
    },
    button: {
        width: '32%',
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 3,
        fontSize: 15,
    },
    full: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 3,
        marginTop: 10

    }
})
