const axios = require('axios');
const multer = require('multer')
const clientId = "CF473300CI5EBBUOJF7QM277LKO0";
const clientSecret = "e6a4c3d053c3888e7a35b4dd7c4163c3d2d57d08";
module.exports.upload = multer({
  dest: 'panCard/' // Directory to store uploaded files
});
module.exports.panValidate= async (req, res) => {
  try {
    const imagePath = req.file.path;
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        "x-client-id": clientId,
        "x-client-secret": clientSecret,
      },
    };
    // Make a request to the Cashfree API for PAN verification
    const response = await axios.post('https://api.cashfree.com/verification/document/pan', 
    requestOptions,
    {
      front_image: imagePath,
      verification_id: "Carbyne!@#"
      // Add any additional required parameters for the Cashfree API here
    });

    // Handle the response from the Cashfree API here
    console.log(response.data);

    // Send a response back to the client
    res.json({ success: true });
  } catch (error) {
    console.error(error);

    // Send an error response back to the client
    res.status(500).json({ success: false, error: 'An error occurred' });
  }
}


module.exports.gstValidation = async(req, res,next)=>{
    const gstNumber = req.body.GSTIN;
const data = {
  GSTIN: gstNumber,
  businessName: ''
};
console.log(gstNumber)

axios.post('https://api.cashfree.com/verification/gstin', data, {
  headers: {
    'x-client-id': clientId,
    'x-client-secret': clientSecret,
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    res.json(response.data)
  })
  .catch(error => {
    res.json(error.message)
  });
}
