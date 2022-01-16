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

var originalPurchase='';
var purchaseRegistration='';
var saleRegistration='';

var g = new Date();
var fechaString = g.getFullYear()+"-"+(g.getMonth()+1)+"-"+g.getDate();
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


    /*function search(){
        var inputSearch = document.getElementById('inputBuySearch').value;
        var dropdown = document.getElementById('searchDropContent');
        
        dropdown.innerHTML = ``;
        db.collection("sales").onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().firstName == inputSearch){
                        console.log(doc.data());
                        dropdown.innerHTML += `
                        <a class="dropdown-item" href="#" onClick="getID('${doc.id}','${doc.data().firstName}','${doc.data().lastName}','${doc.data().make}','${doc.data().model}','${doc.data().zipcode}','${doc.data().purchaseDate}','${doc.data().year}','${doc.data().color}','${doc.data().purchasePrice}','${doc.data().phone}','${doc.data().cats}','${doc.data().title}','${doc.data().vin}','${doc.data().dnifile}')">${doc.data().firstName} ${doc.data().lastName} - ${doc.data().make} ${doc.data().model} - ${doc.data().zipcode}</a>
                        `;
                }
            });
        });
    }*/

    function searchPur(){
        var inputSearch = document.getElementById('inputBuySearchPur').value.toUpperCase();
        var dropdown = document.getElementById('searchDropContentPur');
        var dateSearch = document.getElementById('inputBuySearchPurDate').value;
        
        dropdown.innerHTML = ``;
        db.collection("purchases").onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(dateSearch != "" && inputSearch != ""){
                    if((doc.data().model == inputSearch || doc.data().make == inputSearch || doc.data().year == inputSearch) && doc.data().purchaseDate == dateSearch){
                        if(doc.data().saleID == null){
                        console.log(doc.data());
                        dropdown.innerHTML += `
                        <a class="dropdown-item" href="#" onClick="getID('${doc.id}','${doc.data().year}','${doc.data().make}','${doc.data().model}','${doc.data().zipcode}','${doc.data().state}')">${doc.data().year} ${doc.data().make} ${doc.data().model} - ${doc.data().zipcode} - ${doc.data().state}</a>
                        `;
                        }
                    }
                }
                else if(dateSearch == "" && inputSearch != ""){
                    if(doc.data().model == inputSearch || doc.data().make == inputSearch || doc.data().year == inputSearch){
                        if(doc.data().saleID == null){
                            console.log(doc.data());
                            dropdown.innerHTML += `
                        <a class="dropdown-item" href="#" onClick="getID('${doc.id}','${doc.data().year}','${doc.data().make}','${doc.data().model}','${doc.data().zipcode}','${doc.data().state}')">${doc.data().year} ${doc.data().make} ${doc.data().model} - ${doc.data().zipcode} - ${doc.data().state}</a>
                        `;
                    }
                    }
                }else if(dateSearch != "" && inputSearch == ""){
                    if(doc.data().purchaseDate == dateSearch){
                        if(doc.data().saleID == null){
                        console.log(doc.data());
                        dropdown.innerHTML += `
                        <a class="dropdown-item" href="#" onClick="getID('${doc.id}','${doc.data().year}','${doc.data().make}','${doc.data().model}','${doc.data().zipcode}','${doc.data().state}')">${doc.data().year} ${doc.data().make} ${doc.data().model} - ${doc.data().zipcode} - ${doc.data().state}</a>
                        `;
                        }
                }
                }
                
            });
        });




       /* var inputSearch = document.getElementById('inputBuySearchPur').value.toUpperCase();
        var dropdown = document.getElementById('searchDropContentPur');
        
        dropdown.innerHTML = ``;
        db.collection("purchases").onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().year == inputSearch || doc.data().make == inputSearch || doc.data().model == inputSearch){
                    if(doc.data().saleID == null){
                        console.log(doc.data());

                        dropdown.innerHTML += `
                        <a class="dropdown-item" href="#" onClick="getID('${doc.id}','${doc.data().year}','${doc.data().make}','${doc.data().model}','${doc.data().zipcode}','${doc.data().state}')">${doc.data().year} ${doc.data().make} ${doc.data().model} - ${doc.data().zipcode} - ${doc.data().state}</a>
                        `;
                        //getPrevID(doc.id);
                    }
                }
            });
        });*/
    }


    function getID(id,year,make,model,zipcode,state){
        var selected = document.getElementById('purchaseSelected');
        selected.innerHTML = `
        <p style="color:#F07B60;"><b>Selected:</b> ${year} ${make} ${model} - ${zipcode} - ${state}</p>
        `;
        
        purchaseRegistration = id;
        console.log(originalPurchase);
        console.log(purchaseRegistration);
    }

function checkDate(id,year,make,model,zip,state,dateSearch,dropdown){
    saleRegistration = id;
    db.collection("sales").onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.id == id && doc.data().saleDate == dateSearch){
                dropdown.innerHTML += `
                <a class="dropdown-item" href="#" id="selectDrop" onClick="getID('${id}','${year}','${make}','${model}','${zip}','${state}'); getSaleID('${saleRegistration}','${year}','${make}','${model}','${zip}','${state}')">${year} ${make} ${model} - ${zip} - ${state}</a>
                `;

                //getSaleID(saleRegistration,year,make,model,zip,state);
            }
        })
    })


    
}

function check(){
    if(confirm('Are you sure you want to register this sale?')){
        update();
    }else{
        alert('Nothing has been done!');
    }
}

    function search(){
        var inputSearch = document.getElementById('inputBuySearch').value.toUpperCase();
        var dropdown = document.getElementById('searchDropContent');
        var dateSearch = document.getElementById('inputBuySearchDate').value;


        dropdown.innerHTML = ``;

        db.collection("purchases").onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(dateSearch != "" && inputSearch != ""){
                    if((doc.data().model == inputSearch || doc.data().make == inputSearch || doc.data().year == inputSearch) && doc.data().saleID != null){

                        checkDate(doc.data().saleID,doc.data().year,doc.data().make,doc.data().model,doc.data().zipcode,doc.data().state,dateSearch,dropdown);

                    }
                }else if(dateSearch == "" && inputSearch != ""){
                    if((doc.data().model == inputSearch || doc.data().make == inputSearch || doc.data().year == inputSearch) && doc.data().saleID != null){
                        saleRegistration = doc.data().saleID;
                        dropdown.innerHTML += `
                            <a class="dropdown-item" href="#" onClick="getID('${doc.id}','${doc.data().year}','${doc.data().make}','${doc.data().model}','${doc.data().zipcode}','${doc.data().state}'); getSaleID('${saleRegistration}','${doc.data().year}','${doc.data().make}','${doc.data().model}','${doc.data().zipcode}','${doc.data().state}');">${doc.data().year} ${doc.data().make} ${doc.data().model} - ${doc.data().zipcode} - ${doc.data().state}</a>
                            `;


                        getSaleID(saleRegistration,doc.data().year,doc.data().make,doc.data().model,doc.data().zipcode,doc.data().state);
                    }
                }else if(dateSearch != "" && inputSearch == ""){
                    if(doc.data().saleID != null){
                        checkDate(doc.data().saleID,doc.data().year,doc.data().make,doc.data().model,doc.data().zipcode,doc.data().state,dateSearch,dropdown);
                    }
                }
            });
        });

    }

    function getSaleID(id,year,make,model,zip,state){
        db.collection("sales").onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.id == id){
                    var selected = document.getElementById('purchaseSelect');
                    originalPurchase = doc.data().purchaseID;
                    purchaseRegistration = doc.data().purchaseID;
                    selected.innerHTML = `
                    <p style="color:green;"><b>Already Saved:</b> ${year} ${make} ${model} - ${zip} - ${state}</p>
                    `;
                    var sDate = document.getElementById('inputSaleDate');
                    var sPrice = document.getElementById('inputSalePrice');
                    var sBuyer = document.getElementById('inputSaleBuyer');
                    var sL = document.getElementById('checkL');
                    var sOther = document.getElementById('inputSaleOther');
                    var LLabel = document.getElementById('labelL');
                    


                    sDate.value = doc.data().saleDate;
                    sPrice.value = doc.data().salePrice;
                    sBuyer.value = doc.data().buyer.toUpperCase();
                    if(doc.data().buyer == 'L'){
                        if(doc.data().itsInL == true){
                            document.getElementById('checkL').style.display = "block";
                            sL.checked = true;
                            LLabel.style.display = "block";
                            document.getElementById('inputSaleOther').style.display = "none";
                        }
                        else{
                            document.getElementById('checkL').style.display = "block";
                            document.getElementById('checkL').checked = false;
                            LLabel.style.display = "block";
                            document.getElementById('inputSaleOther').style.display = "none";
                        }
                    }
                    else if(doc.data().buyer == 'OTHER'){
                        document.getElementById('checkL').style.display = "none";
                        LLabel.style.display = "none";
                        document.getElementById('inputSaleOther').style.display = "block";
                        document.getElementById('inputSaleOther').value = doc.data().otherBuyer.toUpperCase();
                    }
                    else{
                        sBuyer.value = doc.data().buyer;
                    }
                }
            });
        });
    }


    function update(){
        var LCheck = document.getElementById('checkL');
    
        var _registerDate = fechaString;
        var _saleDate = datepicker.value;
        var _salePrice = document.getElementById('inputSalePrice').value;
        var _buyer = document.getElementById('inputSaleBuyer').value.toUpperCase().trim();
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
            var _otherBuyer = document.getElementById('inputSaleOther').value.trim();
        }
        else{
            var _itsInL = null;
            var _otherBuyer = null;
        }
        if(purchaseRegistration == originalPurchase){
            db.collection("sales").doc(saleRegistration).update({
                saleDate: _saleDate,
                salePrice: _salePrice,
                buyer: _buyer,
                itsInL: _itsInL,
                otherBuyer: _otherBuyer
            })
            .then((docRef) => {
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
                alert("The Sale has been edited successfully");
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                alert("Something went wrong... Try again later");
                /*content.innerHTML = `
                <p style="color:red;">Something went wrong... Try again later.</p>
                `*/
                
            });  
        }
        else{
            deleteOnPurchase();
            registerOnPurchase(saleRegistration);
            var _purchaseID = purchaseRegistration;
            db.collection("sales").doc(saleRegistration).update({
                saleDate: _saleDate,
                salePrice: _salePrice,
                buyer: _buyer,
                itsInL: _itsInL,
                otherBuyer: _otherBuyer,
                purchaseID: _purchaseID
            })
            .then((docRef) => {
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
                alert("The Sale has been edited successfully");
                
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                /*content.innerHTML = `
                <p style="color:red;">Something went wrong... Try again later.</p>
                `*/
                alert("Something Unexpected Happened... Try Again");
            });  
        }
        
        
           
        
    }
    function deleteOnPurchase(){
        db.collection("purchases").doc(originalPurchase).update({
            saleID: null
        }).then((docRef) => {})
        .catch(function(error) {
            console.error("Error adding document: ", error);
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

    