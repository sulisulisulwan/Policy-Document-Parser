import 'regenerator-runtime';
import React from 'react';
import { useState } from 'react';
import sendFile from './sendFile.js';


const FileUploadForm = () => {
  const [ fileUploadStatus, setFileUploadStatus ] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const file = e.target[0].files[0] 
      await sendFile(file)
      setFileUploadStatus('File Uploaded Successfully')
    } catch(err) {
      setFileUploadStatus('Error uploading file');
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file"></input>
        <input type="submit" value="Submit File"></input>
        <span className="file-upload-status">{ fileUploadStatus }</span>
      </form>
    </>
  )
}

export default FileUploadForm