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
var purchaseRegistration="";


var f = new Date();
var date = ("0" + f.getDate()).slice(-2);
var month = ("0" + (f.getMonth() + 1)).slice(-2);



var fechaString = f.getFullYear()+"-"+(month)+"-"+(date);
console.log(fechaString);
document.getElementById('inputSaleDate').setAttribute("max",fechaString);

var datepicker = document.getElementById('inputSaleDate');
$("#inputSaleDate").change(function (e) {
    console.log(datepicker.value)
})




$("#inputSaleBuyer").change(function (e) {
    var buyer = document.getElementById('inputSaleBuyer')
    var LCheck = document.getElementById('checkL');
    var otherBuyer = document.getElementById('inputSaleOther');
    var LLabel = document.getElementById('labelL')
    if(buyer.value=='L'){
        LCheck.style.display = "block";
        LLabel.style.display = "block";
        otherBuyer.style.display = "none";
    }
    else if(buyer.value=='OTHER'){
        LCheck.style.display = "none";
        LLabel.style.display = "none";
        otherBuyer.style.display = "block";
    }
    else{
        LCheck.style.display = "none";
        LLabel.style.display = "none";
        otherBuyer.style.display = "none";
    }
})

function valide(){
    if (($('form1')[0].checkValidity())) {
        save();
    }
    else{
        console.log('error');
    }
}

function check(){
    if(confirm('Are you sure you want to register this sale?')){
        save();
    }else{
        alert('Nothing has been done!');
    }
}


function save(){
    var LCheck = document.getElementById('checkL');

    var _registerDate = fechaString;
    var _saleDate = datepicker.value;
    var _salePrice = document.getElementById('inputSalePrice').value;
    var _buyer = document.getElementById('inputSaleBuyer').value.toUpperCase();
    if (_buyer == 'L'){
        if (LCheck.checked==true){
            var _itsInL = true;
            var _otherBuyer = null;
        }
        else{
            var _itsInL = false;
            var _otherBuyer = null;
        }
    }
    else if (_buyer == 'OTHER'){
        var _itsInL = null;
        var _otherBuyer = document.getElementById('inputSaleOther').value.toUpperCase();
    }
    else{
        var _itsInL = null;
        var _otherBuyer = null;
    }
    var _purchaseID = purchaseRegistration;
    
    //var _dni = 'hi';
    db.collection("sales").add({
        registerDate: _registerDate,
        saleDate: _saleDate,
        salePrice: _salePrice,
        buyer: _buyer,
        itsInL: _itsInL,
        otherBuyer: _otherBuyer,
        purchaseID: _purchaseID
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('inputSaleDate').value = '';
        document.getElementById('inputSalePrice').value = '';
        document.getElementById('inputSaleBuyer').value = '';
        document.getElementById('inputSaleOther').value = '';
        document.getElementById('checkL').checked = true;
        var LCheck = document.getElementById('checkL');
        var otherBuyer = document.getElementById('inputSaleOther');
        var LLabel = document.getElementById('labelL')
        LCheck.style.display = "none";
        LLabel.style.display = "none";
        otherBuyer.style.display = "none";
        var selected = document.getElementById('purchaseSelect');
        selected.innerHTML = `
       
        `;
        
        /*content.innerHTML = `
         <p style="color:green;">The purchase has been registered.</p>
        `*/
        registerOnPurchase(docRef.id);
        alert("The Sale has been registered successfully");
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        alert("An Unexpected Error just happened... Try Again");
        /*content.innerHTML = `
        <p style="color:red;">Something went wrong... Try again later.</p>
        `*/
    });  
       
    
}

function registerOnPurchase(id){
    db.collection("purchases").doc(purchaseRegistration).update({
        saleID: id
    }).then((docRef) => {})
    .catch(function(error) {
        console.error("Error adding document: ", error);
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




    function search(){
        var inputSearch = document.getElementById('inputBuySearch').value.toUpperCase();
    var dropdown = document.getElementById('searchDropContent');
    var dateSearch = document.getElementById('inputBuySearchDate').value;
    
    dropdown.innerHTML = ``;
    db.collection("purchases").onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(dateSearch != "" && inputSearch != ""){
                if((doc.data().model == inputSearch || doc.data().make == inputSearch || doc.data().year == inputSearch) && doc.data().purchaseDate == dateSearch){
                    console.log(doc.data());
                        dropdown.innerHTML += `
                        <a class="dropdown-item" href="#" onClick="getID('${doc.id}','${doc.data().make}','${doc.data().model}','${doc.data().zipcode}','${doc.data().state}','${doc.data().purchaseDate}','${doc.data().year}','${doc.data().color}','${doc.data().purchasePrice}','${doc.data().phone}','${doc.data().cats}','${doc.data().title}','${doc.data().vin}','${doc.data().dnifile}')">${doc.data().year} ${doc.data().make} ${doc.data().model} - ${doc.data().zipcode} - ${doc.data().state}</a>
                        `;
                }
            }
            else if(dateSearch == "" && inputSearch != ""){
                if(doc.data().model == inputSearch || doc.data().make == inputSearch || doc.data().year == inputSearch){
                        console.log(doc.data());
                        dropdown.innerHTML += `
                        <a class="dropdown-item" href="#" onClick="getID('${doc.id}','${doc.data().make}','${doc.data().model}','${doc.data().zipcode}','${doc.data().state}','${doc.data().purchaseDate}','${doc.data().year}','${doc.data().color}','${doc.data().purchasePrice}','${doc.data().phone}','${doc.data().cats}','${doc.data().title}','${doc.data().vin}','${doc.data().dnifile}')">${doc.data().year} ${doc.data().make} ${doc.data().model} - ${doc.data().zipcode} - ${doc.data().state}</a>
                        `;
                }
            }else if(dateSearch != "" && inputSearch == ""){
                if(doc.data().purchaseDate == dateSearch){
                    console.log(doc.data());
                    dropdown.innerHTML += `
                    <a class="dropdown-item" href="#" onClick="getID('${doc.id}','${doc.data().make}','${doc.data().model}','${doc.data().zipcode}','${doc.data().state}','${doc.data().purchaseDate}','${doc.data().year}','${doc.data().color}','${doc.data().purchasePrice}','${doc.data().phone}','${doc.data().cats}','${doc.data().title}','${doc.data().vin}','${doc.data().dnifile}')">${doc.data().year} ${doc.data().make} ${doc.data().model} - ${doc.data().zipcode} - ${doc.data().state}</a>
                    `;
            }
            }
            
        });
    });
    }

    function getID(id,year,make,model,zip,state){
        var selected = document.getElementById('purchaseSelect');
        selected.innerHTML = `
        <p style="color:#F07B60;"><b>Selected:</b> ${year} ${make} ${model} - ${zip} - ${state}</p>
        `;

        purchaseRegistration = id;
        console.log(purchaseRegistration);
    }
