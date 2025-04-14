import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

// تهيئة OpenAI مع مفتاح API
const getOpenAIClient = () => {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'YOUR_API_KEY_HERE',
  });
};

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'يجب توفير وصف المشروع' },
        { status: 400 }
      );
    }
    
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
    
    return NextResponse.json({
      code: response.choices[0].message.content || "لم يتم الحصول على نتيجة."
    });
  } catch (error: any) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json(
      { error: `خطأ في OpenAI API: ${error.message}` },
      { status: 500 }
    );
  }
}
