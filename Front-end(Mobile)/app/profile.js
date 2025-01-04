import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, ImageBackground, Alert, Image, Pressable, ScrollView, Modal, Button, TextInput } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Navbar } from "./components/Navbar.js";
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import * as ImagePicker from 'expo-image-picker';


export default function App() {

    const [getOpenModel, setOpenModel] = useState(false);
    const [getLogOutModel, setLogOutModel] = useState(false);
    const [getHeaderText, setHeaderText] = useState("");
    const [getEmail, setEmail] = useState("");
    const [getName, setName] = useState("");
    const [getUsername, setUsername] = useState("");
    const [getMobile, setMobile] = useState("");
    const [getPassword, setPassword] = useState("");
    const [getInputText, setInputText] = useState("");
    const [getImage, setImage] = useState("http://10.0.2.2:8080/Necho/ProfileImages/user.png");

    useEffect(
        () => {
            async function checkUser() {
                try {
                    let userjson = await AsyncStorage.getItem("User");
                    let user = JSON.parse(userjson);
                    if (userJson = null) {
                        router.replace("/");
                    } else {

                        let response = await fetch("http://10.0.2.2:8080/Necho/loadProfile?id=" + user.id);

                        if (response.ok) {
                            let json = await response.json();
                            if (json.success) {
                                console.log(json);
                                setName(json.user.name);
                                setUsername(json.user.username);
                                setEmail(json.user.email);
                                setMobile(json.user.mobile);
                                setPassword(json.user.password);
                                setImage(json.user.profile);
                            } else {
                                Alert.alert("Error", "Internal Server Error");
                            }
                        }

                    }
                } catch (e) {
                    console.log(e);
                }
            }

            checkUser();
        }, []
    );





    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <SafeAreaView>
            <Modal visible={getOpenModel} transparent={true} animationType="fade">
                <View style={styles.popusModalMain}>
                    <View style={styles.popusModal}>
                        <View style={styles.popusHeaderBox}>
                            <Text style={styles.popusHeader}>Enter New {getHeaderText}</Text>
                        </View>
                        <View style={styles.popusBodyBox}>
                            <TextInput style={styles.popusBodyInput} id="popusInput" autoCorrect={false} onChangeText={
                                (text) => {
                                    setInputText(text);
                                }
                            } />
                        </View>
                        <View style={styles.popusButtonBox}>
                            <View style={{ flex: 1, alignItems: "flex-start" }}>
                                <Pressable style={styles.cancelBtn} onPress={
                                    () => {
                                        setOpenModel(false);
                                    }
                                }>
                                    <Text style={styles.BtnText}>Cancel</Text>
                                </Pressable>
                            </View>
                            <View style={{ flex: 1, alignItems: "flex-end" }}>
                                <Pressable style={styles.changeBtn} onPress={
                                    () => {
                                        if (getInputText.length == 0) {
                                            Alert.alert("Warning", "Enter Your new credntial");
                                        } else {
                                            if (getHeaderText === "Name") {
                                                setName(getInputText);
                                            } else if (getHeaderText === "Username") {
                                                setUsername(getInputText);
                                            } else if (getHeaderText === "Password") {
                                                setPassword(getInputText);
                                            }

                                            setOpenModel(false);
                                        }

                                    }
                                }>
                                    <Text style={styles.BtnText}>Change</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal visible={getLogOutModel} transparent={true} animationType="fade">
                <View style={styles.popusModalMain}>
                    <View style={styles.logoutbox}>
                        <View style={styles.logoutHeaderBox}>
                            <Text style={styles.popusHeader}>Are you Sure?</Text>
                        </View>
                        <View style={styles.logoutBtnbox}>
                        <View style={{ flex: 1, alignItems: "flex-start" }}>
                                <Pressable style={styles.cancelBtn} onPress={
                                    () => {
                                        setLogOutModel(false);
                                    }
                                }>
                                    <Text style={styles.BtnText}>Cancel</Text>
                                </Pressable>
                            </View>
                            <View style={{ flex: 1, alignItems: "flex-end" }}>
                                <Pressable style={styles.changeBtn} onPress={
                                    async () => {

                                        let userJson = await AsyncStorage.getItem("User");
                                        let user = JSON.parse(userJson);

                                        let response = await fetch("http://10.0.2.2:8080/Necho//LogOut?id="+user.id);

                                        if(response.ok){
                                            let json = await response.json();

                                            if(json.success){
                                                
                                                AsyncStorage.clear();
                                                router.replace("/");

                                            } else {
                                                Alert.alert("OK","Internal Server Error. Please try Again Later");
                                            }
                                        }
                                    }
                                }>
                                    <Text style={styles.BtnText}>Log Out</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.mainView}>
                <View style={styles.imgBox}>
                    <ImageBackground source={{ uri: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }} resizeMode="cover" style={styles.backgroundImage}>
                        <LinearGradient colors={['transparent', '#252331']} style={styles.linearGradient}></LinearGradient>
                        <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['#ec5093', '#e52ea4', '#d400bd', '#b200da', '#6e21fb']} style={styles.profielImgBox}>
                            <View style={styles.profileImg}>
                                <Image source={{ uri: getImage }} style={{ width: "100%", height: "100%" }} />
                            </View>
                        </LinearGradient>
                        <Pressable style={styles.addProfileImg} onPress={pickImage}>
                            <FAIcon name="plus" style={{ fontSize: 16, color: "#000" }} />
                        </Pressable>
                        <View style={styles.changeBackImg}>
                            <FAIcon name="pen-fancy" style={styles.changeIcon} />
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.textBox}>
                    <View style={styles.userNameBox}>
                        <Text style={{ fontSize: 27, color: "#ffffff", marginTop: 1, fontWeight: "bold" }}>{getName}</Text>
                        <Text style={{ marginTop: 0, color: "grey" }}>{getUsername}</Text>
                    </View>
                </View>
                <View style={styles.detailBox}>
                    <ScrollView style={styles.detailScroll}>
                        <View style={styles.detailRow}>
                            <View style={styles.detailMainBox}>
                                <View style={styles.detailHeadBox}>
                                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>Email</Text>
                                </View>
                                <View style={styles.detailBodyBox}>
                                    <Text style={{ color: "grey", fontSize: 20 }}>{getEmail}</Text>
                                </View>
                            </View>
                            <View style={styles.detailEditBox}>
                                <Pressable style={styles.editButton}>
                                    <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['#ec5093', '#e52ea4', '#d400bd', '#b200da', '#6e21fb']} style={[styles.editButton, styles.blockedbtn]}>
                                        <MCIcon name="pencil-off" style={{ fontSize: 30, color: "#fff" }} />
                                    </LinearGradient>
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.detailRow}>
                            <View style={styles.detailMainBox}>
                                <View style={styles.detailHeadBox}>
                                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>Name</Text>
                                </View>
                                <View style={styles.detailBodyBox}>
                                    <Text style={{ color: "grey", fontSize: 20 }}>{getName}</Text>
                                </View>
                            </View>
                            <View style={styles.detailEditBox}>
                                <Pressable style={styles.editButton} onPress={
                                    () => {
                                        setHeaderText("Name");
                                        setOpenModel(true);
                                    }
                                }>
                                    <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['#ec5093', '#e52ea4', '#d400bd', '#b200da', '#6e21fb']} style={styles.editButton}>
                                        <MCIcon name="pencil" style={{ fontSize: 30, color: "#fff" }} />
                                    </LinearGradient>
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.detailRow}>
                            <View style={styles.detailMainBox}>
                                <View style={styles.detailHeadBox}>
                                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>Username</Text>
                                </View>
                                <View style={styles.detailBodyBox}>
                                    <Text style={{ color: "grey", fontSize: 20 }}>{getUsername}</Text>
                                </View>
                            </View>
                            <View style={styles.detailEditBox}>
                                <Pressable style={styles.editButton} onPress={
                                    () => {
                                        setHeaderText("Username");
                                        setOpenModel(true);
                                    }
                                }>
                                    <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['#ec5093', '#e52ea4', '#d400bd', '#b200da', '#6e21fb']} style={styles.editButton}>
                                        <MCIcon name="pencil" style={{ fontSize: 30, color: "#fff" }} />
                                    </LinearGradient>
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.detailRow}>
                            <View style={styles.detailMainBox}>
                                <View style={styles.detailHeadBox}>
                                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>Mobile</Text>
                                </View>
                                <View style={styles.detailBodyBox}>
                                    <Text style={{ color: "grey", fontSize: 20 }}>{getMobile}</Text>
                                </View>
                            </View>
                            <View style={styles.detailEditBox}>
                                <Pressable style={styles.editButton}>
                                    <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['#ec5093', '#e52ea4', '#d400bd', '#b200da', '#6e21fb']} style={[styles.editButton, styles.blockedbtn]}>
                                        <MCIcon name="pencil-off" style={{ fontSize: 30, color: "#fff" }} />
                                    </LinearGradient>
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.detailRow}>
                            <View style={styles.detailMainBox}>
                                <View style={styles.detailHeadBox}>
                                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>Password</Text>
                                </View>
                                <View style={styles.detailBodyBox}>
                                    <Text style={{ color: "grey", fontSize: 20 }}>{getPassword}</Text>
                                </View>
                            </View>
                            <View style={styles.detailEditBox}>
                                <Pressable style={styles.editButton} onPress={
                                    () => {
                                        setHeaderText("Password");
                                        setOpenModel(true);
                                    }
                                }>
                                    <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['#ec5093', '#e52ea4', '#d400bd', '#b200da', '#6e21fb']} style={styles.editButton}>
                                        <MCIcon name="pencil" style={{ fontSize: 30, color: "#fff" }} />
                                    </LinearGradient>
                                </Pressable>
                            </View>
                        </View>
                        <Pressable style={styles.profileUpdate} onPress={
                            async () => {

                                let userjson = await AsyncStorage.getItem("User");
                                let user = JSON.parse(userjson);

                                let form = new FormData();
                                form.append("id", user.id);
                                form.append("name", getName);
                                form.append("mobile", getMobile);
                                form.append("username", getUsername);
                                form.append("password", getPassword);

                                if (getImage != null) {
                                    form.append("profileImage",
                                        {
                                            name: "profile.png",
                                            type: "image/png",
                                            uri: getImage
                                        }
                                    );
                                }

                                let response = await fetch(
                                    "http://10.0.2.2:8080/Necho/updateProfile",
                                    {
                                        method: "POST",
                                        body: form
                                    }
                                );

                                if (response.ok) {
                                    let json = await response.json();

                                    if (json.success) {
                                        Alert.alert("Success", "User Successfully Updated");
                                    } else {
                                        Alert.alert("Error", json.message);
                                    }
                                }
                            }
                        }>
                            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>Update Account</Text>
                        </Pressable>
                        <Pressable style={styles.profileLogout} onPress={
                            ()=>{
                                setLogOutModel(true);
                            }
                        }>
                            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>Log Out</Text>
                        </Pressable>
                    </ScrollView>
                </View>
                <View style={styles.navBox}>
                    <Navbar />
                </View>
            </View>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    mainView: {
        backgroundColor: "#252331",
        width: "100%",
        height: "100%",
        flexDirection: "column",
    },

    imgBox: {
        flex: 3.5,
    },

    textBox: {
        flex: 1.6,
    },

    detailBox: {
        flex: 10,
    },

    navBox: {
        flex: 3,
    },

    backgroundImage: {
        flex: 1,
        backgroundColor: "#6B6A6A",
        justifyContent: "flex-end",
        alignItems: "center"
    },

    linearGradient: {
        width: "100%",
        height: "100%",
    },

    profielImgBox: {
        position: "absolute",
        width: 110,
        height: 110,
        borderRadius: 45,
        justifyContent: "center",
        alignItems: "center"
    },

    profileImg: {
        width: 100,
        height: 100,
        borderRadius: 40,
        borderWidth: 4,
        backgroundColor: "#909497",
        overflow: "hidden"
    },

    addProfileImg: {
        position: "absolute",
        width: 30,
        height: 30,
        backgroundColor: "#3498DB",
        borderRadius: 15,
        end: 140,
        bottom: 8,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center"
    },

    changeBackImg: {
        width: 40,
        height: 40,
        position: "absolute",
        top: 15,
        end: 0
    },

    changeIcon: {
        fontSize: 22,
        color: "#ffffff",
    },

    userNameBox: {
        flex: 1,
        alignItems: "center"
    },

    userDetailBox: {
        flex: 1,
        flexDirection: "row",
    },

    detailScroll: {
        flex: 1,
        paddingStart: 20,
        paddingEnd: 20,
        paddingTop: 15,
    },

    detailRow: {
        width: "100%",
        height: 70,
        marginTop: 10,
        flexDirection: "row"
    },

    detailMainBox: {
        flex: 8,
    },

    detailEditBox: {
        flex: 1.5,
        justifyContent: "center",
        alignItems: "flex-end"
    },

    detailHeadBox: {
        flex: 1,
    },

    detailBodyBox: {
        flex: 1.5,
    },

    profileDelete: {
        width: "100%",
        height: 60,
        backgroundColor: "red",
        marginTop: 15,
        marginBottom: 40,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    },

    editButton: {
        width: 50,
        height: 50,
        backgroundColor: "#000",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: 'center',
    },

    blockedbtn: {
        opacity: 0.4
    },

    profileUpdate: {
        width: "100%",
        height: 60,
        backgroundColor: "#ec5093",
        marginTop: 20,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    },

    profileLogout: {
        width: "100%",
        height: 60,
        backgroundColor: "#6e21fb",
        marginTop: 15,
        marginBottom: 40,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    },

    popusModalMain: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center"
    },

    popusModal: {
        width: "94%",
        height: 200,
        backgroundColor: "#252331",
        borderRadius: 25,
        borderColor: "#ec5093",
        borderWidth: 2,
        borderStyle: "solid",
        padding: 10,
        paddingStart: 20,
        paddingEnd: 20
    },

    popusHeaderBox: {
        flex: 1,
        justifyContent: "flex-end",
        paddingStart: 5
    },

    popusHeader: {
        color: "#fff",
        fontSize: 27,
        fontWeight: "bold"
    },

    popusBodyBox: {
        flex: 1.5,
        paddingTop: 10
    },

    popusBodyInput: {
        width: "100%",
        height: 50,
        borderRadius: 10,
        borderColor: "grey",
        borderWidth: 2,
        borderStyle: "solid",
        paddingStart: 10,
        color: "#fff",
    },

    popusButtonBox: {
        flex: 1.4,
        flexDirection: "row",
    },

    cancelBtn: {
        width: "95%",
        height: 50,
        backgroundColor: "#343145",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center"
    },

    changeBtn: {
        width: "95%",
        height: 50,
        backgroundColor: "#ec5093",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center"
    },

    BtnText: {
        color: "#fff",
        fontSize: 23,
        fontWeight: "bold",
    },

    popusDelete: {
        width: "94%",
        height: 265,
        backgroundColor: "#252331",
        borderRadius: 25,
        borderColor: "red",
        borderWidth: 2,
        borderStyle: "solid",
        padding: 10,
        paddingStart: 20,
        paddingEnd: 20
    },

    popupDeleteHeaderBox: {
        flex: 1,
        justifyContent: "center"
        // backgroundColor:"red"
    },

    popupDeleteBodyBox: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 5
        // backgroundColor:"green"
    },

    popupDeleteBtnBox: {
        flex: 2,
        justifyContent: "center",
        rowGap: 10
    },

    logoutbox: {
        width: "94%",
        height: 140,
        backgroundColor: "#252331",
        borderRadius: 25,
        borderColor: "#6e21fb",
        borderWidth: 2,
        borderStyle: "solid",
        padding: 10,
        paddingStart: 20,
        paddingEnd: 20
    },

    logoutHeaderBox: {
        flex: 1,
        paddingTop:8
        // backgroundColor: "red"
    },

    logoutBtnbox: {
        flex: 1.1,
        flexDirection: "row",
        // backgroundColor: "white"
    }
});