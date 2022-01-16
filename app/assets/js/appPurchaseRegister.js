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
document.getElementById('inputBuyPurchaseDate').setAttribute("max",fechaString);

var datepicker = document.getElementById('inputBuyPurchaseDate');
$("#inputBuyPurchaseDate").change(function (e) {
    console.log(datepicker.value)
})

var file;
$("#inputFile").change(function (e) {
    file = e.target.files[0];
})

var car;
$("#inputFileCar").change(function (e) {
    car = e.target.files[0];
})



function valide(){
    if(confirm('Are you sure you want to register this purchase?')){
        save();
        
    }else{
        alert('Nothing has been done!');
    }
}



function save(){
    var titleCheck = document.getElementById('checkTitle');
    var L = document.getElementById('checkL');

    var _registerDate = fechaString;
    var _purchaseDate = datepicker.value;
    var _calledTo = document.getElementById('inputBuyCalled').value;
    var _year = document.getElementById('inputBuyYear').value.trim();
    var _make = document.getElementById('inputBuyMake').value.toUpperCase().trim();
    var _model = document.getElementById('inputBuyModel').value.toUpperCase().trim();
    var _color = document.getElementById('inputBuyColor').value.toUpperCase().trim();
    var _phone = document.getElementById('inputBuyPhone').value;
    var _zip = document.getElementById('inputBuyZIP').value;
    var _purchasePrice = document.getElementById('inputBuyPrice').value;
    var _cats = document.getElementById('inputBuyCats').value;
    var _comments = document.getElementById('inputBuyComments').value.toUpperCase().trim();
    var _hou = document.getElementById('inputBuyHou').value;
    var _l = document.getElementById('inputBuyL').value;
    var _sy = document.getElementById('inputBuySy').value;
    var _fam = document.getElementById('inputBuyFam').value;
    var _other = document.getElementById('inputBuyOther').value.toUpperCase().trim();
    var _otherPrice = document.getElementById('inputBuyOtherPrice').value;

//var status = (age >= 18) ? 'adult' : 'minor';
    if (L.checked==true){
        var _isInL = true;
    }
    else {
        var _isInL = false;
    }

    if (titleCheck.checked==true){
        var _title = true;
    }
    else {
        var _title = false;
    }
    var _vin = document.getElementById('inputBuyVIN').value.toUpperCase();
    var _state = document.getElementById('inputBuyState').value;
    //var _dni = 'hi';
    if(document.getElementById('inputFileCar').files.length != 0 && document.getElementById('inputFile').files.length != 0){
        const storageRef = firebase.storage().ref('photos/'+car.name);
        const task = storageRef.put(car);
        task.then(function(snapshot){
            task.snapshot.ref.getDownloadURL().then((url)=>{

                var _car = url;

                const storageRefs = firebase.storage().ref('photos/'+file.name);
                const tasks = storageRefs.put(file);
                tasks.then(function(snapshot){
                    tasks.snapshot.ref.getDownloadURL().then((urls)=>{


                var _dni = urls;
                console.log(_car);
                db.collection("purchases").add({
                    registerDate: _registerDate,
                    purchaseDate: _purchaseDate,
                    calledTo: _calledTo,
                    year:_year,
                    make: _make,
                    model: _model,
                    color: _color,
                    phone: _phone,
                    zipcode: _zip,
                    purchasePrice: _purchasePrice,
                    cats: _cats,
                    title: _title,
                    vin: _vin,
                    state: _state,
                    dnifile: _dni,
                    carfile: _car,
                    saleID: null,
                    houPrice: _hou,
                    lPrice: _l,
                    syPrice: _sy,
                    famPrice: _fam,
                    otherBuyer: _other,
                    otherPrice: _otherPrice,
                    isInL: _isInL,
                    comments: _comments
                })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    document.getElementById('inputBuyPurchaseDate').value = '';
                    document.getElementById('inputBuyYear').value = '';
                    document.getElementById('inputBuyMake').value = '';
                    document.getElementById('inputBuyModel').value = '';
                    document.getElementById('inputBuyColor').value = '';
                    document.getElementById('inputBuyPhone').value = '';
                    document.getElementById('inputBuyZIP').value = '';
                    document.getElementById('inputBuyPrice').value = '';
                    document.getElementById('inputBuyCats').value = '';
                    document.getElementById('checkTitle').checked = true;
                    document.getElementById('inputBuyVIN').value = '';
                    document.getElementById('inputFile').value = '';
                    document.getElementById('yourPhoto').src = '';
                    document.getElementById('inputFileCar').value = '';
                    document.getElementById('yourCar').src = '';
                    document.getElementById('inputBuyState').value = '...';
                    document.getElementById('inputBuyCalled').value = '...';
                    document.getElementById('inputBuyHou').value = '';
            document.getElementById('inputBuyL').value = '';
            document.getElementById('inputBuySy').value = '';
            document.getElementById('inputBuyFam').value = '';
            document.getElementById('inputBuyOther').value = '';
            document.getElementById('inputBuyOtherPrice').value = '';
            document.getElementById('checkL').checked = false;
                    document.getElementById('inputBuyComments').value = '';
                    alert("The Purchase has been registered successfully");
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                    alert("An Unexpected Error just happened... Try Again");
                });  
            });
        }); 
    });
});
}else if(document.getElementById('inputFileCar').files.length != 0 && document.getElementById('inputFile').files.length == 0){
        const storageRef = firebase.storage().ref('photos/'+car.name);
        const task = storageRef.put(car);
        task.then(function(snapshot){
            task.snapshot.ref.getDownloadURL().then((url)=>{
                var _car = url;
                console.log(_car);
                db.collection("purchases").add({
                    registerDate: _registerDate,
                    purchaseDate: _purchaseDate,
                    calledTo: _calledTo,
                    year:_year,
                    make: _make,
                    model: _model,
                    color: _color,
                    phone: _phone,
                    zipcode: _zip,
                    purchasePrice: _purchasePrice,
                    cats: _cats,
                    title: _title,
                    vin: _vin,
                    state: _state,
                    dnifile: null,
                    carfile: _car,
                    saleID: null,
                    houPrice: _hou,
                    lPrice: _l,
                    syPrice: _sy,
                    famPrice: _fam,
                    otherBuyer: _other,
                    otherPrice: _otherPrice,
                    isInL: _isInL,
                    comments: _comments
                })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    document.getElementById('inputBuyPurchaseDate').value = '';
                    document.getElementById('inputBuyCalled').value = '...';
                    document.getElementById('inputBuyYear').value = '';
                    document.getElementById('inputBuyMake').value = '';
                    document.getElementById('inputBuyModel').value = '';
                    document.getElementById('inputBuyColor').value = '';
                    document.getElementById('inputBuyPhone').value = '';
                    document.getElementById('inputBuyZIP').value = '';
                    document.getElementById('inputBuyPrice').value = '';
                    document.getElementById('inputBuyCats').value = '';
                    document.getElementById('checkTitle').checked = true;
                    document.getElementById('inputBuyVIN').value = '';
                    document.getElementById('inputFile').value = '';
                    document.getElementById('yourPhoto').src = '';
                    document.getElementById('inputFileCar').value = '';
                    document.getElementById('yourCar').src = '';
                    document.getElementById('inputBuyState').value = '...';
                    document.getElementById('inputBuyHou').value = '';
            document.getElementById('inputBuyL').value = '';
            document.getElementById('inputBuySy').value = '';
            document.getElementById('inputBuyFam').value = '';
            document.getElementById('inputBuyOther').value = '';
            document.getElementById('inputBuyOtherPrice').value = '';
            document.getElementById('checkL').checked = false;
                    document.getElementById('inputBuyComments').value = '';
                    alert("The Purchase has been registered successfully");
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                    alert("An Unexpected Error just happened... Try Again");
                });  
            });
        }); 
    
}else if(document.getElementById('inputFile').files.length != 0 && document.getElementById('inputFileCar').files.length == 0){
    const storageRef = firebase.storage().ref('photos/'+file.name);
        const task = storageRef.put(file)
        task.then(function(snapshot){
            task.snapshot.ref.getDownloadURL().then((url)=>{
                var _dni = url;
                console.log(_dni);
                db.collection("purchases").add({
                    registerDate: _registerDate,
                    purchaseDate: _purchaseDate,
                    calledTo: _calledTo,
                    year:_year,
                    make: _make,
                    model: _model,
                    color: _color,
                    phone: _phone,
                    zipcode: _zip,
                    purchasePrice: _purchasePrice,
                    cats: _cats,
                    title: _title,
                    vin: _vin,
                    state: _state,
                    dnifile: _dni,
                    carfile: null,
                    saleID: null,
                    houPrice: _hou,
                    lPrice: _l,
                    syPrice: _sy,
                    famPrice: _fam,
                    otherBuyer: _other,
                    otherPrice: _otherPrice,
                    isInL: _isInL,
                    comments: _comments
                })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    document.getElementById('inputBuyPurchaseDate').value = '';
                    document.getElementById('inputBuyCalled').value = '...';
                    document.getElementById('inputBuyYear').value = '';
                    document.getElementById('inputBuyMake').value = '';
                    document.getElementById('inputBuyModel').value = '';
                    document.getElementById('inputBuyColor').value = '';
                    document.getElementById('inputBuyPhone').value = '';
                    document.getElementById('inputBuyZIP').value = '';
                    document.getElementById('inputBuyPrice').value = '';
                    document.getElementById('inputBuyCats').value = '';
                    document.getElementById('checkTitle').checked = true;
                    document.getElementById('inputBuyVIN').value = '';
                    document.getElementById('inputFile').value = '';
                    document.getElementById('yourPhoto').src = '';
                    document.getElementById('inputFileCar').value = '';
                    document.getElementById('yourCar').src = '';
                    document.getElementById('inputBuyState').value = '...';
                    document.getElementById('inputBuyHou').value = '';
            document.getElementById('inputBuyL').value = '';
            document.getElementById('inputBuySy').value = '';
            document.getElementById('inputBuyFam').value = '';
            document.getElementById('inputBuyOther').value = '';
            document.getElementById('inputBuyOtherPrice').value = '';
            document.getElementById('checkL').checked = false;
                    document.getElementById('inputBuyComments').value = '';
                    alert("The Purchase has been registered successfully");
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                    alert("An Unexpected Error just happened... Try Again");
                });  
            });
        }); 
    }else{
        db.collection("purchases").add({
            registerDate: _registerDate,
            purchaseDate: _purchaseDate,
            calledTo: _calledTo,
            year:_year,
            make: _make,
            model: _model,
            color: _color,
            phone: _phone,
            zipcode: _zip,
            purchasePrice: _purchasePrice,
            cats: _cats,
            title: _title,
            vin: _vin,
            state: _state,
            dnifile: null,
            carfile: null,
            saleID: null,
            houPrice: _hou,
            lPrice: _l,
            syPrice: _sy,
            famPrice: _fam,
            otherBuyer: _other,
            otherPrice: _otherPrice,
            isInL: _isInL,
            comments: _comments
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById('inputBuyPurchaseDate').value = '';
            document.getElementById('inputBuyCalled').value = '...';
            document.getElementById('inputBuyYear').value = '';
            document.getElementById('inputBuyMake').value = '';
            document.getElementById('inputBuyModel').value = '';
            document.getElementById('inputBuyColor').value = '';
            document.getElementById('inputBuyPhone').value = '';
            document.getElementById('inputBuyZIP').value = '';
            document.getElementById('inputBuyPrice').value = '';
            document.getElementById('inputBuyCats').value = '';
            document.getElementById('checkTitle').checked = true;
            document.getElementById('inputBuyVIN').value = '';
            document.getElementById('inputFile').value = '';
            document.getElementById('yourPhoto').src = '';
            document.getElementById('inputFileCar').value = '';
            document.getElementById('yourCar').src = '';
            document.getElementById('inputBuyState').value = '...';
            document.getElementById('inputBuyHou').value = '';
            document.getElementById('inputBuyL').value = '';
            document.getElementById('inputBuySy').value = '';
            document.getElementById('inputBuyFam').value = '';
            document.getElementById('inputBuyOther').value = '';
            document.getElementById('inputBuyOtherPrice').value = '';
            document.getElementById('checkL').checked = false;
            document.getElementById('inputBuyComments').value = '';
            alert("The Purchase has been registered successfully");
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

/*
db.collection("purchases").add({
    date: Date.now,
    year: 1000,

})*/







/*function isLoggedIn() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            
        } else {
            // User is signed out.
           window.location='dashboard.html';
            
        }
    
    });
}*/

function preview() {
    var inputFile = document.getElementById('inputFile');
    const [file] = inputFile.files;
    var yourPhoto = document.getElementById('yourPhoto');
    if (file){
        yourPhoto.src = URL.createObjectURL(file);
    }
}


function previewCar() {
    var inputFileCar = document.getElementById('inputFileCar');
    const [fileCar] = inputFileCar.files;
    var yourCar = document.getElementById('yourCar');
    if (fileCar){
        yourCar.src = URL.createObjectURL(fileCar);
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


