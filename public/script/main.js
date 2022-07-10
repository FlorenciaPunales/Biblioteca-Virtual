Vue.createApp({
  data(){
      return {
        user: {},
        usuario: {},
        usuarioName: "",
        usuarioPhoto: "",
        usuarioEmail: "",
        tittle:'Inicio',
      }
  },
  created(){
    
      
  },
  mounted(){
    window.onload = function () {
      fadeOute();
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          this.usuario = user;
          document.getElementById('quickstart-sign-in').textContent = 'sign out';
          document.getElementById('quickstart-google-sign-in').textContent = 'sign out';
        } else {
          document.getElementById('quickstart-sign-in').textContent = 'sign in';
          document.getElementById('quickstart-google-sign-in').textContent = 'sign in with google';
          this.usuario = {}
        }
        document.getElementById('quickstart-sign-in').disabled = false;
        document.getElementById('quickstart-google-sign-in').disabled = false;
      });
    };
  },
  methods:{
    toggleSignIn: function () {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut();
      } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          document.getElementById('quickstart-sign-in').disabled = false;
        });
      }
      document.getElementById('quickstart-sign-in').disabled = true;
    },
    toggleGoogleSignIn: function () {
      if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        firebase.auth().signInWithPopup(provider).then(function (result) {
          var token = result.credential.accessToken;
          var user = result.user;
        }).catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
          } else {
            console.error(error);
          }
        });
      } else {
        firebase.auth().signOut();
      }
      document.getElementById('quickstart-google-sign-in').disabled = true;
    },
    handleSignUp: function () {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
    },
    sendEmailVerification: function () {
      firebase.auth().currentUser.sendEmailVerification().then(function () {
        alert('Email Verification Sent!');
      });
    },
    sendPasswordReset: function () {
      var email = document.getElementById('email').value;
      firebase.auth().sendPasswordResetEmail(email).then(function () {
        alert('Password Reset Email Sent!');
      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
      });
    },
      
  },
  computed: {
    checkLogin: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.usuario = user;
          this.usuarioEmail = JSON.parse(JSON.stringify(this.usuario)).email;
          this.usuarioPhoto = JSON.parse(JSON.stringify(this.usuario)).photoURL;
          this.usuarioName = JSON.parse(JSON.stringify(this.usuario)).displayName;
          console.log(this.usuario)
        }
        else {
          this.usuario = null;
          this.usuarioEmail = "";
          this.usuarioPhoto = "";
          this.usuarioName = "";
        }
      })
    }
  }

}).mount('#app')
// loader
// function loader() {
//   document.querySelector('.loader-container').classList.add('active');

// }
// function fadeOute() {
//   setTimeout(loader, 4000)
// }
// window.onscroll = () => {
//   searchForm.classList.remove('active')
//   if (window.scrollY > 80) {
//     document.querySelector('.header .header-2').classList.add('active');

//   } else {
//     document.querySelector('.header .header-2').classList.remove('active');

//   }
// }


