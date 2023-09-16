const express = require('express');
const cors = require('cors');
const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");
const { my_api_key } = require('../temp/api-key');
const { SAMPLE_CONTEXT, SAMPLE_PROMPTS } = require('./shared/chat-samples');

/* const BASE_URL = "https://generativelanguage.googleapis.com/";
const API_VERSION = 'v1beta2'; */
const MODEL_NAME = 'models/chat-bison-001';
const API_KEY = my_api_key;

const client = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

const context = SAMPLE_CONTEXT;
const examples = SAMPLE_PROMPTS;

const app = express();

app.use(cors()); // Enable CORS for all endpoints
app.use(express.json()); 

app.post('/post', (req, res) => {
    // Get the data from the request body
    const data = req.body;

    const messages = [];

    messages.push({ "content": data?.text });

    client.generateMessage({
        // required, which model to use to generate the result
        model: MODEL_NAME,
        // optional, 0.0 always uses the highest-probability result
        temperature: 0.25,
        // optional, how many candidate results to generate
        candidateCount: 1,
        // optional, number of most probable tokens to consider for generation
        top_k: 40,
        // optional, for nucleus sampling decoding strategy
        top_p: 0.95,
        prompt: {
            // optional, sent on every request and prioritized over history
            context: context,
            // optional, examples to further finetune responses
            examples: examples,
            // required, alternating prompt/response messages
            messages: messages,
        },
    }).then(result => {
        // console.log(JSON.stringify(result, null, 2));
        res.send(result);
    });

});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
