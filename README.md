# دليل استخدام تطبيق AI Project Executor

## مقدمة
تطبيق AI Project Executor هو تطبيق سطح مكتب يعتمد على Electron وReact وTailwindCSS، ويتكامل مع وكلاء الذكاء الاصطناعي مثل OpenAI لتوليد الكود بناءً على وصف المستخدم.

## متطلبات النظام
- نظام تشغيل: Windows أو macOS أو Linux
- Node.js (الإصدار 14 أو أحدث)
- npm (مدير حزم Node.js)

## تثبيت التطبيق
1. قم بتنزيل أو استنساخ مجلد المشروع
2. افتح موجه الأوامر (Terminal) وانتقل إلى مجلد المشروع
3. قم بتثبيت التبعيات باستخدام الأمر:
   ```
   npm install
   ```
4. قم بتعديل ملف `.env` وإضافة مفتاح API الخاص بك:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

## تشغيل التطبيق
لتشغيل التطبيق في وضع التطوير:
```
npm run dev
```

## استخدام التطبيق
1. بعد تشغيل التطبيق، ستظهر واجهة المستخدم الرئيسية
2. اكتب وصف المشروع في مربع النص (مثال: "اصنع لعبة بسيطة بلغة JavaScript")
3. انقر على زر "تنفيذ" لتوليد الكود باستخدام الذكاء الاصطناعي
4. بعد توليد الكود، يمكنك حفظه بالنقر على زر "حفظ المشروع"
5. يمكنك معاينة المشاريع المحفوظة من قائمة "المشاريع المحفوظة"

## هيكلية المشروع
- `public/`: يحتوي على ملفات HTML الأساسية
- `src/main/`: يحتوي على كود Electron الرئيسي
- `src/renderer/`: يحتوي على مكونات React وواجهة المستخدم
- `src/utils/`: يحتوي على وحدات المساعدة مثل واجهات API للذكاء الاصطناعي
- `src/projects/`: المجلد الذي يتم فيه حفظ المشاريع المولدة

## ملاحظات هامة
- يتطلب التطبيق اتصالاً بالإنترنت للتواصل مع واجهات برمجة الذكاء الاصطناعي
- لاستخدام OpenAI، يجب الحصول على مفتاح API وإضافته في ملف `.env`
- يمكن تعديل ملف `src/utils/openai.js` لتغيير نموذج الذكاء الاصطناعي المستخدم

## استكشاف الأخطاء وإصلاحها
- إذا واجهت مشكلة في تشغيل التطبيق، تأكد من تثبيت جميع التبعيات بشكل صحيح
- إذا لم يتم توليد الكود، تأكد من صحة مفتاح API وتوفر اتصال بالإنترنت
- للمزيد من المساعدة، راجع وثائق Electron وReact وTailwindCSS
