interface CategoryNavProps {
  className?: string;
}

export function CategoryNav({ className }: CategoryNavProps) {
  const categories = [
    { id: 'frontend', name: '前端开发' },
    { id: 'ai', name: 'AI技术' },
    { id: 'backend', name: '后端开发' },
    { id: 'tools', name: '开发工具' },
  ];

  return (
    <nav className={className}>
      <h2 className="text-xl font-semibold mb-4">分类</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}