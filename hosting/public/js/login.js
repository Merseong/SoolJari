function loginButtonAction() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(res => {
        const user = res.user;
        console.log(user.uid);
    });
};
