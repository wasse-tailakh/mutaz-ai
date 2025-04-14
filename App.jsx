import { useState, useEffect } from "react";
import { generateAggregatedCode } from "../utils/aggregator";
import { saveProject, getProjects } from "../utils/fileManager";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProjectPath, setSelectedProjectPath] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      const projs = await getProjects();
      setProjects(projs);
    };
    fetchProjects();
  }, []);

  const handleExecute = async () => {
    setLoading(true);
    try {
      const aggregatedCode = await generateAggregatedCode(prompt);
      setCode(aggregatedCode);
    } catch (error) {
      setCode("حدث خطأ: " + error.message);
    }
    setLoading(false);
  };

  const handleSaveProject = async () => {
    try {
      const filePath = await saveProject(code);
      const projs = await getProjects();
      setProjects(projs);
      alert("تم حفظ المشروع في: " + filePath);
    } catch (error) {
      alert("خطأ أثناء الحفظ: " + error.message);
    }
  };

  const handleSelectProject = (projectPath) => {
    setSelectedProjectPath(projectPath);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">
        لوحة تحكم تنفيذ المشاريع بالذكاء الاصطناعي
      </h1>
      <textarea
        className="w-full h-40 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="اكتب وصف المشروع هنا (مثال: اصنع لعبة بسيطة بلغة JavaScript)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="flex space-x-4">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          onClick={handleExecute}
          disabled={loading}
        >
          {loading ? "جاري التنفيذ..." : "تنفيذ"}
        </button>
        {code && (
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
            onClick={handleSaveProject}
          >
            حفظ المشروع
          </button>
        )}
      </div>
      {code && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">الكود الناتج</h2>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap text-sm">
              {code}
            </pre>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">المعاينة</h2>
            {selectedProjectPath ? (
              <iframe
                src={`file://${selectedProjectPath}`}
                className="w-full h-96 border rounded-lg"
                title="Preview"
              />
            ) : (
              <p className="text-gray-600">قم بحفظ المشروع أو اختر مشروعًا من القائمة للمعاينة</p>
            )}
          </div>
        </div>
      )}
      {projects.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">المشاريع المحفوظة</h2>
          <ul className="space-y-2">
            {projects.map((proj, index) => (
              <li key={index}>
                <button
                  onClick={() => handleSelectProject(proj.path)}
                  className="text-blue-600 hover:underline"
                >
                  {proj.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
