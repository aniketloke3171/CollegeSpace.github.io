firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.

        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";


        var user = firebase.auth().currentUser;

        if (user != null) {

            var email_id = user.email;
            var email_verified = user.emailVerified;
            document.getElementById("user_para").innerHTML = "Welcome User : " + email_id +
                "</br>Email Verified :" + email_verified;
            if (email_verified) {

                document.getElementById("verified").style.display = "none";


            } else {
                document.getElementById("verified").style.display = "block";

            }


            if (email_verified == false) {
                document.getElementById("verified_1").style.display = "none";
            } else {
                document.getElementById("verified_1").style.display = "block";
            }
        }

    } else {
        // No user is signed in.

        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";


    }
});


const auth = firebase.auth()
const database = firebase.database()

function login() {

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);

        // ...
    });

}


function create_account() {

    var userEmail = document.getElementById("uemail_field").value;
    var userPass = document.getElementById("upassword_field").value;


    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)
        .then(function () {
            var userName = document.getElementById("name_field").value;
            var userPRn = document.getElementById("prn_field").value;

            var user = auth.currentUser

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                email : userEmail,
                name: userName,
                prn: userPRn,

                last_login: Date.now()
            }

            // Push to Firebase Database
            database_ref.child('users/' + userPRn).set(user_data)



            alert('user created')
        })
        .catch(function (error) {


            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            window.alert("Error : " + errorMessage);

            // ...
        });

}



function Send_verification() {
    firebase.auth().currentUser.sendEmailVerification()
        .then(() => {
            alert('Email verification sent!');
            // ...
        });

}


function forgetpass() {
    var userEmail = document.getElementById("email_field").value;
    firebase.auth().sendPasswordResetEmail(userEmail)
        .then(() => {
            alert("Password reset email sent!");
            // ..
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });



}


function logout() {
    firebase.auth().signOut();
}


