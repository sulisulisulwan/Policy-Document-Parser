import 'regenerator-runtime';
import uploadFileToFirebase from './uploadFileToFirebase.js';
import React from 'react';
import { useState, useRef } from 'react';
import axios from 'axios';

const FileUploadForm = () => {
  const progressBar = useRef();
  const [ uploadFileProgress, setUploadFileProgress ] = useState(0)

  const handleSubmit = async (e) => {

    progressBar.current.style.display = 'block';
    e.preventDefault();
    const file = e.target[0].files[0] 
    try {
      await uploadFileToFirebase(file, setUploadFileProgress);
    } catch(err) {
      console.error(err);
      return err;
      //  WE NEED TO HANDLE THIS ERROR IN THE UI AS WELL
    }


    const body = { 
      'upload-file': file
    }

    try {
      const newFormData = new FormData();
      newFormData.append('upload-file', file);
      // await axios.post('/policy-docs/upload', newFormData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // })
      return await fetch('/policy-docs/upload', {
        method: 'POST',
        body: newFormData
        // headers: {
        //   "Content-Type": "multipart/form-data"
        // }
      });
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
        <h3 ref={progressBar} style={{ display: 'none'}}>{ `Uploaded ${uploadFileProgress} %` }</h3>
      </form>
    </>
  )
}

export default FileUploadForm