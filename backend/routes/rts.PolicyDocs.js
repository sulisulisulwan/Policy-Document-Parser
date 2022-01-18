const router = require('express').Router();



router.post('/upload', (req, res) => {
  
  //where does this file go first?
  console.log('file', req.file);
  res.sendStatus(201);
})



module.exports = router;