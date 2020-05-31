import firebaseAdmin from 'firebase-admin';

export class Storage {
    static serviceAccountPath = require('./../prepper-marketplace-firebase-adminsdk-ecpa3-bc8f22102a');
    static bucketName = 'gs://prepper-marketplace.appspot.com/';

    static initialize() {
        firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(this.serviceAccountPath),
            storageBucket: this.bucketName
        });
        return firebaseAdmin.storage().bucket();
    }
}
