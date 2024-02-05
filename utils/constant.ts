import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

// export const API_URL = "http://localhost:5200/api/v1";
export const API_URL = "https://eranda-backend.onrender.com/api/v1";

export async function setupSocket() {
    const token = await AsyncStorage.getItem('token');
    console.log(token)
    if(token){
        return io("wss://eranda-backend.onrender.com", {
        extraHeaders: {
            Authorization: `Bearer ${token}`,
        }
    });
    }
  
}

export let socket:any;

(async () => {
    socket = await setupSocket();
})();










// import io from 'socket.io-client';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// export const API_URL = "https://eranda-backend.onrender.com/api/v1"
// const token = await AsyncStorage.getItem('token');
// export   const socket = io("ws://localhost:5200", {
//     extraHeaders: {
//       Authorization: `Bearer ${token}`, }});


