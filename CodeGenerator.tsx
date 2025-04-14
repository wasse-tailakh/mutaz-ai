'use client';

import { useState, useEffect } from "react";
import { generateAggregatedCode } from "@/utils/aggregator";
import { saveProject, getProjects, Project } from "@/utils/fileManager";

export default function CodeGenerator() {
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
    } catch (error: any) {
      setCode("حدث خطأ: " + error.message);
    }
    setLoading(false);
  };

  const handleSaveProject = async () => {
    try {
      const project = await saveProject(code);
      setProjects([...projects, project]);
      alert("تم حفظ المشروع بنجاح!");
    } catch (error: any) {
      alert("خطأ أثناء الحفظ: " + error.message);
    }
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <div className="card my-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        لوحة تحكم تنفيذ المشاريع بالذكاء الاصطناعي
      </h1>
      <textarea
        className="input-field h-40 mb-4"
        placeholder="اكتب وصف المشروع هنا (مثال: اصنع لعبة بسيطة بلغة JavaScript)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="flex gap-4 mb-6">
        <button
          className="btn-primary"
          onClick={handleExecute}
          disabled={loading}
        >
          {loading ? "جاري التنفيذ..." : "تنفيذ"}
        </button>
        {code && (
          <button
            className="btn-secondary"
            onClick={handleSaveProject}
          >
            حفظ المشروع
          </button>
        )}
      </div>
      {code && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">الكود الناتج</h2>
            <pre className="code-preview bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap text-sm">
              {code}
            </pre>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">المعاينة</h2>
            {selectedProject ? (
              <div className="border rounded-lg h-96 overflow-auto">
                <iframe
                  srcDoc={selectedProject.content}
                  className="w-full h-full"
                  title="Preview"
                  sandbox="allow-scripts"
                />
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">قم بحفظ المشروع أو اختر مشروعًا من القائمة للمعاينة</p>
            )}
          </div>
        </div>
      )}
      {projects.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">المشاريع المحفوظة</h2>
          <ul className="space-y-2">
            {projects.map((proj, index) => (
              <li key={index}>
                <button
                  onClick={() => handleSelectProject(proj)}
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
