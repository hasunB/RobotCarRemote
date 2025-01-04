import AsyncStorage from "@react-native-async-storage/async-storage";

async function Test(){
    await AsyncStorage.setItem("User",JSON.stringify(data));

    let userJson = await AsyncStorage.getItem("User");
    let user = JSON.parse(userJson);

    
}