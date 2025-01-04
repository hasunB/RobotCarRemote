import React, { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, TextInput, Pressable, Image, Alert, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
    const [getEmail, setEmail] = useState("");
    const [getName, setName] = useState("");
    const [getUsername, setUsername] = useState("");
    const [getPassword, setPassword] = useState("");

    return (
        <SafeAreaView>
            <ScrollView style={styles.mainView}>
                <View style={styles.mainTextBox}>
                    <Text style={styles.mainText}>Let's Create an Account</Text>
                    <Text style={styles.text}>Connect with your Robot Car</Text>
                </View>
                <View style={styles.inputsBox}>
                    <View style={styles.socialMediaBox}>
                        <View style={styles.socialMedia}>
                            <Image source={require('../assets/socialmediaicons/google.png')} style={{ width: 45, height: 45 }} />
                        </View>
                        <View style={styles.socialMedia}>
                            <Image source={require('../assets/socialmediaicons/apple.png')} style={{ width: 45, height: 45 }} />
                        </View>
                        <View style={styles.socialMedia}>
                            <Image source={require('../assets/socialmediaicons/ms.png')} style={{ width: 45, height: 45 }} />
                        </View>

                    </View>
                    <Text style={{ fontSize: 22, color: "#0df9a3" }}>Or</Text>
                    <TextInput style={styles.input1} autoCorrect={false} placeholder={"Email"} placeholderTextColor={"gray"} onChangeText={
                        (text) => {
                            setEmail(text);
                        }
                    } />
                    <TextInput style={styles.input2} autoCorrect={false} placeholder={"Name"} placeholderTextColor={"gray"} onChangeText={
                        (text) => {
                            setName(text);
                        }
                    } />
                    <TextInput style={styles.input2} autoCorrect={false} placeholder={"@Username"} placeholderTextColor={"gray"} onChangeText={
                        (text) => {
                            setUsername(text);
                        }
                    } />
                    <TextInput style={styles.input2} autoCorrect={false} placeholder={"Password"} secureTextEntry={true} placeholderTextColor={"gray"} onChangeText={
                        (text) => {
                            setPassword(text);
                        }
                    } />

                </View>
                <View style={styles.buttonBox}>
                    <View style={styles.registerBox}>
                        <Text style={styles.registerBoxText}>Already have an account?</Text>
                        <Pressable onPress={() => { router.push("/") }}>
                            <Text style={styles.registerBtn}>Sign In</Text>
                        </Pressable>
                    </View>
                    <View>
                        <Pressable style={styles.signinBox} onPress={
                            async () => {
                                let response = await fetch(
                                    "http://10.0.2.2:8080/RobotCarRemote/SignUp",
                                    {
                                        method: "POST",
                                        body: JSON.stringify(
                                            {
                                                email: getEmail,
                                                name: getName,
                                                username: getUsername,
                                                password: getPassword,
                                            }
                                        ),
                                        headers: {
                                            "Content-Type": "application/json"
                                        }
                                    }
                                );

                                if (response.ok) {
                                    let json = await response.json();
                                    if (json.success) {
                                        Alert.alert("messsage", json.message);
                                        router.replace("/");
                                    } else {
                                        Alert.alert("messsage", json.message);
                                    }

                                }
                            }
                        }>
                            <Text style={styles.signinBtn}>Register</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );

}


const styles = StyleSheet.create({

    mainView: {
        backgroundColor: "#0f0f0f",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        paddingStart: 20,
        paddingEnd: 20
    },

    mainTextBox: {
        flex: 2,
        width: "auto",
        marginTop: 60
    },

    inputsBox: {
        flex: 7,
        width: "auto",
        marginTop: 20,
        alignItems: "center",
    },

    buttonBox: {
        flex: 2,
        width: "auto",
        alignItems: "center",
        marginTop: 12
    },

    backIcon: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 15
    },

    mainText: {
        color: "#fff",
        fontSize: 37,
        fontWeight: "800",
        textAlign:"center"
    },

    text: {
        color: "#D7DBDD",
        fontSize: 20,
        textAlign:"center",
        marginTop: 10
    },

    input1: {
        width: "100%",
        borderWidth: 2,
        borderColor: "#0df9a3",
        backgroundColor: "#292929",
        borderRadius: 20,
        height: 60,
        paddingLeft: 20,
        fontSize: 16,
        marginTop: 10,
        color: "#0df9a3"
    },

    input2: {
        width: "100%",
        borderWidth: 2,
        borderRadius: 20,
        borderColor: "#0df9a3",
        backgroundColor: "#292929",
        height: 60,
        marginTop: 18,
        paddingLeft: 20,
        fontSize: 16,
        color: "#0df9a3"
    },

    mobileBox: {
        flex: 2
    },

    registerBox: {
        flexDirection: "row",
        marginTop: 6,

    },

    registerBoxText: {
        fontSize: 18,
        marginRight: 6,
        color: "#fff"
    },

    registerBtn: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0df9a3"
    },

    signinBox: {
        backgroundColor: "#0df9a3",
        width: 350,
        height: 62,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        marginTop: 20
    },

    signinColorBox: {
        width: 350,
        height: 62,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
    },

    signinBtn: {
        fontSize: 22,
        color: "#252525",
        fontWeight: "bold"
    },

    socialMediaBox: {
        flexDirection: "row",
        columnGap: 0,
        width: "65%",
        marginBottom: 7
    },

    socialMedia: {
        flex: 1,
        backgroundColor: "red",
        height: 60,
        borderRadius: 30
    },

    socialMedia: {
        flex: 1,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    }
});