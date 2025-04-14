import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "YOUR_API_KEY_HERE",
});

export async function generateCode(prompt) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "أنت مطور ذكاء صناعي متقدم. المستخدم سيرسل وصف مشروع، وعليك إنشاء كود HTML/CSS/JS كامل وعملي. أرجع الكود فقط، بدون شروحات.",
      },
      { role: "user", content: prompt },
    ],
  });
  return response.choices[0].message.content;
}
