/*firebase.initializeApp({
    apiKey: "AIzaSyDFvizMeBy5sAX2_PNrOPSkunMh79e_9J8",
        authDomain: "sales-e5df0.firebaseapp.com",
        projectId: "sales-e5df0",
        storageBucket: "sales-e5df0.appspot.com",
        messagingSenderId: "211703619206",
        appId: "1:211703619206:web:c78e40eb7548db0b783b07",
        measurementId: "G-2JXVKC9WBK"
});*/

var db = firebase.firestore();

function isLoggedIn() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            count(db);
        } else {
            // User is signed out.
           window.location='../index.html';
            
        }
    
    });
    }

function registerPurchase()
{
    window.location='purchaseRegister.html'
}

function salePurchase()
{
    window.location='saleRegister.html'
}
