import { StatusBar } from 'expo-status-bar';
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Alert, ScrollView, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

    const [getEmail, setEmail] = useState("");
    const [getPassword, setPassword] = useState("");

    return (
        <SafeAreaView>
            <ScrollView style={styles.mainView}>
                <View style={styles.mainTextBox}>
                    <Text style={styles.mainText}>Let's sign you in.</Text>
                    <Text style={styles.text}>Welcome back.</Text>
                    <Text style={styles.text}>You've been missed!</Text>
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
                    <TextInput style={styles.input1} autoCorrect={false} placeholder={"Email Address"} placeholderTextColor={"gray"} onChangeText={
                        (text) => {
                            setEmail(text);
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
                        <Text style={styles.registerBoxText}>Don't have an account?</Text>
                        <Pressable onPress={() => { router.push("/register") }}>
                            <Text style={styles.registerBtn}>Register</Text>
                        </Pressable>
                    </View>
                    <View>
                        <Pressable style={styles.signinBox} onPress={
                            async () => {
                                let response = await fetch(
                                    "http://10.0.2.2:8080/RobotCarRemote/SignIn",
                                    {
                                        method: "POST",
                                        body: JSON.stringify(
                                            {
                                                email: getEmail,
                                                password: getPassword
                                            }
                                        ),
                                        headers: {
                                            "Content-Type": "application/json"
                                        }
                                    }
                                );

                                if (response.ok) {
                                    let json = await response.json();

                                    if(json.success){
                                        let user = json.user;
                                        router.replace("/home");

                                        try {
                                            await AsyncStorage.setItem("User",JSON.stringify(user));
                                        } catch (error) {
                                            Alert.alert("Msg","Unable procees your request");
                                        }
                                        console.log(user);

                                    } else {
                                        Alert.alert("msg", json.message);
                                    }


                                }
                            }

                        }>
                                <Text style={styles.signinBtn}>Sign In</Text>
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

    backBox: {
        flex: 1,
        width: "auto",
        marginBottom: 20
    },

    mainTextBox: {
        flex: 3,
        width: "auto",
        marginTop: 60
    },

    inputsBox: {
        flex: 6,
        width: "auto",
        alignItems: "center",
        marginTop: 30,
        marginBottom: 120,
        alignItems: 'center',
    },

    buttonBox: {
        flex: 2,
        width: "auto",
        alignItems: "center",
    },

    mainText: {
        color: "#fff",
        fontSize: 37,
        fontWeight: "800",
        marginBottom: 8,
        textAlign: "center"
    },

    text: {
        color: "#D7DBDD",
        fontSize: 34,
        textAlign: "center"
    },

    input1: {
        borderWidth: 2,
        borderColor: "#0df9a3",
        backgroundColor: "#292929",
        borderRadius: 20,
        height: 62,
        marginTop: 22,
        paddingLeft: 20,
        fontSize: 16,
        width: "100%",
        color: "#0df9a3"
    },

    input2: {
        borderWidth: 2,
        borderRadius: 20,
        borderColor: "#0df9a3",
        backgroundColor: "#292929",
        height: 62,
        marginTop: 18,
        paddingLeft: 20,
        fontSize: 16,
        width: "100%",
        color: "#0df9a3"
    },

    registerBox: {
        flexDirection: "row",
        marginTop: 6
    },

    registerBoxText: {
        fontSize: 18,
        marginRight: 6,
        color: "#ffff"
    },

    registerBtn: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0df9a3"
    },

    signinBox: {
        width: 350,
        height: 62,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        marginTop: 25,
        backgroundColor: "#0df9a3"
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
        columnGap: 30,
        width: "auto",
        marginBottom: 20
    },

});