// config 
const firebaseConfig = {
    apiKey: "AIzaSyCr-fffFibV_HbKCtPvo-p3lIdVKlPGKVE",
    authDomain: "lezione-db.firebaseapp.com",
    databaseURL: "https://lezione-db-default-rtdb.firebaseio.com",
    projectId: "lezione-db",
    storageBucket: "lezione-db.appspot.com",
    messagingSenderId: "1007031926834",
    appId: "1:1007031926834:web:e4fe569becc4cec78d3c2b"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database().ref("snake/highscore");

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
