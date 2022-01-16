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

var purchaseRegistration='';

var f = new Date();
var fechaString = f.getFullYear()+"-"+(f.getMonth()+1)+"-"+f.getDate();
document.getElementById('inputBuyPurchaseDate').setAttribute("max",fechaString);

var datepicker = document.getElementById('inputBuyPurchaseDate');
$("#inputBuyPurchaseDate").change(function (e) {
    console.log(datepicker.value)
})


var archivo;
$("#inputFile").change(function (e) {
    archivo = e.target.files[0];
})

var car;
$("#inputFileCar").change(function (e) {
    car = e.target.files[0];
})

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


function valide(){
    if(confirm('Are you sure to edit this purchase?')){
        update();
    }else{
        alert('Nothing has been done');
    }
}

function search(){
    var inputSearch = document.getElementById('inputBuySearch').value.toUpperCase().trim();
    var dropdown = document.getElementById('searchDropContent');
    var dateSearch = document.getElementById('inputBuySearchDate').value;
    
    dropdown.innerHTML = ``;
    db.collection("purchases").onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(dateSearch != "" && inputSearch != ""){
                if((doc.data().model == inputSearch || doc.data().make == inputSearch || doc.data().year == inputSearch) && doc.data().purchaseDate == dateSearch){
                    console.log(doc.data());
                    var s = doc.data().comments.replace(/(\r\n|\n|\r)/gm, " ");
                    console.log(s);
                        dropdown.innerHTML += `
                        <a class="dropdown-item" href="#" onClick="getID('${doc.id}','${doc.data().make}','${doc.data().model}','${doc.data().zipcode}','${doc.data().state}','${doc.data().purchaseDate}','${doc.data().year}','${doc.data().color}','${doc.data().purchasePrice}','${doc.data().phone}','${doc.data().cats}','${doc.data().title}','${doc.data().vin}','${doc.data().dnifile}','${doc.data().carfile}','${s}','${doc.data().calledTo}','${doc.data().houPrice}','${doc.data().lPrice}','${doc.data().syPrice}','${doc.data().famPrice}','${doc.data().otherBuyer}','${doc.data().otherPrice}','${doc.data().isInL}')">${doc.data().year} ${doc.data().make} ${doc.data().model} - ${doc.data().zipcode} - ${doc.data().state}</a>
                        `;
                }
            }
            else if(dateSearch == "" && inputSearch != ""){
                if(doc.data().model == inputSearch || doc.data().make == inputSearch || doc.data().year == inputSearch){
                        console.log(doc.data());
                        var s = doc.data().comments.replace(/(\r\n|\n|\r)/gm, " ");
                        console.log(s);
                        dropdown.innerHTML += `
                        <a class="dropdown-item" href="#" onClick="getID('${doc.id}','${doc.data().make}','${doc.data().model}','${doc.data().zipcode}','${doc.data().state}','${doc.data().purchaseDate}','${doc.data().year}','${doc.data().color}','${doc.data().purchasePrice}','${doc.data().phone}','${doc.data().cats}','${doc.data().title}','${doc.data().vin}','${doc.data().dnifile}','${doc.data().carfile}','${s}','${doc.data().calledTo}','${doc.data().houPrice}','${doc.data().lPrice}','${doc.data().syPrice}','${doc.data().famPrice}','${doc.data().otherBuyer}','${doc.data().otherPrice}','${doc.data().isInL}')">${doc.data().year} ${doc.data().make} ${doc.data().model} - ${doc.data().zipcode} - ${doc.data().state}</a>
                        `;
                }
            }else if(dateSearch != "" && inputSearch == ""){
                if(doc.data().purchaseDate == dateSearch){
                    console.log(doc.data());
                    var s = doc.data().comments.replace(/(\r\n|\n|\r)/gm, " ");
                    console.log(s);
                    dropdown.innerHTML += `
                        <a class="dropdown-item" href="#" onClick="getID('${doc.id}','${doc.data().make}','${doc.data().model}','${doc.data().zipcode}','${doc.data().state}','${doc.data().purchaseDate}','${doc.data().year}','${doc.data().color}','${doc.data().purchasePrice}','${doc.data().phone}','${doc.data().cats}','${doc.data().title}','${doc.data().vin}','${doc.data().dnifile}','${doc.data().carfile}','${s}','${doc.data().calledTo}','${doc.data().houPrice}','${doc.data().lPrice}','${doc.data().syPrice}','${doc.data().famPrice}','${doc.data().otherBuyer}','${doc.data().otherPrice}','${doc.data().isInL}')">${doc.data().year} ${doc.data().make} ${doc.data().model} - ${doc.data().zipcode} - ${doc.data().state}</a>
                         `;
            }
            }
            
        });
    });
}

function getID(id,make,model,zip,state,purDate,year,color,purPrice,phone,cats,title,vin,dni,car,comments,calledTo,hou,l,sy,fam,other,otherPrice,isInL){
    var selected = document.getElementById('purchaseSelect');
    
    selected.innerHTML = `
    <p style="color:#F07B60;"><b>Selected:</b> ${year} ${make} ${model} - ${zip} - ${state}</p>
    `;
    document.getElementById('inputBuyPurchaseDate').value = purDate;
    document.getElementById('inputBuyYear').value = year.trim();
    document.getElementById('inputBuyMake').value = make.trim();
    document.getElementById('inputBuyModel').value = model.trim();
    document.getElementById('inputBuyState').value = state;
    document.getElementById('inputBuyColor').value = color.trim();
    document.getElementById('inputBuyPhone').value = phone;
    document.getElementById('inputBuyZIP').value = zip;
    document.getElementById('inputBuyPrice').value = purPrice;
    document.getElementById('inputBuyCats').value = cats;
    document.getElementById('inputBuyComments').value = comments;
    document.getElementById('inputBuyCalled').value = calledTo;
    document.getElementById('inputBuyHou').value = hou;
    document.getElementById('inputBuyL').value = l;
    document.getElementById('inputBuySy').value = sy;
    document.getElementById('inputBuyFam').value = fam;
    document.getElementById('inputBuyOther').value = other;
    document.getElementById('inputBuyOtherPrice').value = otherPrice;
    if (isInL == "true"){
        document.getElementById('checkL').checked = true;
    }
    else{
        document.getElementById('checkL').checked = false;
    }

    if (title == "true"){
        document.getElementById('checkTitle').checked = true;
    }
    else{
        document.getElementById('checkTitle').checked = false;
    }
    document.getElementById('inputBuyVIN').value = vin.trim();
    var yourPhoto = document.getElementById('yourPhoto');
    yourPhoto.src = dni;
    var yourCar = document.getElementById('yourCar');
    yourCar.src = car;

    purchaseRegistration = id;
    console.log(purchaseRegistration);
}

function putVIN(vin){
    document.getElementById('inputBuyVIN').value = parseInt(vin);
}



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



function update(){
    var selected = document.getElementById('purchaseSelect');
    if(purchaseRegistration != ''){
    var titleCheck = document.getElementById('checkTitle');
    var L = document.getElementById('checkL');
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
    var _hou = document.getElementById('inputBuyHou').value;
    var _l = document.getElementById('inputBuyL').value;
    var _sy = document.getElementById('inputBuySy').value;
    var _fam = document.getElementById('inputBuyFam').value;
    var _other = document.getElementById('inputBuyOther').value.toUpperCase().trim();
    var _otherPrice = document.getElementById('inputBuyOtherPrice').value;
    if (titleCheck.checked==true){
        var _title = true;
    }
    else {
        var _title = false;
    }
    if (L.checked==true){
        var _isInL = true;
    }
    else {
        var _isInL = false;
    }
    var _vin = document.getElementById('inputBuyVIN').value.toUpperCase();
    var _state = document.getElementById('inputBuyState').value;
    var _comments = document.getElementById('inputBuyComments').value.toUpperCase().trim();





    if(document.getElementById('inputFile').files.length==0 && document.getElementById('inputFileCar').files.length==0){
        db.collection("purchases").doc(purchaseRegistration).update({
            purchaseDate: _purchaseDate,
            year:_year,
            make: _make,
            model: _model,
            color: _color,
            phone: _phone,
            state: _state,
            zipcode: _zip,
            purchasePrice: _purchasePrice,
            cats: _cats,
            title: _title,
            vin: _vin,
            comments: _comments,
            houPrice: _hou,
            lPrice: _l,
            syPrice: _sy,
            famPrice: _fam,
            otherBuyer: _other,
            otherPrice: _otherPrice,
            isInL: _isInL,
            calledTo: _calledTo
        })
        .then((docRef) => {
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
            document.getElementById('inputBuyState').value = '';
            document.getElementById('inputBuySearch').value = '';
            document.getElementById('inputBuyComments').value = '';
            document.getElementById('inputBuyCalled').value = '...';
                    document.getElementById('inputBuyHou').value = '';
            document.getElementById('inputBuyL').value = '';
            document.getElementById('inputBuySy').value = '';
            document.getElementById('inputBuyFam').value = '';
            document.getElementById('inputBuyOther').value = '';
            document.getElementById('inputBuyOtherPrice').value = '';
            document.getElementById('checkL').checked = false;
            selected.innerHTML = `
    
            `;
            purchaseRegistration = '';
            alert("The Purchase has been Updated correctly");
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
            alert("Something unexpected happened..., Try Again");
        });  
    }
    else if(document.getElementById('inputFile').files.length!=0 && document.getElementById('inputFileCar').files.length==0)
    {
        const storageRef = firebase.storage().ref('photos/'+archivo.name);
        const task = storageRef.put(archivo)
        task.then(function(snapshot){
            task.snapshot.ref.getDownloadURL().then((url)=>{
                var _dni = url;
                console.log(_dni);
                db.collection("purchases").doc(purchaseRegistration).update({
                    purchaseDate: _purchaseDate,
                    year:_year,
                    make: _make,
                    model: _model,
                    color: _color,
                    phone: _phone,
                    state: _state,
                    zipcode: _zip,
                    purchasePrice: _purchasePrice,
                    cats: _cats,
                    title: _title,
                    vin: _vin,
                    dnifile: _dni,
                    comments: _comments,
                    houPrice: _hou,
                    lPrice: _l,
                    syPrice: _sy,
                    famPrice: _fam,
                    otherBuyer: _other,
                    otherPrice: _otherPrice,
                    isInL: _isInL,
                    calledTo: _calledTo
                })
                .then((docRef) => {
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
                    document.getElementById('inputBuyState').value = '';
                    document.getElementById('inputBuySearch').value = '';
                    document.getElementById('inputBuyComments').value = '';
                    document.getElementById('inputBuyCalled').value = '...';
                    document.getElementById('inputBuyHou').value = '';
            document.getElementById('inputBuyL').value = '';
            document.getElementById('inputBuySy').value = '';
            document.getElementById('inputBuyFam').value = '';
            document.getElementById('inputBuyOther').value = '';
            document.getElementById('inputBuyOtherPrice').value = '';
            document.getElementById('checkL').checked = false;
                    selected.innerHTML = `
            
                    `;
                    purchaseRegistration = '';
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });  
            });
        }); 
    }
    else if(document.getElementById('inputFile').files.length==0 && document.getElementById('inputFileCar').files.length!=0)
    {
        const storageRef = firebase.storage().ref('photos/'+car.name);
        const task = storageRef.put(car)
        task.then(function(snapshot){
            task.snapshot.ref.getDownloadURL().then((url)=>{
                var _car = url;
                console.log(_car);
                db.collection("purchases").doc(purchaseRegistration).update({
                    purchaseDate: _purchaseDate,
                    year:_year,
                    make: _make,
                    model: _model,
                    color: _color,
                    phone: _phone,
                    state: _state,
                    zipcode: _zip,
                    purchasePrice: _purchasePrice,
                    cats: _cats,
                    title: _title,
                    vin: _vin,
                    carfile: _car,
                    comments: _comments,
                    houPrice: _hou,
                    lPrice: _l,
                    syPrice: _sy,
                    famPrice: _fam,
                    otherBuyer: _other,
                    otherPrice: _otherPrice,
                    isInL: _isInL,
                    calledTo: _calledTo
                })
                .then((docRef) => {
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
                    document.getElementById('inputBuyState').value = '';
                    document.getElementById('inputBuySearch').value = '';
                    document.getElementById('inputBuyComments').value = '';
                    document.getElementById('inputBuyCalled').value = '...';
                    document.getElementById('inputBuyHou').value = '';
            document.getElementById('inputBuyL').value = '';
            document.getElementById('inputBuySy').value = '';
            document.getElementById('inputBuyFam').value = '';
            document.getElementById('inputBuyOther').value = '';
            document.getElementById('inputBuyOtherPrice').value = '';
            document.getElementById('checkL').checked = false;
                    selected.innerHTML = `
            
                    `;
                    purchaseRegistration = '';
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });  
            });
        }); 
    }
    else if(document.getElementById('inputFile').files.length!=0 && document.getElementById('inputFileCar').files.length!=0)
    {
        const storageRef = firebase.storage().ref('photos/'+car.name);
        const task = storageRef.put(car);
        task.then(function(snapshot){
            task.snapshot.ref.getDownloadURL().then((url)=>{

                var _car = url;

                const storageRefs = firebase.storage().ref('photos/'+archivo.name);
                const tasks = storageRefs.put(archivo);
                tasks.then(function(snapshot){
                    tasks.snapshot.ref.getDownloadURL().then((urls)=>{


                var _dni = urls;
                console.log(_car);
                db.collection("purchases").doc(purchaseRegistration).update({
                    purchaseDate: _purchaseDate,
                    year:_year,
                    make: _make,
                    model: _model,
                    color: _color,
                    phone: _phone,
                    state: _state,
                    zipcode: _zip,
                    purchasePrice: _purchasePrice,
                    cats: _cats,
                    title: _title,
                    vin: _vin,
                    dnifile: _dni,
                    carfile: _car,
                    comments: _comments,
                    houPrice: _hou,
                    lPrice: _l,
                    syPrice: _sy,
                    famPrice: _fam,
                    otherBuyer: _other,
                    otherPrice: _otherPrice,
                    isInL: _isInL,
                    calledTo: _calledTo
                })
                .then((docRef) => {
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
                    document.getElementById('inputBuyState').value = '';
                    document.getElementById('inputBuySearch').value = '';
                    document.getElementById('inputBuyComments').value = '';
                    document.getElementById('inputBuyCalled').value = '...';
                    document.getElementById('inputBuyHou').value = '';
            document.getElementById('inputBuyL').value = '';
            document.getElementById('inputBuySy').value = '';
            document.getElementById('inputBuyFam').value = '';
            document.getElementById('inputBuyOther').value = '';
            document.getElementById('inputBuyOtherPrice').value = '';
            document.getElementById('checkL').checked = false;
                    selected.innerHTML = `
            
                    `;
                    purchaseRegistration = '';
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });  
            });
        }); 
    });
});}
    }
    else{
        selected.innerHTML = `
        <p style="color:#F07B60;"><b>You haven't selected any file</b></p>
                    `;
    }
}
