'use client';

/**
 * وحدة تجميع نتائج الذكاء الاصطناعي من مختلف المزودين
 */

export async function generateAggregatedCode(prompt: string): Promise<string> {
  try {
    // استخدام Promise.allSettled للسماح بإكمال العملية حتى لو فشلت إحدى الواجهات
    const [resultOpenAI, resultDeepseek] = await Promise.allSettled([
      generateCodeOpenAI(prompt),
      generateCodeDeepseek(prompt),
    ]);

    const codes: string[] = [];
    
    // إضافة النتائج الناجحة فقط
    if (resultOpenAI.status === "fulfilled") codes.push(resultOpenAI.value);
    if (resultDeepseek.status === "fulfilled") codes.push(resultDeepseek.value);

    // إرجاع النتيجة الأولى المتاحة أو رسالة خطأ
    return codes.length > 0 
      ? codes[0] 
      : "لم يتم الحصول على نتيجة من الأدوات المتاحة.";
  } catch (error: any) {
    console.error("Error in code aggregation:", error);
    return `حدث خطأ أثناء تجميع النتائج: ${error.message}`;
  }
}

/**
 * استدعاء واجهة برمجة التطبيقات الخاصة بـ OpenAI
 */
async function generateCodeOpenAI(prompt: string): Promise<string> {
  try {
    const response = await fetch('/api/generate/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'حدث خطأ في استدعاء OpenAI API');
    }

    const data = await response.json();
    return data.code;
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    throw new Error(`خطأ في OpenAI API: ${error.message}`);
  }
}

/**
 * استدعاء واجهة برمجة التطبيقات الخاصة بـ DeepSeek
 */
async function generateCodeDeepseek(prompt: string): Promise<string> {
  try {
    const response = await fetch('/api/generate/deepseek', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'حدث خطأ في استدعاء DeepSeek API');
    }

    const data = await response.json();
    return data.code;
  } catch (error: any) {
    console.error('DeepSeek API Error:', error);
    throw new Error(`خطأ في DeepSeek API: ${error.message}`);
  }
}
