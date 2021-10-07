// config 
const firebaseConfig = {
    apiKey: "AIzaSyBOP5BwiCVfYsGt1CgDMWhdabEdxsMwFY8",
    authDomain: "snake-ea88f.firebaseapp.com",
    databaseURL: "https://snake-ea88f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "snake-ea88f",
    storageBucket: "snake-ea88f.appspot.com",
    messagingSenderId: "698454681143",
    appId: "1:698454681143:web:ffc50565c9cf4e00b2c1b2"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database().ref("snake/highscore");

function submitHighScore(gamerName, score) {
    let data = {
        name: gamerName,
        score: score
    }
    database.set(data);
    database.on("value", function (snapshot) {
        console.log(snapshot);
    });
}
