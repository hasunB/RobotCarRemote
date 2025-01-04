import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Image, Alert, ScrollView, ImageBackground } from "react-native";
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome5'
import { Navbar } from "./components/Navbar.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from 'expo-linear-gradient';


export default function App() {

    return (
        <SafeAreaView>
            <View style={styles.mainView}>
                <View style={styles.View1}>
                    <View style={styles.header}>
                        <View style={styles.headerBox1}>
                            <Text style={styles.headertext}>Necho</Text>
                        </View>
                        <View style={styles.headerBox2}>
                            <MCIcon name="square-edit-outline" style={styles.headerIcon} />
                        </View>
                    </View>
                    <ScrollView >
                        <View style={styles.storyBox}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.storyScroll}>
                                <Pressable>
                                    <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['#ec5093', '#e52ea4', '#d400bd', '#b200da', '#6e21fb']} style={[styles.story]}>
                                        <View style={styles.innerStory}></View>
                                    </LinearGradient>
                                </Pressable>
                                <Pressable>
                                    <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['#ec5093', '#e52ea4', '#d400bd', '#b200da', '#6e21fb']} style={[styles.story]}>
                                        <View style={styles.innerStory}></View>
                                    </LinearGradient>
                                </Pressable>
                                <Pressable>
                                    <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['#ec5093', '#e52ea4', '#d400bd', '#b200da', '#6e21fb']} style={[styles.story]}>
                                        <View style={styles.innerStory}></View>
                                    </LinearGradient>
                                </Pressable>
                                <Pressable>
                                    <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['#ec5093', '#e52ea4', '#d400bd', '#b200da', '#6e21fb']} style={[styles.story]}>
                                        <View style={styles.innerStory}></View>
                                    </LinearGradient>
                                </Pressable>
                                <Pressable>
                                    <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['#ec5093', '#e52ea4', '#d400bd', '#b200da', '#6e21fb']} style={[styles.story, styles.storyWatched]}>
                                        <View style={styles.innerStory}></View>
                                    </LinearGradient>
                                </Pressable>
                                <Pressable>
                                    <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['#ec5093', '#e52ea4', '#d400bd', '#b200da', '#6e21fb']} style={[styles.story, styles.storyWatched]}>
                                        <View style={styles.innerStory}></View>
                                    </LinearGradient>
                                </Pressable>
                                <Pressable>
                                    <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['#ec5093', '#e52ea4', '#d400bd', '#b200da', '#6e21fb']} style={[styles.story, styles.storyWatched]}>
                                        <View style={styles.innerStory}></View>
                                    </LinearGradient>
                                </Pressable>
                            </ScrollView>
                        </View>
                        <View style={styles.postsBox}>
                            <ImageBackground source={require("../assets/man.jpeg")} style={styles.pastCard} imageStyle={{ borderRadius: 20 }}>
                                <LinearGradient colors={['transparent', 'transparent', '#252331']} style={{ width: "100%", height: "100%" }}>
                                    <View style={styles.senderImageBox}></View>
                                    <View style={styles.postUser}>
                                        <View style={styles.postUserInner}>
                                            <MCIcon name="cards-heart" style={{ color: "#fff", fontSize: 35 }} />
                                            <Text style={{ color: "#fff", fontSize: 22, marginStart: 10 }}>1.2M</Text>
                                        </View>
                                        <View style={styles.postUserInner}>
                                            <FAIcon name="comment-dots" style={{ color: "#fff", fontSize: 35 }} />
                                            <Text style={{ color: "#fff", fontSize: 22, marginStart: 10 }}>1.2M</Text>
                                        </View>
                                        <View style={styles.postUserInner}>
                                            <FAIcon name="share" style={{ color: "#fff", fontSize: 35 }} />
                                            <Text style={{ color: "#fff", fontSize: 22, marginStart: 10 }}>1.2M</Text>
                                        </View>
                                    </View>
                                </LinearGradient>
                            </ImageBackground>
                            <ImageBackground source={require("../assets/man.jpeg")} style={styles.pastCard} imageStyle={{ borderRadius: 20 }}>
                                <LinearGradient colors={['transparent', 'transparent', '#252331']} style={{ width: "100%", height: "100%" }}>
                                    <View style={styles.senderImageBox}></View>
                                    <View style={styles.postUser}>
                                        <View style={styles.postUserInner}>
                                            <MCIcon name="cards-heart" style={{ color: "#fff", fontSize: 35 }} />
                                            <Text style={{ color: "#fff", fontSize: 22, marginStart: 10 }}>1.2M</Text>
                                        </View>
                                        <View style={styles.postUserInner}>
                                            <FAIcon name="comment-dots" style={{ color: "#fff", fontSize: 35 }} />
                                            <Text style={{ color: "#fff", fontSize: 22, marginStart: 10 }}>1.2M</Text>
                                        </View>
                                        <View style={styles.postUserInner}>
                                            <FAIcon name="share" style={{ color: "#fff", fontSize: 35 }} />
                                            <Text style={{ color: "#fff", fontSize: 22, marginStart: 10 }}>1.2M</Text>
                                        </View>
                                    </View>
                                </LinearGradient>
                            </ImageBackground>
                            <ImageBackground source={require("../assets/man.jpeg")} style={styles.pastCard} imageStyle={{ borderRadius: 20 }}>
                                <LinearGradient colors={['transparent', 'transparent', '#252331']} style={{ width: "100%", height: "100%" }}>
                                    <View style={styles.senderImageBox}></View>
                                    <View style={styles.postUser}>
                                        <View style={styles.postUserInner}>
                                            <MCIcon name="cards-heart" style={{ color: "#fff", fontSize: 35 }} />
                                            <Text style={{ color: "#fff", fontSize: 22, marginStart: 10 }}>1.2M</Text>
                                        </View>
                                        <View style={styles.postUserInner}>
                                            <FAIcon name="comment-dots" style={{ color: "#fff", fontSize: 35 }} />
                                            <Text style={{ color: "#fff", fontSize: 22, marginStart: 10 }}>1.2M</Text>
                                        </View>
                                        <View style={styles.postUserInner}>
                                            <FAIcon name="share" style={{ color: "#fff", fontSize: 35 }} />
                                            <Text style={{ color: "#fff", fontSize: 22, marginStart: 10 }}>1.2M</Text>
                                        </View>
                                    </View>
                                </LinearGradient>
                            </ImageBackground>
                            <ImageBackground source={require("../assets/man.jpeg")} style={styles.pastCard} imageStyle={{ borderRadius: 20 }}>
                                <LinearGradient colors={['transparent', 'transparent', '#252331']} style={{ width: "100%", height: "100%" }}>
                                    <View style={styles.senderImageBox}></View>
                                    <View style={styles.postUser}>
                                        <View style={styles.postUserInner}>
                                            <MCIcon name="cards-heart" style={{ color: "#fff", fontSize: 35 }} />
                                            <Text style={{ color: "#fff", fontSize: 22, marginStart: 10 }}>1.2M</Text>
                                        </View>
                                        <View style={styles.postUserInner}>
                                            <FAIcon name="comment-dots" style={{ color: "#fff", fontSize: 35 }} />
                                            <Text style={{ color: "#fff", fontSize: 22, marginStart: 10 }}>1.2M</Text>
                                        </View>
                                        <View style={styles.postUserInner}>
                                            <FAIcon name="share" style={{ color: "#fff", fontSize: 35 }} />
                                            <Text style={{ color: "#fff", fontSize: 22, marginStart: 10 }}>1.2M</Text>
                                        </View>
                                    </View>
                                </LinearGradient>
                            </ImageBackground>
                        </View>
                    </ScrollView>
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
        backgroundColor: "#252331",
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
        paddingTop: 5
    },

    headerBox1: {
        flex: 1
    },

    headerBox2: {
        flex: 1,
        alignItems: "flex-end"
    },

    headertext: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff",
        paddingVertical: 10,
        paddingStart: 20
    },

    headerIcon: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#ec5093",
        paddingVertical: 17,
        paddingEnd: 20
    },

    storyBox: {
        width: "100%",
        height: 100,
        paddingStart: 20
    },

    story: {
        width: 100,
        height: 100,
        backgroundColor: "#000",
        borderRadius: 100,
        marginEnd: 15,
        justifyContent: "center",
        alignItems: "center"
    },

    storyWatched: {
        opacity: 0.3
    },

    innerStory: {
        width: 94,
        height: 94,
        backgroundColor: "#000",
        borderRadius: 50,
    },

    postsBox: {
        width: "100%",
        height: "auto",
        marginTop: 35,
        paddingStart: 15,
        paddingEnd: 15
    },

    pastCard: {
        width: "100%",
        height: 400,
        backgroundColor: "#000",
        marginBottom: 50,
        borderRadius: 20,
    },

    postUser: {
        width: "100%",
        height: 50,
        marginTop: 340,
        flexDirection:"row"
    },

    postUserInner: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems:"center",
    },

    senderImageBox:{
        position:"absolute",
        width: 70,
        height: 70,
        borderRadius:35,
        backgroundColor:"#000",
        top: 10,
        end: 10
    }

});