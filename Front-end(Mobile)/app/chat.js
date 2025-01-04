import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView, Pressable, Alert } from "react-native";
import IIcon from 'react-native-vector-icons/Ionicons';
import SLIcon from 'react-native-vector-icons/SimpleLineIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EIcon from 'react-native-vector-icons/Entypo';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { FlashList } from "@shopify/flash-list";

export default function chat() {

    const item = useLocalSearchParams();
    // console.log(item.otherUserId);

    const [getChatArray, SetChatArray] = useState([]);
    const [getChat, setChat] = useState([]);

    useEffect(
        () => {
            async function fetchChatArray() {

                let userjson = await AsyncStorage.getItem("User");
                let user = JSON.parse(userjson);

                let response = await fetch("http://10.0.2.2:8080/Necho/loadChat?userId=" + user.id + "&otherUserId=" + item.otherUserId);
                if (response.ok) {
                    let chatArray = await response.json();
                    SetChatArray(chatArray);
                    // console.log(chatArray);
                }

            }

            fetchChatArray();

            setInterval(()=>{
                fetchChatArray();
            },10000);
        }, []
    );

    return (
        <SafeAreaView>
            <View style={styles.mainView}>
                <View style={styles.nameBox}>
                    <Pressable style={styles.backBox} onPress={() => { router.back("/home") }}>
                        <IIcon name="arrow-back" style={styles.backIcon} />
                    </Pressable>
                    <View style={styles.senderNameBox}>
                        <View>
                            {
                                item.profileImageFound == "true" ?
                                    <Image style={styles.senderImg} source={{ uri: "http://10.0.2.2:8080/Necho/ProfileImages/" + item.otherUserMobile + ".png" }} />
                                    :
                                    <Image style={styles.senderImg} source={require('../assets/icon.png')} />
                            }
                        </View>
                        <View>
                            <Text style={styles.senderName}>{item.otherUserName}</Text>
                            <Text style={styles.senderUserName}>{item.otherUserStatus == 1 ? "Online" : "offline"}</Text>
                        </View>
                    </View>
                    <View style={styles.senderOptions}>
                        <SLIcon name="options-vertical" style={styles.optionIcon} />
                    </View>
                </View>
                <View style={styles.chatBox}>
                    <FlashList
                        data={getChatArray}
                        renderItem={
                            ({ item }) =>
                                <View style={item.Side == "right" ? styles.chatViewRight : styles.chatViewLeft}>
                                    <View style={item.Side == "right" ? styles.textViewRight : styles.textViewLeft}>
                                        <Text style={styles.msg}>{item.message}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 4 }}>
                                        <Text style={{ fontSize: 12, color: "#fff" }}>{item.datetime}</Text>
                                        {item.Side == "right" ? <MCIcon name={item.status == 2 ? "check-all" : "check"} size={16} style={item.status == 2 ? styles.chatIconSeen : styles.chatIconSent} /> : null}
                                    </View>
                                </View>
                        }
                        estimatedItemSize={200}
                    />
                </View>
                <View style={styles.sendBox}>
                    <View style={styles.msgSendBox}>
                        <View style={styles.addFileBox}>
                            <MCIcon name="plus" style={{ fontSize: 30, marginStart: 8, color: "#6c7782" }} />
                        </View>
                        <View style={styles.msgBox}>
                            <TextInput style={{ marginStart: 10, color: "#fff" }} placeholder="Type a Message..." placeholderTextColor={"#6c7782"} value={getChat} onChangeText={
                                (text) => {
                                    setChat(text);
                                }
                            } />
                        </View>
                        <View style={styles.emojiBox}>
                            <EIcon name="emoji-happy" style={{ fontSize: 30, color: "#6c7782" }} />
                        </View>
                        <View style={styles.sendIconBox}>
                            <Pressable style={styles.sendButton} onPress={
                                async () => {

                                    if (getChat.length == 0) {
                                        Alert.alert("Warning", "Type your message");
                                    } else {
                                        let userjson = await AsyncStorage.getItem("User");
                                        let user = JSON.parse(userjson);
                                        let response = await fetch("http://10.0.2.2:8080/Necho//sendChat?userId=" + user.id + "&otherUserId=" + item.otherUserId + "&message=" + getChat);

                                        if (response.ok) {
                                            let json = await response.json();

                                            if (json.success) {
                                                setChat("");
                                            } else {
                                                Alert.alert("Error", "Internal Server Error");
                                            }

                                        }
                                    }


                                }
                            }>
                                <IIcon name="send" style={{ fontSize: 25, color: "#fff" }} />
                            </Pressable>
                        </View>
                    </View>
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

    nameBox: {
        flex: 2,
        flexDirection: "row",
        paddingTop: 15
    },

    chatBox: {
        flex: 24,
        marginTop: 15,
    },

    sendBox: {
        flex: 3,
        alignItems: "center",
    },

    backBox: {
        flex: 1,
        alignItems: "center",
    },

    senderNameBox: {
        flex: 5,
        flexDirection: "row",
    },

    senderOptions: {
        flex: 1,
        alignItems: "center",
    },

    backIcon: {
        fontSize: 30,
        color: "#fff",
        marginTop: 10,
        marginBottom: -5
    },

    optionIcon: {
        fontSize: 25,
        color: "#fff",
        marginTop: 17,
        marginBottom: -12
    },

    senderImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginTop: 4,
        marginStart: 20,
    },

    senderName: {
        color: "#fff",
        fontSize: 19,
        fontWeight: "bold",
        marginStart: 12,
        marginTop: 5
    },

    senderUserName: {
        marginStart: 12,
        color: "grey"
    },

    chatList: {
        width: "100%"
    },

    chatViewLeft: {
        minWidth: 80,
        maxWidth: 300,
        borderRadius: 15,
        alignSelf: "flex-start",
        marginStart: 15,
        marginTop: 5,
    },

    chatViewRight: {
        minWidth: 80,
        maxWidth: 300,
        borderRadius: 15,
        alignSelf: "flex-end",
        marginEnd: 15,
        marginTop: 15,
    },

    textViewLeft: {
        backgroundColor: "#343145",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 15,
    },

    textViewRight: {
        backgroundColor: "#ec5093",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 15,
    },

    chatView1: {
        flexDirection: "row",
        alignItems: "center",
    },

    chat: {
        flex: 1,
        alignItems: "center"
    },

    chatText1: {
        fontSize: 28,
        paddingVertical: 15,
        color: "#000",
        fontFamily: "JosefinSans"
    },

    chatText2: {
        fontSize: 24,
        paddingVertical: 8,
        color: "#000",
    },

    msg: {
        fontSize: 20,
        color: "#fff",
    },

    chatIconSeen: {
        marginStart: 7,
        color: "#00E0FF",
    },

    chatIconSent: {
        marginStart: 6,
    },

    msgSendBox: {
        backgroundColor: "#1e1d26",
        width: "90%",
        height: 60,
        marginTop: 8,
        borderRadius: 60,
        flexDirection: "row",
    },

    addFileBox: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },

    msgBox: {
        flex: 9,
        justifyContent: "center",
    },

    emojiBox: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },

    sendIconBox: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
    },

    sendButton: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ec5093",
        borderRadius: 25
    }


});