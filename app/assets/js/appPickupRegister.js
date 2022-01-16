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


var f = new Date();
var date = ("0" + f.getDate()).slice(-2);
var month = ("0" + (f.getMonth() + 1)).slice(-2);



var fechaString = f.getFullYear()+"-"+(month)+"-"+(date);
console.log(fechaString);
var datepicker = document.getElementById('inputPicDate');

var file;
$("#inputFileID").change(function (e) {
    file = e.target.files[0];
})

var car;
$("#inputFileInquiry").change(function (e) {
    car = e.target.files[0];
})

function check(){
    /*var msn = 'Check if '
    var _firstName = document.getElementById('inputBuyFirstName').value;
    var _lastName = document.getElementById('inputBuyLastName').value;
    var _year = document.getElementById('inputBuyYear').value;
    var _make = document.getElementById('inputBuyMake').value;
    var _model = document.getElementById('inputBuyModel').value;
    var _color = document.getElementById('inputBuyColor').value;
    var _phone = document.getElementById('inputBuyPhone').value;
    var _zip = document.getElementById('inputBuyZIP').value;
    var _purchasePrice = document.getElementById('inputBuyPrice').value;
    var _cats = document.getElementById('inputBuyCats').value;
    var _file = document.getElementById('inputFile');

    if(_firstName == '') {

    }
    else if (_lastName == '') {}
    else if (_firstName == '') {}
    else if (_year == '') {}
    else if (_make == '') {}
    else if (_model == '') {}
    else if (_color == '') {}
    else if (_phone == '') {}
    else if (_zip == '') {}
    else if (_purchasePrice == '') {}
    else if (_cats == '') {}
    else if (_file.files.length == 0) {}*/
}



function valide(){
    if(confirm('Are you sure to schedule this pickup?')){
        save();
    }else{
        alert('Nothing has been done!');
    }

}



function save(){
    var _registerDate = fechaString;
    var _address = document.getElementById('inputPicAddress').value.toUpperCase().trim();
    var _phone = document.getElementById('inputPicPhone').value;
    var _price = document.getElementById('inputPicPrice').value;
    var _year = document.getElementById('inputPicYear').value.trim();
    var _make = document.getElementById('inputPicMake').value.toUpperCase().trim();
    var _model = document.getElementById('inputPicModel').value.toUpperCase().trim();
    var _color = document.getElementById('inputPicColor').value.toUpperCase().trim();
    var _pickupDate = datepicker.value;
    var _time = document.getElementById('inputPicTime').value;

    //var _dni = 'hi';
    if(document.getElementById('inputFileID').files.length != 0 && document.getElementById('inputFileInquiry').files.length != 0){
        const storageRef = firebase.storage().ref('photos/'+car.name);
        const task = storageRef.put(car);
        task.then(function(snapshot){
            task.snapshot.ref.getDownloadURL().then((url)=>{

                var _inquiry = url;

                const storageRefs = firebase.storage().ref('photos/'+file.name);
                const tasks = storageRefs.put(file);
                tasks.then(function(snapshot){
                    tasks.snapshot.ref.getDownloadURL().then((urls)=>{


                var _id = urls;

                db.collection("pickups").add({
                    registerDate: _registerDate,
                    address: _address,
                    pickupDate: _pickupDate,
                    pickupTime: _time,
                    idfile: _id,
                    inquiryfile: _inquiry,
                    phone: _phone,
                    price: _price,
                    year: _year,
                    make: _make,
                    model: _model,
                    color: _color,
                    hasBeenPickedUp: false
                })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    document.getElementById('inputPicDate').value = '';
                    document.getElementById('inputPicAddress').value = '';
                    document.getElementById('inputPicPhone').value = '';
                    document.getElementById('inputPicPrice').value = '';
                    document.getElementById('inputPicYear').value = '';
                    document.getElementById('inputPicMake').value = '';
                    document.getElementById('inputPicModel').value = '';
                    document.getElementById('inputPicColor').value = '';
                    document.getElementById('inputPicTime').value = '';
                    document.getElementById('inputFileID').value = '';
                    document.getElementById('yourID').src = '';
                    document.getElementById('inputFileInquiry').value = '';
                    document.getElementById('yourInquiry').src = '';
                    alert("The Pickup has been registered successfully");
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                    alert("An Unexpected Error just happened... Try Again");
                });  
            });
        }); 
    });
});
}else if(document.getElementById('inputFileID').files.length == 0 && document.getElementById('inputFileInquiry').files.length != 0){
        const storageRef = firebase.storage().ref('photos/'+car.name);
        const task = storageRef.put(car);
        task.then(function(snapshot){
            task.snapshot.ref.getDownloadURL().then((url)=>{
                var _inquiry = url;
                db.collection("pickups").add({
                    registerDate: _registerDate,
                    address: _address,
                    pickupDate: _pickupDate,
                    pickupTime: _time,
                    idfile: null,
                    inquiryfile: _inquiry,
                    phone: _phone,
                    price: _price,
                    year: _year,
                    make: _make,
                    model: _model,
                    color: _color,
                    hasBeenPickedUp: false
                })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    document.getElementById('inputPicDate').value = '';
                    document.getElementById('inputPicAddress').value = '';
                    document.getElementById('inputPicPhone').value = '';
                    document.getElementById('inputPicPrice').value = '';
                    document.getElementById('inputPicYear').value = '';
                    document.getElementById('inputPicMake').value = '';
                    document.getElementById('inputPicModel').value = '';
                    document.getElementById('inputPicColor').value = '';
                    document.getElementById('inputPicTime').value = '';
                    document.getElementById('inputFileID').value = '';
                    document.getElementById('yourID').src = '';
                    document.getElementById('inputFileInquiry').value = '';
                    document.getElementById('yourInquiry').src = '';
                    alert("The Pickup has been registered successfully");
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                    alert("An Unexpected Error just happened... Try Again");
                });  
            });
        }); 
    
}else if(document.getElementById('inputFileID').files.length != 0 && document.getElementById('inputFileInquiry').files.length == 0){
    const storageRef = firebase.storage().ref('photos/'+file.name);
        const task = storageRef.put(file)
        task.then(function(snapshot){
            task.snapshot.ref.getDownloadURL().then((url)=>{
                var _id = url;
                db.collection("pickups").add({
                    registerDate: _registerDate,
                    address: _address,
                    pickupDate: _pickupDate,
                    pickupTime: _time,
                    idfile: _id,
                    inquiryfile: null,
                    phone: _phone,
                    price: _price,
                    year: _year,
                    make: _make,
                    model: _model,
                    color: _color,
                    hasBeenPickedUp: false
                })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    document.getElementById('inputPicDate').value = '';
                    document.getElementById('inputPicAddress').value = '';
                    document.getElementById('inputPicPhone').value = '';
                    document.getElementById('inputPicPrice').value = '';
                    document.getElementById('inputPicYear').value = '';
                    document.getElementById('inputPicMake').value = '';
                    document.getElementById('inputPicModel').value = '';
                    document.getElementById('inputPicColor').value = '';
                    document.getElementById('inputPicTime').value = '';
                    document.getElementById('inputFileID').value = '';
                    document.getElementById('yourID').src = '';
                    document.getElementById('inputFileInquiry').value = '';
                    document.getElementById('yourInquiry').src = '';
                    alert("The Pickup has been registered successfully");
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                    alert("An Unexpected Error just happened... Try Again");
                });  
            });
        }); 
    }else{
        db.collection("pickups").add({
                    registerDate: _registerDate,
                    address: _address,
                    pickupDate: _pickupDate,
                    pickupTime: _time,
                    idfile: null,
                    inquiryfile: null,
                    phone: _phone,
                    price: _price,
                    year: _year,
                    make: _make,
                    model: _model,
                    color: _color,
                    hasBeenPickedUp: false
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
                    document.getElementById('inputPicDate').value = '';
                    document.getElementById('inputPicAddress').value = '';
                    document.getElementById('inputPicPhone').value = '';
                    document.getElementById('inputPicPrice').value = '';
                    document.getElementById('inputPicYear').value = '';
                    document.getElementById('inputPicMake').value = '';
                    document.getElementById('inputPicModel').value = '';
                    document.getElementById('inputPicColor').value = '';
                    document.getElementById('inputPicTime').value = '';
                    document.getElementById('inputFileID').value = '';
                    document.getElementById('yourID').src = '';
                    document.getElementById('inputFileInquiry').value = '';
                    document.getElementById('yourInquiry').src = '';
                    alert("The Pickup has been registered successfully");
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
            alert("An Unexpected Error just happened... Try Again");
        });  
    }
       
    
}

function uploadImage(){
        const storageRef = firebase.storage().ref('photos/'+file.name);
        const task = storageRef.put(file)
        task.then(function(snapshot){
            task.snapshot.ref.getDownloadURL().then((url)=>{
                var foto = url;
                console.log(foto)
            });
        }); 
}

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

function previewID() {
    var inputID = document.getElementById('inputFileID');
    const [file] = inputID.files;
    var yourID = document.getElementById('yourID');
    if (file){
        yourID.src = URL.createObjectURL(file);
    }
}


function previewInquiry() {
    var inputInquiry = document.getElementById('inputFileInquiry');
    const [fileCar] = inputInquiry.files;
    var yourInquiry = document.getElementById('yourInquiry');
    if (fileCar){
        yourInquiry.src = URL.createObjectURL(fileCar);
    }
}
/*function isChecked(){
    var titleCheck = document.getElementById('checkTitle');
    var vinInput = document.getElementById('inputBuyVIN')
    if (titleCheck.checked==true){
        vinInput.value='';
        vinInput.style.display="none";
        
    }
    else {
        
        vinInput.style.display="block";
    }
}*/
