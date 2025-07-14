import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
    constructor(namespace = 'auth') {
        this.namespace = namespace
    }

    async getAccessToken() {
        try {
            const token = await AsyncStorage.getItem(`${this.namespace}:token`)
            return token
        } catch (error) {
            console.log(error)
        }
    }

    async setAccessToken(token) {
        try {
            await AsyncStorage.setItem(`${this.namespace}:token`, token)
        } catch (error) {
            console.log(error)
        }
    }

    async removeAccessToken() {
        try {
            await AsyncStorage.removeItem(`${this.namespace}:token`)
        } catch (error) {
            console.log(error)
        }
    }
}


export default AuthStorage