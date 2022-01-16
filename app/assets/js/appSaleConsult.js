firebase.initializeApp({
    apiKey: "AIzaSyDFvizMeBy5sAX2_PNrOPSkunMh79e_9J8",
        authDomain: "sales-e5df0.firebaseapp.com",
        projectId: "sales-e5df0",
        storageBucket: "sales-e5df0.appspot.com",
        messagingSenderId: "211703619206",
        appId: "1:211703619206:web:c78e40eb7548db0b783b07",
        measurementId: "G-2JXVKC9WBK"
});


var db = firebase.firestore();


function isLoggedIn() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            charge();
            count(db);
        } else {
            // User is signed out.
           window.location='../index.html';
            
        }
    
    });
}
function check(){
    fD = document.getElementById('inputSearchStart').value;
    sD = document.getElementById('inputSearchEnd').value;
    var _table = document.getElementById('tableFireStore');
    _table.innerHTML = ``;
    
    if(fD != '' && sD != ''){
        _table.innerHTML = ''; 
        db.collection("sales").orderBy("registerDate", "desc").onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var gD = new Date(doc.data().saleDate);
                var first = new Date(fD);
                var second = new Date(sD);
                if(gD.getTime() >= first.getTime() && gD.getTime() <= second.getTime()){
                    console.log(`${doc.id} => ${doc.data()}`);
            var purID = doc.data().purchaseID;
            
            var salRegDate = doc.data().registerDate;
            var salDate = doc.data().saleDate;
            var salBuyer = doc.data().buyer;
            var salL = doc.data().itsInL;
            if(doc.data().itsInL== null){
                salL = '';
            }else if(doc.data().itsInL == true){
                salL = 'YES';
            }
            else{
                salL = 'NO';
            }
            var salOther = doc.data().otherBuyer;
            if(doc.data().otherBuyer == null || doc.data().otherBuyer == ''){
                salOther = '';
            }else{
                salOther = doc.data().otherBuyer;
            }
            var salPri = doc.data().salePrice;
            getPurchaseData(_table,purID,salRegDate,salDate,salBuyer,salL,salOther,salPri);
                }
            })
        })
    }
}

function charge(){
    var _table = document.getElementById('tableFireStore');
    db.collection("sales").orderBy("registerDate", "desc").onSnapshot((querySnapshot) => {
        _table.innerHTML = '';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            var purID = doc.data().purchaseID;
            
            var salRegDate = doc.data().registerDate;
            var salDate = doc.data().saleDate;
            var salBuyer = doc.data().buyer;
            var salL = doc.data().itsInL;
            if(doc.data().itsInL== null){
                salL = '';
            }else if(doc.data().itsInL == true){
                salL = 'YES';
            }
            else{
                salL = 'NO';
            }
            var salOther = doc.data().otherBuyer;
            if(doc.data().otherBuyer == null || doc.data().otherBuyer == ''){
                salOther = '';
            }else{
                salOther = doc.data().otherBuyer;
            }
            var salPri = doc.data().salePrice;

            getPurchaseData(_table,purID,salRegDate,salDate,salBuyer,salL,salOther,salPri);
        });
    });
}


function getPurchaseData(_table,purID,salRegDate,salDate,salBuyer,salL,salOther,salPri){
    
    db.collection("purchases").onSnapshot((querySnapshot) => {
        querySnapshot.forEach((docP) => {
            if(docP.id == purID){
                var purYe;
            var purMa;
            var purMo;
            var purZip;
            var purSta;
            purYe = docP.data().year;
            purMa = docP.data().make;
            purMo = docP.data().model;
            purZip = docP.data().zipcode;
            purSta = docP.data().state;
                printTable(_table,purYe,purMa,purMo,purZip,purSta,salRegDate,salDate,salBuyer,salL,salOther,salPri);

                
            }
            

        });
    });

}

function printTable(_table,purYe,purMa,purMo,purZip,purSta,salRegDate,salDate,salBuyer,salL,salOther,salPri){
    _table.innerHTML += `
    <tr>
    <td>${salRegDate}</td>
    <td>${salDate}</td>
    <td>${purYe} ${purMa} ${purMo} - ${purZip} - ${purSta}</td>
    <td>${salBuyer}</td>
    <td>${salL}</td>
    <td>${salOther}</td>
    <td>${salPri}</td>
    </tr>
    `;
}

var f = new Date();
var fechaString = f.getFullYear()+"-"+(f.getMonth()+1)+"-"+f.getDate();
document.getElementById('inputSearchStart').setAttribute("max",fechaString);
document.getElementById('inputSearchEnd').setAttribute("max",fechaString);
var firstDate;
var secondDate;
var fD;
var sD;

$('#inputSearchStart').on('change', function (ev) {
    firstDate = $(this).val();
    fD = new Date(firstDate);
    checkIf();
 });

 $('#inputSearchEnd').on('change', function (ev) {
    secondDate = $('inputSearchEnd').val();
    sD = new Date(secondDate);
    checkIf();
 });

function checkIf(){
    fD = document.getElementById('inputSearchStart').value;
    sD = document.getElementById('inputSearchEnd').value;


    if(fD == ''){
        alert("Select a Start Date")
    }
    if(sD == ''){
        alert("Select an End Date")
    }
    if(fD != '' && sD != ''){
        check();
    }
}
