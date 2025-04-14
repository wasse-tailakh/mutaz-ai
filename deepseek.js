export async function generateCodeDeepseek(prompt) {
  try {
    const response = await fetch("https://api.deepseek.ai/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    return data.code;
  } catch (error) {
    throw new Error("Deepseek API Error: " + error.message);
  }
}
