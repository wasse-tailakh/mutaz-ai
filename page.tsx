import CodeGenerator from '@/components/CodeGenerator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <CodeGenerator />
      </div>
    </main>
  );
}
