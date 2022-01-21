import 'regenerator-runtime';
import uploadFileToFirebase from './uploadFileToFirebase.js';
import React from 'react';
import { useState, useRef } from 'react';

const FileUploadForm = () => {
  const progressBar = useRef();
  const [ uploadFileProgress, setUploadFileProgress ] = useState('Uploaded 0 %')

  const handleSubmit = async (e) => {

    progressBar.current.style.display = 'block';
    e.preventDefault();

    if (e.target[0].files.length === 0) {
      setUploadFileProgress('Must upload a file!')
      return;
    }

    const file = e.target[0].files[0];
    let firebaseURL;
    try {
      firebaseURL = await uploadFileToFirebase(file, setUploadFileProgress);
    } catch(err) {
      console.error(err);
      return err;
      //  WE NEED TO HANDLE THIS ERROR IN THE UI AS WELL
    }

    let response;
    try {
      const newFormData = new FormData();
      newFormData.append('upload-file', file);
      response = await fetch('/policy-docs/upload', {
        method: 'POST',
        body: newFormData
      });

    } catch(err) { 
      console.error(err)
      return err;
    };

    response = await response.json()
    //make one more call to the server to update the uploaded document with the url firebase url reference
  }


  return (
    <>
      <form onSubmit={handleSubmit} encrypt="multipart/form-data">
        <input name="upload-file" type="file"></input>
        <input type="submit" value="Upload"></input>
        <h3 ref={progressBar} style={{ display: 'none'}}>{ `${uploadFileProgress}` }</h3>
      </form>
    </>
  )
}

export default FileUploadForm