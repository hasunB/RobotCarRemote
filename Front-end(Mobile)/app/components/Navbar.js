import React, { useState } from "react";
import { router } from "expo-router";
import { View, StyleSheet, Pressable, Alert } from "react-native";
import OIcon from 'react-native-vector-icons/Octicons';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function Navbar() {

    const [isPressed, setIsPressed] = useState(false);

    const changeStatus = async (Status) => {
        let userjson = await AsyncStorage.getItem("User");
        let user = JSON.parse(userjson);
        let response = await fetch("http://10.0.2.2:8080/RobotCarRemote/ChangeVehicleStatus?id=" + user.id +"&Status="+ Status);

        if (response.ok) {
            let json = await response.json();

            if (json.success) {
                let data = json.Status;
                console.log(data);
                setIsPressed(!isPressed);
            } else {
                Alert.alert("Error", json.message);
            }

        }
    }

    return (
        <View style={styles.mainView}>
            <View style={styles.navbarBox}>
                <Pressable style={styles.homeBox} onPress={() => { router.push("/post") }}>
                    <OIcon name="home" style={styles.navIcons} />
                </Pressable>
                <Pressable style={styles.chatBox} onPress={() => { router.push("/home") }}>
                    <FAIcon name="lightbulb" style={styles.navIcons} />
                </Pressable>
                <View style={styles.powerBtnBox}>
                    <Pressable
                        style={[
                            styles.powerBtn, isPressed && styles.powerBtnPressed
                        ]}
                        onPress={
                            () => { 
                                changeStatus(!isPressed);
                            }
                        }
                    >
                        <MCIcon
                            name="power"
                            style={[
                                styles.icon, isPressed && styles.iconPressed
                            ]}
                        />
                    </Pressable>
                </View>
                <Pressable style={styles.notificationBox} >
                    <MCIcon name="battery-70" style={styles.navIcons} />
                </Pressable>
                <Pressable style={styles.profileBox} onPress={() => { router.push("/profile") }}>
                    <FAIcon name="user-alt" style={styles.navIcons} />
                </Pressable>
            </View>
        </View>
    );

}


const styles = StyleSheet.create({
    mainView: {
        alignItems: "center",
        marginTop: 15
    },

    navbarBox: {
        width: "93%",
        height: 80,
        flexDirection: "row",
        borderRadius: 30,
    },

    homeBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    chatBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    powerBtnBox: {
        flex: 1.5,
        alignItems: "center",
        justifyContent: "center",
    },

    powerBtn: {
        width: 75,
        height: 75,
        backgroundColor: "#1b1b1b",
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#fff"
    },

    powerBtnPressed: {
        borderColor: '#0df9a3',
    },

    icon: {
        fontSize: 60,
        color: '#fff',
    },

    iconPressed: {
        color: '#0df9a3',
    },

    notificationBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    profileBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    navIcons: {
        fontSize: 28,
        color: "#fff"
    }
});
