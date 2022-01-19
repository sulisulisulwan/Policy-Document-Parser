import 'regenerator-runtime';
import { 
  getDownloadURL, //
  ref, //creates a reference to a storage place in Firebase
  uploadBytesResumable //creates a pausable, cancelable, and resumable stream;
} from '@firebase/storage';
import { storage } from './firebase.js';


const uploadFileToFirebase = (file, setUploadFileProgress) => {
  //If there is no file, return.  Do nothing.
  if (!file) {
    return;
  }
  //We create a reference to the place in the Firebase remote storage with this ref() function from the Firebase SDK
  const storageRef = ref(storage, `/files/${file.name}`)
  
  //We create an upload stream using the Firebase SDK, passing in the storage reference
  const uploadTask = uploadBytesResumable(storageRef, file)

  //Upon status change of the upload stream...
  uploadTask.on('state_changed', (snapshot) => {

    //snapshot contains stream data at the point of state change

    //Calculate the percentage of transfer completion.
    const progress = Math.round(
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    )
    setUploadFileProgress(`Uploaded ${progress} %`)

  }, 
  (err) => console.log(err),
  () => {

    getDownloadURL(uploadTask.snapshot.ref)
      .then(url => console.log(url))
      .catch(err => console.error(err))

  }
  );
};


export default uploadFileToFirebase;