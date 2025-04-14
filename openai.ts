import { OpenAI } from 'openai';

// تهيئة OpenAI مع مفتاح API
const getOpenAIClient = () => {
  return new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || 'YOUR_API_KEY_HERE',
  });
};

export async function generateCode(prompt: string): Promise<string> {
  try {
    const openai = getOpenAIClient();
    
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
    
    return response.choices[0].message.content || "لم يتم الحصول على نتيجة.";
  } catch (error: any) {
    console.error("OpenAI API Error:", error);
    throw new Error(`خطأ في OpenAI API: ${error.message}`);
  }
}
