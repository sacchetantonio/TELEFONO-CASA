// https://console.firebase.google.com/u/0/project/luppio-demo/overview

let addFrase;
let frase;

async function firebaseSetup() {
  const fb_app_url = "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
  const fb_database_url =
    "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

  const { initializeApp } = await import(fb_app_url);
  const {
    getDatabase,
    ref,
    push,
    set,
    onValue,
    //ricordati di uncommentare questo nella pagina totalieh
  } = await import(fb_database_url);

  const firebaseConfig = {
    apiKey: "AIzaSyAN6UEJ1m2UkV6DIo3UZVD6KZefzlu4pPc",
  authDomain: "marittima-a5724.firebaseapp.com",
  databaseURL: "https://marittima-a5724-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "marittima-a5724",
  storageBucket: "marittima-a5724.appspot.com",
  messagingSenderId: "684140424990",
  appId: "1:684140424990:web:92dca5406ced6cc3f9a30f"
};

  const app = initializeApp(firebaseConfig);
  const myDatabase = getDatabase(app);

  const fraseRef = ref(myDatabase, "frase");

  onValue(fraseRef, function (snapshot) {
    const data = snapshot.val();
    frase = data;
  });

  addFrase = function (properties) {
    const singleFraseRef = push(fraseRef);
    set(singleFraseRef, properties);
  };
}

firebaseSetup();
