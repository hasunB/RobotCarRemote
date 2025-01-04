import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Image, Alert, ScrollView } from "react-native";
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import { Navbar } from "./components/Navbar.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { FlashList } from "@shopify/flash-list";


export default function App() {

    const [isLongUpPressed, setIsLongUpPressed] = useState(false);
    const [isLongDownPressed, setIsLongDownPressed] = useState(false);
    const [isLongLeftPressed, setIsLongLeftPressed] = useState(false);
    const [isLongRightPressed, setIsLongRightPressed] = useState(false);
    const [isWheelLocked, setWheelLocked] = useState(false);
    const [isDoorLocked, setDoorLocked] = useState(false);

    const changeStatus = async (BtnName, Status) => {
        let userjson = await AsyncStorage.getItem("User");
        let user = JSON.parse(userjson);
        let response = await fetch("http://10.0.2.2:8080/RobotCarRemote/ChangeButtonStatus?id=" + user.id + "&Status=" + Status + "&Button=" + BtnName);

        if (response.ok) {
            let json = await response.json();

            if (json.success) {
                let data = json.Status;
                console.log(data);
                if (json.btn == "lock") {
                    setWheelLocked(!isWheelLocked);
                } else if (json.btn == "up") {
                    if (json.Status == "true") {
                        setIsLongUpPressed(true);
                    } else {
                        setIsLongUpPressed(false);
                    }
                } else if (json.btn == "down") {
                    if (json.Status == "true") {
                        setIsLongDownPressed(true);
                    } else {
                        setIsLongDownPressed(false);
                    }
                } else if (json.btn == "left") {
                    if (json.Status == "true") {
                        setIsLongLeftPressed(true);
                    } else {
                        setIsLongLeftPressed(false);
                    }
                } else if (json.btn == "right") {
                    if (json.Status == "true") {
                        setIsLongRightPressed(true);
                    } else {
                        setIsLongRightPressed(false);
                    }
                }
            } else {
                Alert.alert("Error", json.message);
            }

        }
    }

    return (
        <SafeAreaView>
            <View style={styles.mainView}>
                <View style={styles.View1}>
                    <View style={styles.header}>
                        <View style={styles.headerBox1}>
                            <Text style={styles.headertext}>Remote</Text>
                        </View>
                        <View style={styles.headerBox2}>
                            <View style={styles.profileImgBox}>
                                <Image source={require('../assets/man.jpeg')} style={{ width: "100%", height: "100%", borderRadius: 50 }} />
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, padding: 15, paddingBottom: 0 }}>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1 }}></View>
                            <View style={{ flex: 3, overflow: "hidden" }}>
                                <View style={{ width: "110%", height: 500, borderRadius: 120, marginStart: -10, borderWidth: 10, borderColor: "#fff" }}></View>
                            </View>
                            <View style={{ flex: 1 }}></View>
                        </View>
                        <View style={{ flex: 9, flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 1, gap: 10, justifyContent: "flex-start" }}>
                                    <Pressable
                                        style={[
                                            styles.controlBtn, isWheelLocked && styles.longPressStyle
                                        ]}
                                        onPress={
                                            () => {
                                                changeStatus("lock", !isWheelLocked);
                                            }
                                        }
                                    >
                                        <MCIcon
                                            name="lock"
                                            style={[
                                                styles.navIcons, isWheelLocked && styles.longPressIcon
                                            ]}
                                        />
                                    </Pressable>
                                    <Pressable style={styles.controlBtn}>
                                        <MCIcon name="plus" style={styles.navIcons} />
                                    </Pressable>
                                </View>
                                <View style={{ flex: 1, gap: 10, justifyContent: "flex-end" }}>
                                    <Pressable
                                        style={[
                                            styles.controlBtn,
                                            isLongLeftPressed && styles.longPressStyle,
                                        ]}
                                        onLongPress={
                                            () => {
                                                changeStatus("left", true);
                                            }
                                        }
                                        onPressOut={
                                            () => {
                                                changeStatus("left", false);
                                            }
                                        }
                                    >
                                        <MCIcon
                                            name="chevron-left"
                                            style={[
                                                styles.Icons,
                                                isLongLeftPressed && styles.longPressIcon,
                                            ]}
                                        />
                                    </Pressable>
                                    <Pressable
                                        style={[
                                            styles.controlBtn,
                                            isLongRightPressed && styles.longPressStyle,
                                        ]}
                                        onLongPress={
                                            () => {
                                                changeStatus("right", true);
                                            }
                                        }
                                        onPressOut={
                                            () => {
                                                changeStatus("right", false);
                                            }
                                        }
                                    >
                                        <MCIcon
                                            name="chevron-right"
                                            style={[
                                                styles.Icons,
                                                isLongRightPressed && styles.longPressIcon,
                                            ]}
                                        />
                                    </Pressable>
                                </View>
                            </View>
                            <View style={{ flex: 3, justifyContent: "center", alignItems: "center", padding: 20 }}>
                                <Image source={require('../assets/car.png')} style={{ width: "93%", height: "100%" }} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 1, gap: 10, justifyContent: "flex-start" }}>
                                    <Pressable
                                        style={[
                                            styles.controlBtn, isDoorLocked && styles.longPressStyle
                                        ]}
                                        onPress={() => setDoorLocked(!isDoorLocked)}
                                    >
                                        <MCIcon
                                            name="car-door-lock"
                                            style={[
                                                styles.navIcons, isDoorLocked && styles.longPressIcon
                                            ]}
                                        />
                                    </Pressable>
                                    <Pressable style={styles.controlBtn}>
                                        <MCIcon name="plus" style={styles.navIcons} />
                                    </Pressable>
                                </View>
                                <View style={{ flex: 1, gap: 10, justifyContent: "flex-end" }}>
                                    <Pressable
                                        style={[
                                            styles.controlBtn,
                                            isLongUpPressed && styles.longPressStyle,
                                        ]}
                                        onLongPress={
                                            () => {
                                                changeStatus("up", true);
                                            }
                                        }
                                        onPressOut={
                                            () => {
                                                changeStatus("up", false);
                                            }
                                        }
                                    >
                                        <MCIcon
                                            name="chevron-up"
                                            style={[
                                                styles.Icons,
                                                isLongUpPressed && styles.longPressIcon,
                                            ]}
                                        />
                                    </Pressable>
                                    <Pressable
                                        style={[
                                            styles.controlBtn,
                                            isLongDownPressed && styles.longPressStyle,
                                        ]}
                                        onLongPress={
                                            () => {
                                                changeStatus("down", true);
                                            }
                                        }
                                        onPressOut={
                                            () => {
                                                changeStatus("down", false);
                                            }
                                        }
                                    >
                                        <MCIcon
                                            name="chevron-down"
                                            style={[
                                                styles.Icons,
                                                isLongDownPressed && styles.longPressIcon,
                                            ]}
                                        />
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <View style={{ flex: 1 }}></View>
                            <View style={{ flex: 3, overflow: "hidden", justifyContent: "flex-end" }}>
                                <View style={{ width: "110%", height: 500, borderRadius: 120, marginStart: -10, borderWidth: 10, borderColor: "#fff" }}></View>
                            </View>
                            <View style={{ flex: 1 }}></View>
                        </View>
                    </View>
                </View>
                <View style={styles.View2}>
                    <Navbar />
                </View>
            </View>
        </SafeAreaView>
    );

}


const styles = StyleSheet.create({
    mainView: {
        backgroundColor: "#0f0f0f",
        width: "100%",
        height: "100%"
    },

    View1: {
        flex: 6,
        flexDirection: "column"
    },

    View2: {
        flex: 1,
    },

    header: {
        flexDirection: "row",
        marginTop: 20,
        paddingHorizontal: 15
    },

    profileImgBox: {
        backgroundColor: "#000",
        height: 60,
        width: 60,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#0df9a3"
    },

    headerBox1: {
        flex: 1,
        justifyContent: "center",
    },

    headerBox2: {
        flex: 1,
        alignItems: "flex-end",
    },

    headertext: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#fff",
    },

    controlBtn: {
        width: "100%",
        height: 65,
        backgroundColor: "#0f0f0f",
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },

    navIcons: {
        fontSize: 32,
        color: "#fff"
    },

    Icons: {
        fontSize: 45,
        color: "#fff"
    },

    longPressStyle: {
        borderColor: '#0df9a3',
    },

    longPressIcon: {
        color: '#0df9a3',
    },


});