import { generateCode as generateCodeOpenAI } from "./openai";
import { generateCodeDeepseek } from "./deepseek";

export async function generateAggregatedCode(prompt) {
  try {
    const [resultOpenAI, resultDeepseek] = await Promise.allSettled([
      generateCodeOpenAI(prompt),
      generateCodeDeepseek(prompt),
    ]);

    const codes = [];
    if (resultOpenAI.status === "fulfilled") codes.push(resultOpenAI.value);
    if (resultDeepseek.status === "fulfilled") codes.push(resultDeepseek.value);

    return codes.length > 0 ? codes[0] : "لم يتم الحصول على نتيجة من الأدوات المتاحة.";
  } catch (error) {
    return "حدث خطأ أثناء تجميع النتائج: " + error.message;
  }
}
