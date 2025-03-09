export function NewsList() {
  // 这里后续会通过 API 获取真实数据
  const mockNews = [
    {
      id: 1,
      title: "Next.js 14 发布",
      description: "带来更快的服务器组件和改进的开发体验",
      date: "2024-03-20",
    },
    // ... 更多模拟数据
  ];

  return (
    <div className="space-y-4">
      {mockNews.map((news) => (
        <article
          key={news.id}
          className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold">{news.title}</h3>
          <p className="text-gray-600 mt-2">{news.description}</p>
          <div className="flex justify-between items-center mt-4">
            <time className="text-sm text-gray-500">{news.date}</time>
            <div className="space-x-2">
              <button className="text-gray-500 hover:text-blue-500">点赞</button>
              <button className="text-gray-500 hover:text-blue-500">收藏</button>
              <button className="text-gray-500 hover:text-blue-500">分享</button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}