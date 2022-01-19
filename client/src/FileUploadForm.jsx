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

    try {
      await uploadFileToFirebase(file, setUploadFileProgress);
    } catch(err) {
      console.error(err);
      return err;
      //  WE NEED TO HANDLE THIS ERROR IN THE UI AS WELL
    }

    try {
      const newFormData = new FormData();
      newFormData.append('upload-file', file);
  
      const response = await fetch('/policy-docs/upload', {
        method: 'POST',
        body: newFormData
      });

      console.log(response)
      return;

    } catch(err) { 
      console.error(err)
      return err;
    };

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