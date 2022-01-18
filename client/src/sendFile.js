const sendFile = async(file) => {

  try {
    await fetch('/document/upload', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: file
    });

    //what to do here?

  } catch(err) {
    console.error(err)
    return err;
  };

}


export default sendFile;