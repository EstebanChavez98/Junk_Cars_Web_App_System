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
    if(confirm('Are you sure you want to delete this purchase?')){
        db.collection("purchases").doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
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
db.collection("purchases").orderBy("registerDate", "desc").onSnapshot((querySnapshot) => {
    _table.innerHTML = '';
    var title;
    var saleID;
    var comments;
    var inL;
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        if (doc.data().title == true){
            title='YES';
        }else{
            title='NO';
        }

        if (doc.data().isInL == true){
            inL='YES';
        }else{
            inL='NO';
        }

        if(doc.data().saleID == null){
            saleID = 'Not Sold Yet';
        }
        else{
            saleID = 'Sold';
        }

        if(doc.data().comments == ''){
            comments = '';
        }
        else{
            comments = doc.data().comments;
        }


        if(doc.data().saleID == null){
            _table.innerHTML += `
                <tr>
                <td><button type="button" class="btn btn-danger btn-sm" onclick="deleteRecord('${doc.id}')">Delete</button></td>
                <td class="redFont"><p class="white">${saleID}</p></td>
                <td>${doc.data().registerDate}</td>
                <td>${doc.data().purchaseDate}</td>
                <td>${doc.data().year}</td>
                <td>${doc.data().make}</td>
                <td>${doc.data().model}</td>
                <td>${doc.data().color}</td>
                <td>${doc.data().calledTo}</td>
                <td>${doc.data().houPrice}</td>
                <td>${doc.data().lPrice}</td>
                <td>${inL}</td>
                <td>${doc.data().syPrice}</td>
                <td>${doc.data().famPrice}</td>
                <td>${doc.data().otherBuyer}</td>
                <td>${doc.data().otherPrice}</td>
                <td>${doc.data().phone}</td>
                <td>${doc.data().zipcode}</td>
                <td>${doc.data().state}</td>
                <td>${doc.data().purchasePrice}</td>
                <td>${doc.data().cats}</td>
                <td>${title}</td>
                <td>${doc.data().vin}</td>
                <td><img src="${doc.data().carfile}" style="max-width:130px;">
                </td>
                <td><img src="${doc.data().dnifile}" style="max-width:130px;">
                </td>
                <td>${comments}</td>
                </tr>
                `;
                
            

        }else{
            _table.innerHTML += `
                <tr>
                <td><button type="button" class="btn btn-danger btn-sm" onclick="deleteRecord('${doc.id}')">Delete</button></td>
                <td class="greenFont"><p class="white">${saleID}</p></td>
                <td>${doc.data().registerDate}</td>
                <td>${doc.data().purchaseDate}</td>
                <td>${doc.data().year}</td>
                <td>${doc.data().make}</td>
                <td>${doc.data().model}</td>
                <td>${doc.data().color}</td>
                <td>${doc.data().calledTo}</td>
                <td>${doc.data().houPrice}</td>
                <td>${doc.data().lPrice}</td>
                <td>${inL}</td>
                <td>${doc.data().syPrice}</td>
                <td>${doc.data().famPrice}</td>
                <td>${doc.data().otherBuyer}</td>
                <td>${doc.data().otherPrice}</td>
                <td>${doc.data().phone}</td>
                <td>${doc.data().zipcode}</td>
                <td>${doc.data().state}</td>
                <td>${doc.data().purchasePrice}</td>
                <td>${doc.data().cats}</td>
                <td>${title}</td>
                <td>${doc.data().vin}</td>
                <td><img src="${doc.data().carfile}" style="max-width:130px;">
                </td>
                <td><img src="${doc.data().dnifile}" style="max-width:130px;">
                </td>
                <td>${comments}</td>
                </tr>
                `;
        }
    });
});
}
/*
function getModal(id,link,whatIs){
    var modal = document.getElementById(id+'-modal');
    if(whatIs == 1){
        var img = document.getElementById(id+'-img1');
        var modalImg = document.getElementById('img-'+id);
        modal.style.display = "block";
        modalImg.src = link;
        var span = document.getElementsByClassName("close")[0];
        span.onclick = function() {
            modal.style.display = "none";
          }
    }else{
        var img = document.getElementById(id+'-img1');
        var modalImg = document.getElementById('img-'+id);
        modal.style.display = "block";
        modalImg.src = link;
        var span = document.getElementsByClassName("close")[0];
        span.onclick = function() {
            modal.style.display = "none";
          }
    }
}*/




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
        db.collection("purchases").orderBy("registerDate", "desc").onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var gD = new Date(doc.data().purchaseDate);
                var first = new Date(fD);
                var second = new Date(sD);
                if(gD.getTime() >= first.getTime() && gD.getTime() <= second.getTime()){
                    
                    var title;
                    var saleID;
                    var comments;
                    var inL;
                        console.log(`${doc.id} => ${doc.data()}`);
                        if (doc.data().title == true){
                            title='YES';
                        }else{
                            title='NO';
                        }
                
                        if(doc.data().saleID == null){
                            saleID = 'Not Sold Yet';
                        }
                        else{
                            saleID = 'Sold';
                        }
                
                        if(doc.data().comments == null){
                            comments = '';
                        }
                        else{
                            comments = doc.data().comments;
                        }

                        if (doc.data().isInL == true){
                            inL='YES';
                        }else{
                            inL='NO';
                        }

                        if(doc.data().saleID == null){
                            _table.innerHTML += `
                                <tr>
                                <td><button type="button" class="btn btn-danger btn-sm" onclick="deleteRecord('${doc.id}')">Delete</button></td>
                                <td class="greenFont"><p class="white">${saleID}</p></td>
                                <td>${doc.data().registerDate}</td>
                                <td>${doc.data().purchaseDate}</td>
                                <td>${doc.data().year}</td>
                                <td>${doc.data().make}</td>
                                <td>${doc.data().model}</td>
                                <td>${doc.data().color}</td>
                                <td>${doc.data().phone}</td>
                                <td>${doc.data().calledTo}</td>
                <td>${doc.data().houPrice}</td>
                <td>${doc.data().lPrice}</td>
                <td>${inL}</td>
                <td>${doc.data().syPrice}</td>
                <td>${doc.data().famPrice}</td>
                <td>${doc.data().otherBuyer}</td>
                <td>${doc.data().otherPrice}</td>
                                <td>${doc.data().zipcode}</td>
                                <td>${doc.data().state}</td>
                                <td>${doc.data().purchasePrice}</td>
                                <td>${doc.data().cats}</td>
                                <td>${title}</td>
                                <td>${doc.data().vin}</td>
                                <td><img src="${doc.data().carfile}" style="max-width:130px;">
                                </td>
                                <td><img src="${doc.data().dnifile}" style="max-width:130px;">
                                </td>
                                <td>${comments}</td>
                                </tr>
                                `;
                                
                            

                        }else{
                            _table.innerHTML += `
                                <tr>
                                <td><button type="button" class="btn btn-danger btn-sm" onclick="deleteRecord('${doc.id}')">Delete</button></td>
                <td class="greenFont"><p class="white">${saleID}</p></td>
                                <td>${doc.data().registerDate}</td>
                                <td>${doc.data().purchaseDate}</td>
                                <td>${doc.data().year}</td>
                                <td>${doc.data().make}</td>
                                <td>${doc.data().model}</td>
                                <td>${doc.data().color}</td>
                                <td>${doc.data().calledTo}</td>
                <td>${doc.data().houPrice}</td>
                <td>${doc.data().lPrice}</td>
                <td>${inL}</td>
                <td>${doc.data().syPrice}</td>
                <td>${doc.data().famPrice}</td>
                <td>${doc.data().otherBuyer}</td>
                <td>${doc.data().otherPrice}</td>
                                <td>${doc.data().phone}</td>
                                <td>${doc.data().zipcode}</td>
                                <td>${doc.data().state}</td>
                                <td>${doc.data().purchasePrice}</td>
                                <td>${doc.data().cats}</td>
                                <td>${title}</td>
                                <td>${doc.data().vin}</td>
                                <td><img src="${doc.data().carfile}" style="max-width:130px;">
                                </td>
                                <td><img src="${doc.data().dnifile}" style="max-width:130px;">
                                </td>
                                <td>${comments}</td>
                                </tr>
                                `;
                        }
                }
            })
        })
     }
 }

 