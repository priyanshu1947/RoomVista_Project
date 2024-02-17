const sk = "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";
const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const messages = document.getElementById("chat-messages");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value;
  input.value = "";

  messages.innerHTML += `<div class="message user-message">
    <img src="images/user.png" alt="user icon"> <span>${message}</span>
  </div>`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions", // Corrected URL
      {
        prompt: message,
        model: "text-davinci-003",
        temperature: 0,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sk}`,
        },
      }
    );

    const chatbotResponse = response.data.choices[0].text;

    messages.innerHTML += `<div class="message bot-message">
      <img src="images/chatbot.png" alt="bot icon"> <span>${chatbotResponse}</span>
    </div>`;
  } catch (error) {
    console.error("Error making OpenAI API request:", error);
  }
});