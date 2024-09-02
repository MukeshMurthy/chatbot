// node --version # Should be >= 18
// npm install @google/generative-ai express

const express = require("express");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const API_KEY = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction:
    "Introduction:\nHello! I'm Clara, your sex education and mental health assistant. My aim is to provide you with accurate information about sex education, address related health issues, and support your mental well-being. Let's start by gathering some details to assist you effectively.\n\nTopic of Inquiry:\nPlease specify the topic you would like to learn about. Whether it’s mental health, puberty, contraception, relationships, sexual health, or any other related topic, I'm here to help you understand.\n\nOR\n\nMental Health Check:\nIf you'd like to discuss your mental well-being, please answer a few questions (maximum 5) about your current state of mind. We can start with your stress level.\n\nYour Age Group:\nTo provide the most relevant information, please confirm your age group: 13-15 years old or 16-18 years old.\n\nSpecific Question or Concern:\nWhat specific question or concern do you have? Please provide details so I can offer you the most accurate information.\n\nHealth Issues:\nIf you have a health issue, especially related to sexual health, I recommend consulting a doctor for personalized advice and treatment.\n\nMental Health Check Redirect:\nIf you chose to discuss your mental health, let's begin with understanding your stress level:\n\nHow would you describe your stress level lately?\nAre you experiencing any pressure from school, family, or friends?\nHow is your sleep quality and duration?\nIs there anything in your family situation that’s been causing you stress?\nDo you have someone you trust to talk to about personal matters?\nSupport and Advice:\nBased on your answers:\n\nIf you’re feeling stressed, remember to take breaks, practice relaxation techniques like deep breathing, and seek support from trusted individuals.\nIf you suspect abuse or feel unsafe, I will respectfully ask further questions to understand your situation and advise you to report to authorities, parents, or seek professional help such as therapy.\nConfidentiality and Respect:\nYour privacy and dignity are important. All information shared is treated with the utmost confidentiality and respect.\n\nInteraction Beyond Scope:\nIf you ask about topics unrelated to sex education, health issues, or mental well-being, Clara will respond with: \"Sorry, it appears your query is outside the scope of my expertise in sex education, health, or mental well-being. Please feel free to ask me any questions related to these areas, and I'll gladly provide assistance.\"\n\nBy following these guidelines, Clara aims to empower you with knowledge, support your mental health, and ensure you have the resources you need to make informed decisions and stay healthy. ",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

async function run(userInput) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history:[ { role: "user", parts: [ {text: "helo\n"}, ], }, { role: "model", parts: [ {text: "Hello there! 👋 Welcome to Vandhanam Organics! I'm PicklePal, your friendly guide to all things delicious and healthy. What can I help you find today? 😊\n"}, ], }, { role: "user", parts: [ {text: "pricee\n"}, ], }, { role: "model", parts: [ {text: "Okay, let's talk prices! 😊 What are you interested in today?\n\n* **Pickles:** We have a variety of delicious, homemade pickles like mango, garlic, and lemon. They come in 100g (₹80) and 200g (₹160) sizes, with delivery charges included.\n\n* **Brown Rice:** Our brown rice is organic and comes in 1kg to 5kg sizes. 1kg costs ₹120 with delivery, and you get a 2% discount for each additional kg you order.\n\n* **Brown Sugar:** We have 100g (₹110) and 200g (₹215) bags of our delicious, organic brown sugar, with delivery charges included.\n\nJust let me know what you're looking for and I can give you more details! \n"}, ], }, { role: "user", parts: [ {text: "hi\n"}, ], }, { role: "model", parts: [ {text: "Hello there! 👋 It's PicklePal here, ready to help you find some delicious and healthy goodies from Vandhanam Organics! What can I help you with today? 😊 \n"}, ], }, { role: "user", parts: [ {text: "price"}, ], }, { role: "model", parts: [ {text: "Okay, let's talk prices! 😊 What are you interested in today?\n\n* **Pickles:** We have a variety of delicious, homemade pickles like mango, garlic, and lemon. They come in 100g (₹80) and 200g (₹160) sizes, with delivery charges included.\n\n* **Brown Rice:** Our brown rice is organic and comes in 1kg to 5kg sizes. 1kg costs ₹120 with delivery, and you get a 2% discount for each additional kg you order.\n\n* **Brown Sugar:** We have 100g (₹110) and 200g (₹215) bags of our delicious, organic brown sugar, with delivery charges included.\n\nJust let me know what you're looking for and I can give you more details! \n\n\n"}, ], }, { role: "user", parts: [ {text: "about company"}, ], }, { role: "model", parts: [ {text: "You're curious about Vandhanam Organics? That's great! We're passionate about bringing you the freshest, most authentic, and delicious organic products made with love. \n\nHere's a little about us:\n\n* **Our Roots:** Vandhanam Organics is all about bringing you the goodness of home-style cooking, with a focus on organic ingredients and traditional methods. We believe in preserving the natural flavors and health benefits of our products.\n* **Our Promise:** We use only the finest, freshly sourced organic produce, and everything is made without artificial colors, flavors, or preservatives. Our pickles, brown rice, and brown sugar are all free from harmful additives, so you can enjoy them guilt-free.\n* **Our Values:** We're committed to sustainability, ethical sourcing, and supporting local farmers. By choosing Vandhanam Organics, you're not just getting delicious food, you're also supporting a healthier environment and a brighter future.\n\nDo you have any specific questions about our company or our products? I'd love to share more! 😊 \n"}, ], }, { role: "user", parts: [ {text: "contact details of company"}, ], }, { role: "model", parts: [ {text: "You're ready to connect! Here's how you can get in touch with Vandhanam Organics:\n\n**For online orders and inquiries:**\n\n* **Website:** [Insert your website address here]\n* **Email:** [Insert your email address here]\n* **Phone:** [Insert your phone number here]\n\n**For any other assistance:**\n\n* **Social Media:** You can also find us on [Insert social media platform(s) and handles here]\n\nWe're always happy to hear from our customers, so don't hesitate to reach out! 😊 \n"}, ], }, ],
  });
  const result = await chatSession.sendMessage(userInput);
  const response = result.response;
  return response
    .text()
    .replace(/\*/g, "</p>\n<p>")
    .replace(/\n\n\n+/g, "\n\n")
    .replace(/\s*<br\s*>/g, "<br>");
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/loader.gif", (req, res) => {
  res.sendFile(__dirname + "/loader.gif");
});
app.post("/chat", async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log("incoming /chat req", userInput);
    if (!userInput) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const response = await run(userInput);
    res.json({ response });
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
