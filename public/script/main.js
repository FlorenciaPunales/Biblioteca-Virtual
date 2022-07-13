const app = Vue.createApp({
  data() {
    return {
      user: {},
      userName: "",
      userPhoto: "",
      userMail: "",
      tittle: 'Inicio',
      data: [],
      dataActual: [],
      comentarios: [],
      comentariosReal:[],
      logued: false,
      pagina: 1,
      element: "",
      escrito:0,
      comment: "",
      

    }
  },
  created() {
    this.data = data.items
    this.dataActual = this.data.slice(0, 10)




  },
  mounted() {
    document.querySelectorAll(".page-item").forEach(item => {
      if (item.children[0].innerText == this.pagina.toString()) {
        item.classList.add('active')
      }
    })


    window.onload = function () {
      
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          this.user = user;
          document.getElementById('quickstart-sign-in').textContent = 'Cerrar Sesión';
          document.getElementById('quickstart-google-sign-in').textContent = 'Cerrar Sesión';
        } else {
          document.getElementById('quickstart-sign-in').textContent = 'Iniciar Sesión';
          document.getElementById('quickstart-google-sign-in').textContent = 'Iniciar Sesión con Google';
          this.user = {}
        }
        document.getElementById('quickstart-sign-in').disabled = false;
        document.getElementById('quickstart-google-sign-in').disabled = false;
      });
    };
    var commentRef = firebase.database().ref('/Comentarios/');
    commentRef.on("child_added",(data) =>{
      getcomments(data)
    })
    var commentRef2 = firebase.database().ref('/ComentariosReal/');
    commentRef2.on("child_added",(data) =>{
      getcommentsReal(data)
    })
  },
  methods: {
    escribirComentarios: function() {
      let title = document.getElementById('titleComment').value
      let comment = document.getElementById('comment').value
      let newCommentKey = firebase.database().ref().child('Comentarios').push().key;
      let comentario = {
        bookId:newCommentKey,
        title: title,
        comment: comment,
        escrito: this.escrito,
        user: this.userName || this.userMail,
        photo: this.userPhoto
      } 
      console.log(newCommentKey)
      console.table(comentario)
      var update = {}
      update['/Comentarios/' + newCommentKey] = comentario
      firebase.database().ref().update(update)
      document.querySelectorAll('input[type="text"]').forEach(input => input.value = '');

    },
    escribirComentariosReal: function(id) {
      /* let comment = document.getElementById('commentReal').value */
      let newCommentKey = firebase.database().ref().child('ComentariosReal').push().key;
      console.log(id)
      console.log(String(id))
      let comentarioReal = {
        bookId: id,
        comment: this.comment,
        user: this.user.displayName,
        photo: this.user.photoURL
      }
      console.log(newCommentKey)
      console.log(comentarioReal)
      
      var update = {}
      update['/ComentariosReal/' + newCommentKey] = comentarioReal
      firebase.database().ref().update(update)
      
    },
    cambiarPag: function (booleano) {
      if (booleano) {
        if (this.pagina != Math.ceil(data.length / 10)) {
          this.pagina = this.pagina + 1
          this.cargarLibros(this.pagina)
        }
      }
      else {
        if (this.pagina != 1) {
          this.pagina = this.pagina - 1
          this.cargarLibros(this.pagina)
        }
      }


    },

    cargarLibros: function (n) {
      let min = (n - 1) * 10
      let max = n * 10
      this.dataActual = this.data.slice(min, max)
      let items = document.querySelectorAll(".page-item")
      this.pagina = n
      items.forEach(item => {

        if (item.children[0].innerText == this.pagina.toString()) {
          item.classList.add('active')
        }
        else {

          item.classList.remove('active')
        }
      })
    },
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
          this.logued = true;
          this.user = user;
          (JSON.parse(JSON.stringify(this.user)).photoURL) ? (this.userPhoto = JSON.parse(JSON.stringify(this.user)).photoURL) : (this.userPhoto = "");
          this.userMail = JSON.parse(JSON.stringify(this.user)).email;
          (JSON.parse(JSON.stringify(this.user)).displayName) ? (this.userName = JSON.parse(JSON.stringify(this.user)).displayName) : (this.userName = "");
          console.log(this.user)
        }
        else {
          this.logued = false;
          this.userMail=""
          this.userName=""
          this.user = null;
          this.userPhoto = ""
          
          
        }
      })
    }
  }

}).mount('#app')
function getcomments(data) {
  let comentario = {
    bookId: data.val().bookId,
    title: data.val().title,
    comment: data.val().comment,
    escrito: data.val().escrito,
    user: data.val().user,
    photo: data.val().photo
  }
  app.comentarios.push(comentario)
}

function getcommentsReal(data) {
  let comentarior = {
    bookId:data.val().bookId,
    comment: data.val().comment,
    user: data.val().user,
    photo: data.val().photo
  }
  app.comentariosReal.push(comentarior)
}
const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
  toastTrigger.addEventListener('click', () => {
    const toast = new bootstrap.Toast(toastLiveExample)

    toast.show()
  })
}
