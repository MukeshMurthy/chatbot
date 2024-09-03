// node --version # Should be >= 18
// npm install @google/generative-ai express

const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.API_KEY;

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    // ... other safety settings
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [
          {text: "hi"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Hey there! 👋  Welcome to Vandhanam Organics! I'm PicklePal, your friendly guide to all things delicious and healthy.  What can I help you with today?  😋 Are you interested in our yummy pickles, the goodness of brown sugar, or the wholesome goodness of brown rice? 🌾 \n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "types of pickle"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "We"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "types of pickles\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "We've got a delicious selection of pickles for you! 😋  Here's what we offer:\n\n* **Mango Pickle:**  Tangy, sweet, and spicy, this pickle is a classic favorite.  \n* **Garlic Pickle:**  A robust pickle with a strong garlic flavor, perfect for adding a kick to your dishes.\n* **Lemon Pickle:**  A refreshingly zesty pickle that's both tangy and flavorful. \n\nWhich one catches your eye? 🤔  I can tell you more about each one, including their nutrition information, if you'd like! \n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "mango pickle price"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Our mango pickles are a real treat!  😋  Here's the pricing:\n\n* **100 grams:** ₹80 \n* **200 grams:** ₹160\n\nDelivery charges will be added to the final price.  \n\nDo you have any more questions about our mango pickle, or would you like to know more about our other products? 😄\n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "how to contact vandhanam organics"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "You can reach us in a few ways! \n\n* **Website:** [Insert website address here] \n* **Phone:** [Insert phone number here] \n* **Email:** [Insert email address here]\n\nWe're always happy to answer any questions you have.  😊 \n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "how to order brown rice"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Ordering our delicious brown rice is super easy!  Here's how you can do it:\n\n**1. Choose your quantity:** We offer brown rice in quantities ranging from 1kg to 5kg.\n\n**2. Calculate the price:** The price for 1kg of brown rice is ₹120, and you'll get a 2% discount for every additional kilogram. \n\n**Example:**\n* 2kg: ₹120 + (₹120 x 0.02) = ₹122.40\n* 3kg: ₹120 + (₹120 x 0.02 x 2) = ₹124.80\n\n**3. Contact us:** You can order through our website, call us at [Insert phone number], or email us at [Insert email address].\n\nWe'll be happy to help you place your order and answer any questions you may have!  😊 \n"},
        ],
      },
    ],
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/loader.gif', (req, res) => {
  res.sendFile(__dirname + '/loader.gif');
});
app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log('incoming /chat req', userInput)
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
