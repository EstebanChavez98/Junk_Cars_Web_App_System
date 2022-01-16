/*firebase.initializeApp({
    apiKey: "AIzaSyDFvizMeBy5sAX2_PNrOPSkunMh79e_9J8",
        authDomain: "sales-e5df0.firebaseapp.com",
        projectId: "sales-e5df0",
        storageBucket: "sales-e5df0.appspot.com",
        messagingSenderId: "211703619206",
        appId: "1:211703619206:web:c78e40eb7548db0b783b07",
        measurementId: "G-2JXVKC9WBK"
});*/

function count(db){
    var notif = document.getElementById('count');
    var cont = 0

    db.collection("pickups").where('hasBeenPickedUp', '==', false).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            cont += 1;
        });
        if(cont > 0){
            notif.style.display = 'block';
            notif.textContent = cont.toString();
        }else{
            notif.textContent = '';
            notif.style.display = 'none';
        }
    })
}