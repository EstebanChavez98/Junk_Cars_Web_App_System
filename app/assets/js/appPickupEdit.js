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
//document.getElementById('inputBuyPurchaseDate').setAttribute("max",fechaString);

var datepicker = document.getElementById('inputPicDate');
$("#inputPicDate").change(function (e) {
    console.log(datepicker.value)
})


var file;
$("#inputFileID").change(function (e) {
    file = e.target.files[0];
})

var car;
$("#inputFileInquiry").change(function (e) {
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
    if(confirm('Are you sure to update this pickup?')){
        update();
    }else{
        alert('Nothing has been done!');
    }

}

function search(){
    var inputSearch = document.getElementById('inputPicSearch').value.toUpperCase().trim();
    var dropdown = document.getElementById('searchDropContent');
    var dateSearch = document.getElementById('inputPicSearchDate').value;
    
    dropdown.innerHTML = ``;
    db.collection("pickups").onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(dateSearch != "" && inputSearch != ""){
                if((doc.data().model == inputSearch || doc.data().make == inputSearch || doc.data().year == inputSearch) && doc.data().pickupDate == dateSearch){
                    console.log(doc.data());
                        dropdown.innerHTML += `
                        <a class="dropdown-item" href="#" onClick="getID('${doc.id}','${doc.data().address}','${doc.data().idfile}','${doc.data().inquiryfile}','${doc.data().phone}','${doc.data().price}','${doc.data().year}','${doc.data().make}','${doc.data().model}','${doc.data().color}','${doc.data().pickupDate}','${doc.data().pickupTime}')">
                        
                        ${doc.data().year} ${doc.data().make} ${doc.data().model} - ${doc.data().pickupDate} - ${doc.data().pickupTime}
                        
                        
                        </a>
                        `;
                }
            }
            else if(dateSearch == "" && inputSearch != ""){
                if(doc.data().model == inputSearch || doc.data().make == inputSearch || doc.data().year == inputSearch){
                        console.log(doc.data());
                        dropdown.innerHTML += `
                        <a class="dropdown-item" href="#" onClick="getID('${doc.id}','${doc.data().address}','${doc.data().idfile}','${doc.data().inquiryfile}','${doc.data().phone}','${doc.data().price}','${doc.data().year}','${doc.data().make}','${doc.data().model}','${doc.data().color}','${doc.data().pickupDate}','${doc.data().pickupTime}')">
                        
                        ${doc.data().year} ${doc.data().make} ${doc.data().model} - ${doc.data().pickupDate} - ${doc.data().pickupTime}
                        
                        
                        </a>
                        `;
                }
            }else if(dateSearch != "" && inputSearch == ""){
                if(doc.data().pickupDate == dateSearch){
                    console.log(doc.data());
                    dropdown.innerHTML += `
                        <a class="dropdown-item" href="#" onClick="getID('${doc.id}','${doc.data().address}','${doc.data().idfile}','${doc.data().inquiryfile}','${doc.data().phone}','${doc.data().price}','${doc.data().year}','${doc.data().make}','${doc.data().model}','${doc.data().color}','${doc.data().pickupDate}','${doc.data().pickupTime}')">
                        
                        ${doc.data().year} ${doc.data().make} ${doc.data().model} - ${doc.data().pickupDate} - ${doc.data().pickupTime}
                        
                        
                        </a>
                        `;
                }
            }
            
        });
    });
}


function getID(id,address,idurl,inquiryurl,phone,price,year,make,model,color,picDate,picTime){
    var selected = document.getElementById('pickupSelect');
    selected.innerHTML = `
    <p style="color:#F07B60;"><b>Selected:</b> ${year} ${make} ${model} - ${picDate} - ${picTime}</p>
    `;
    document.getElementById('inputPicAddress').value = address;
    document.getElementById('inputPicPhone').value = phone;
    document.getElementById('inputPicPrice').value = price;
    document.getElementById('inputPicYear').value = year;
         document.getElementById('inputPicMake').value = make;
             document.getElementById('inputPicModel').value = model;
                    document.getElementById('inputPicColor').value = color;
                    document.getElementById('inputPicDate').value = picDate;
                    document.getElementById('inputPicTime').value = picTime;
                    document.getElementById('inputFileID').value = '';
                    document.getElementById('yourID').src = idurl;
                    document.getElementById('inputFileInquiry').value = '';
                    document.getElementById('yourInquiry').src = inquiryurl;

    purchaseRegistration = id;
    console.log(purchaseRegistration);
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


function update(){
    var selected = document.getElementById('pickupSelect');
    if(purchaseRegistration != ''){
        var _address = document.getElementById('inputPicAddress').value.toUpperCase().trim();
        var _phone = document.getElementById('inputPicPhone').value;
        var _price = document.getElementById('inputPicPrice').value;
        var _year = document.getElementById('inputPicYear').value.trim();
        var _make = document.getElementById('inputPicMake').value.toUpperCase().trim();
        var _model = document.getElementById('inputPicModel').value.toUpperCase().trim();
        var _color = document.getElementById('inputPicColor').value.toUpperCase().trim();
        var _pickupDate = datepicker.value;
        var _time = document.getElementById('inputPicTime').value;





    if(document.getElementById('inputFileID').files.length==0 && document.getElementById('inputFileInquiry').files.length==0){
        db.collection("pickups").doc(purchaseRegistration).update({
                    address: _address,
                    pickupDate: _pickupDate,
                    pickupTime: _time,
                    phone: _phone,
                    price: _price,
                    year: _year,
                    make: _make,
                    model: _model,
                    color: _color
        })
        .then((docRef) => {
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
            document.getElementById('inputPicSearch').value = '';
            document.getElementById('inputPicSearchDate').value = '';
            selected.innerHTML = `
    
            `;
            purchaseRegistration = '';
            alert("The Pickup has been Updated correctly");
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
            alert("Something unexpected happened..., Try Again");
        });  
    }
    else if(document.getElementById('inputFileID').files.length!=0 && document.getElementById('inputFileInquiry').files.length==0)
    {
        const storageRef = firebase.storage().ref('photos/'+file.name);
        const task = storageRef.put(file)
        task.then(function(snapshot){
            task.snapshot.ref.getDownloadURL().then((url)=>{
                var _id = url;
                db.collection("pickups").doc(purchaseRegistration).update({
                    address: _address,
                    pickupDate: _pickupDate,
                    pickupTime: _time,
                    idfile: _id,
                    phone: _phone,
                    price: _price,
                    year: _year,
                    make: _make,
                    model: _model,
                    color: _color,
                })
                .then((docRef) => {
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
            document.getElementById('inputPicSearch').value = '';
            document.getElementById('inputPicSearchDate').value = '';
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
                var _inquiry= url;
                console.log(_car);
                db.collection("pickups").doc(purchaseRegistration).update({
                    address: _address,
                    pickupDate: _pickupDate,
                    pickupTime: _time,
                    inquiryfile: _inquiry,
                    phone: _phone,
                    price: _price,
                    year: _year,
                    make: _make,
                    model: _model,
                    color: _color,
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

                var _inquiry = url;

                const storageRefs = firebase.storage().ref('photos/'+file.name);
                const tasks = storageRefs.put(file);
                tasks.then(function(snapshot){
                    tasks.snapshot.ref.getDownloadURL().then((urls)=>{


                var _id = urls;


                db.collection("pickups").doc(purchaseRegistration).update({
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
});
}
    }
    else{
        selected.innerHTML = `
        <p style="color:#F07B60;"><b>You haven't selected any file</b></p>
                    `;
    }
}

