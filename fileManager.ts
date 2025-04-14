// تعريف نوع المشروع
export interface Project {
  id: string;
  name: string;
  content: string;
  createdAt: string;
}

/**
 * حفظ مشروع في تخزين المتصفح
 * @param code محتوى الكود الذي سيتم حفظه
 * @returns معلومات المشروع المحفوظ
 */
export async function saveProject(code: string): Promise<Project> {
  try {
    // إنشاء معرف فريد للمشروع
    const timestamp = new Date().toISOString();
    const id = `project-${timestamp}`;
    const name = `مشروع ${new Date().toLocaleString('ar-SA')}`;
    
    // إنشاء كائن المشروع
    const project: Project = {
      id,
      name,
      content: code,
      createdAt: timestamp
    };
    
    // الحصول على المشاريع الحالية من التخزين المحلي
    const existingProjects = await getProjects();
    
    // إضافة المشروع الجديد
    const updatedProjects = [...existingProjects, project];
    
    // حفظ المشاريع المحدثة في التخزين المحلي
    localStorage.setItem('ai-projects', JSON.stringify(updatedProjects));
    
    return project;
  } catch (error: any) {
    console.error('Error saving project:', error);
    throw new Error(`فشل في حفظ المشروع: ${error.message}`);
  }
}

/**
 * الحصول على قائمة المشاريع المحفوظة
 * @returns قائمة المشاريع
 */
export async function getProjects(): Promise<Project[]> {
  try {
    // التحقق من وجود المتصفح (لتجنب أخطاء SSR)
    if (typeof window === 'undefined') {
      return [];
    }
    
    // الحصول على المشاريع من التخزين المحلي
    const projectsJson = localStorage.getItem('ai-projects');
    
    // إذا لم تكن هناك مشاريع، إرجاع مصفوفة فارغة
    if (!projectsJson) {
      return [];
    }
    
    // تحويل JSON إلى كائنات
    const projects: Project[] = JSON.parse(projectsJson);
    
    // ترتيب المشاريع حسب تاريخ الإنشاء (الأحدث أولاً)
    return projects.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error: any) {
    console.error('Error getting projects:', error);
    return [];
  }
}

/**
 * حذف مشروع من التخزين المحلي
 * @param id معرف المشروع المراد حذفه
 * @returns نجاح العملية
 */
export async function deleteProject(id: string): Promise<boolean> {
  try {
    // الحصول على المشاريع الحالية
    const projects = await getProjects();
    
    // تصفية المشاريع لإزالة المشروع المحدد
    const updatedProjects = projects.filter(project => project.id !== id);
    
    // حفظ المشاريع المحدثة
    localStorage.setItem('ai-projects', JSON.stringify(updatedProjects));
    
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
}
