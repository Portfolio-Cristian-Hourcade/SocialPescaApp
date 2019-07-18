var FirebaseModule = {}
FirebaseModule.InitialiceFB = function () {
  firebase.initializeApp({
    'messagingSenderId': '1047307543610'
  });
  console.log("Initialicen...")
};
FirebaseModule.askForPermissiontoReciveNotifications = async() => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
   
    console.log('token do usuário:', token);

    return token;
  } catch (error) {
    console.error(error);
  }
}
exports.FirebaseModule = FirebaseModule;

