const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();

const genAI = new GoogleGenerativeAI("AIzaSyDG30JYNqxorXsuC1CoKik");

app.get("/ask/:name", async (req, res) => {
  const name = req.params.name;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Write a romantic message for ${name}, using sweet and cute words.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head><title>Love Message for ${name}</title></head>
      <body><h1>Love Message for ${name}</h1><p>${text}</p></body>
      </html>
    `);
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
  // Keep process alive — Express server is event-driven, so no code needed here
});
