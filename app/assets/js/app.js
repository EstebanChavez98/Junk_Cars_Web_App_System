function login(){

    var loginEmail = document.getElementById('inputEmail').value;
    var loginPassword = document.getElementById('inputPassword').value;

    firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
                .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            /*document.getElementById('inputEmail').value = '';
            document.getElementById('inputPassword').value = '';*/
            var content = document.getElementById('content');
            content.innerHTML = `
            <p align="center" style="color:red;">${errorMessage}</p>
            `
            if(errorCode=='auth/wrong-password'){
              document.getElementById('inputPassword').value = ''
            }
            else{
              document.getElementById('inputEmail').value = '';
            document.getElementById('inputPassword').value = '';
            }
        });

        firebase.auth().onAuthStateChanged(user => {
          if(user) {
            window.location = 'zeus/dashboard.html'; //After successful login, user will be redirected to home.html
          }
        });
}

function signUp(){
  var registerEmail = document.getElementById('registerEmail').value;
  var registerPassword = document.getElementById('registerPassword').value;

  firebase.auth().createUserWithEmailAndPassword(registerEmail, registerPassword)
  .then(function() {
  })
  .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
  });

}

function logout() {
  var contentMain = document.getElementById('contentMain');
  contentMain.innerHTML = `
  <p align="center" style="color:red;">Logging Out...</p>
  `
  firebase.auth().signOut()
      .then(function() {
          console.log("Close Session...")
          contentMain.innerHTML = `
          <div class="container">
          <div class="alert alert-warning" role="alert">
          Saliendo usuario...
          </div>
          <div>
          `;
          window.location = 'index.html';
      })
      .catch(function(error) {
          console.log(error)
      })
}

observador();

function observador() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log('Existe usuario activo')
        console.log('***************')
        console.log(user.emailVerified);
        console.log('***************')
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        
        // ...
    } else {
        // User is signed out.
        console.log('No Existe usuario activo');
        
    }

});
}