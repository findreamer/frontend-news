interface UserStatsProps {
  stats: {
    articles: number;
    comments: number;
    likes: number;
    bookmarks: number;
  } | undefined;
}

export function UserStats({ stats }: UserStatsProps) {
  const statItems = [
    { label: '发布文章', value: stats?.articles || 0 },
    { label: '评论', value: stats?.comments || 0 },
    { label: '点赞', value: stats?.likes || 0 },
    { label: '收藏', value: stats?.bookmarks || 0 },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">数据统计</h3>
      <div className="grid grid-cols-2 gap-4">
        {statItems.map((item) => (
          <div key={item.label} className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {item.value}
            </div>
            <div className="text-sm text-gray-600">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}