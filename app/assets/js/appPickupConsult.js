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
            loadup();
            count(db);
        } else {
            // User is signed out.
           window.location='../index.html';
            
        }
    
    });
}

function deleteRecord(id) {
    if(confirm('Are you sure you want to delete this pickup?')){
        db.collection("pickups").doc(id).delete().then(function() {
            alert("Pickup successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }else{
        alert("Nothing has been done!");
    }
}

var _table = document.getElementById('tableFireStore');
function loadup(){

//db.collection("purchases").orderBy("registerDate")
db.collection("pickups").orderBy("registerDate", "desc").onSnapshot((querySnapshot) => {



    _table.innerHTML = '';


    var check;
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);

        if (doc.data().hasBeenPickedUp == false){
            check ='btn-danger';
        }else{
            check='btn-success';
        }

        _table.innerHTML += `
        <tr>
        <td><button class="btn btn-warning btn-sm" onclick="deleteRecord('${doc.id}')">Delete</button></td>
        <td>
        <button id="${doc.id}" onclick="editPicked('${doc.id}','${check}')" type="button" class="btn ${check} btn-sm"><b id="${doc.id}-text"></b></button></td>
        <td>${doc.data().registerDate}</td>
        <td>${doc.data().address}</td>
        <td><img src="${doc.data().idfile}" style="max-width:130px;">
        </td>
        <td><img src="${doc.data().inquiryfile}" style="max-width:130px;">
        </td>
        <td>${doc.data().phone}</td>
        <td>${doc.data().price}</td>
        <td>${doc.data().year}</td>
        <td>${doc.data().make}</td>
        <td>${doc.data().model}</td>
        <td>${doc.data().color}</td>
        <td id="${doc.id}-pic"><b style="color:white;">${doc.data().pickupDate}</td>
        <td>${doc.data().pickupTime}</td>
        </tr>
        `;

        if(check=="btn-danger"){
            document.getElementById(doc.id+'-text').textContent = "Not Picked Up Yet";
            document.getElementById(doc.id+'-pic').style.backgroundColor = 'red';
        }
        if(check=='btn-success'){
            document.getElementById(doc.id+'-text').textContent = "Picked Up";
            document.getElementById(doc.id+'-pic').style.backgroundColor = 'green';
        }
    });
});
count(db);
}

function editPicked(id,check){

if(check =='btn-danger')
    db.collection("pickups").doc(id).update({
        hasBeenPickedUp: true
    }).then(function() {
        var stat = true;
        changeButton(id, stat);
        loadup();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
else{
    db.collection("pickups").doc(id).update({
        hasBeenPickedUp: false
    }).then(function() {
        var stat = true;
        changeButton(id, stat);
        loadup();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}    

}

function changeButton(id, stat){
    if(stat == true){
        document.getElementById(id).classList.remove('btn-danger');
        document.getElementById(id).classList.add('btn-success');
        document.getElementById(id+'-text').textContent = "Picked Up";
        //document.getElementById(id+"-pic").classList.remove('redFont');
        //document.getElementById(id+"-pic").classList.add('greenFont');
    }else{
        document.getElementById(id).classList.remove('btn-success');
        document.getElementById(id).classList.add('btn-danger');
        document.getElementById(id+'-text').textContent = "Not Picked Up Yet";
        //document.getElementById(id+"-pic").classList.remove('greenFont');
        //document.getElementById(id+"-pic").classList.add('redFont');
    }
   
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

_table.innerHTML = ''; 

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
function check(){
     
     fD = document.getElementById('inputSearchStart').value;
     sD = document.getElementById('inputSearchEnd').value;



     if(fD != '' && sD != ''){
        _table.innerHTML = ''; 
        db.collection("pickups").orderBy("registerDate", "desc").onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var gD = new Date(doc.data().pickupDate);
                var first = new Date(fD);
                var second = new Date(sD);
                if(gD.getTime() >= first.getTime() && gD.getTime() <= second.getTime()){
                    
                    var check;
                    if (doc.data().hasBeenPickedUp == false){
                        check ='btn-danger';
                    }else{
                        check='btn-success';
                    }
            
                    _table.innerHTML += `
                    <tr>
                    <td><button class="btn btn-warning btn-sm" onclick="deleteRecord('${doc.id}')">Delete</button></td>
                    <td>
                    <button class="btn ${check} btn-md" id="${doc.id}" onclick="editPicked('${doc.id}')"><b id="${doc.id}-text" style="text-weight: bold; font-size: 16px;"></b></button>
                    </td>
                    <td>${doc.data().registerDate}</td>
                    <td>${doc.data().address}</td>
                    <td><img src="${doc.data().idfile}" style="max-width:130px;">
                    </td>
                    <td><img src="${doc.data().inquiryfile}" style="max-width:130px;">
                    </td>
                    <td>${doc.data().phone}</td>
                    <td>${doc.data().price}</td>
                    <td>${doc.data().year}</td>
                    <td>${doc.data().make}</td>
                    <td>${doc.data().model}</td>
                    <td>${doc.data().color}</td>
                    <td id="${doc.id}-pic"><b style="color:white;">${doc.data().pickupDate}</td>
                    <td>${doc.data().pickupTime}</td>
                    </tr>
                    `;

                    if(check=="btn-danger"){
                        document.getElementById(doc.id+'-text').textContent = "Not Picked Up Yet";
                        document.getElementById(doc.id+'-pic').style.backgroundColor = 'red';
                    }
                    if(check=='btn-success'){
                        document.getElementById(doc.id+'-text').textContent = "Picked Up";
                        document.getElementById(doc.id+'-pic').style.backgroundColor = 'green';
                    }
                }
            })
        })
     }
 }
