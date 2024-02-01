const express = require('express');
const bodyParser = require('body-parser');
const {Web3} = require("web3")

const app = express();
const port = 3000;

// Hardcode the contract addresses for demonstration purposes
const octopusCenterAddress = '0xYourOctopusCenterAddress';
const octopusExampleAddress = '0xYourOctopusExampleAddress';

// Connect to Ethereum node
const web3 = new ethers.providers.JsonRpcProvider('http://localhost:8545'); // Replace with your Ethereum node URL

// Connect to OctopusCenter contract
const octopusCenterAbi = require('./build/contracts/OctopusCenter.json').abi;
const octopusCenter = new web3.eth.Contract(octopusCenterAbi, octopusCenterAddress);

// Connect to OctopusContractExample contract
const octopusExampleAbi = require('./build/contracts/OctopusContractExample.json').abi;
const octopusExample = new ethers.Contract(octopusExampleAddress, octopusExampleAbi, provider);

// Parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint for users to send data to the server
app.post('/sendData', async (req, res) => {
  const { signingTarget, plainText, transactorAddress } = req.body;

  // Register the message with OctopusCenter
 const registerMessageTx = await octopusCenter.registerMessage(signingTarget).send({from: your address});
const wallet = web3.eth.accounts.wallet.add(privateKey);
  await registerMessageTx.wait();

  // Listen for the MessageEmit event on OctopusCenter
  const subscription = octopusCenter.events.MessageEmit()
subscription.on("data", console.log);
  octopusCenter.on(filter, async (message) => {
    // Send plain text to the transactor
    const transactor = new web3.Wallet(process.env.PRIVATE_KEY, provider); // Replace with the private key of the transactor
    const sendPlainTextTx = await octopusExample.connect(transactor).sendPlainText(plainText, transactorAddress);
    await sendPlainTextTx.wait();
    
    // Respond to the user
    res.status(200).json({ message: 'Data sent successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

