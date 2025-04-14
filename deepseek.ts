export async function generateCodeDeepseek(prompt: string): Promise<string> {
  try {
    const response = await fetch("https://api.deepseek.ai/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY || ''}`,
      },
      body: JSON.stringify({ prompt }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.code || "لم يتم الحصول على نتيجة.";
  } catch (error: any) {
    console.error("Deepseek API Error:", error);
    throw new Error(`خطأ في Deepseek API: ${error.message}`);
  }
}
