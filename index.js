// 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

const { Configuration, OpenAIApi } = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');

const configuration = new Configuration({
	organization: 'org-CFySizSA8w4dFPwhdAW7zppN',
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// create a simple express api that calls the function above

const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = 3080;

app.post('/', async (req, res) => {
	const { message } = req.body;
	console.log(message, 'message');
	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: `${message}`,
		max_tokens: 1000,
		temperature: 0.5,
	});

	res.json({
		// data: responde.data,
		message: response.data.choices[0].text,
	});
});
http.createServer(app).listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
