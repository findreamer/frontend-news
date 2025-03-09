'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface ReadingHistoryProps {
  userId: string | undefined;
}

export function ReadingHistory({ userId }: ReadingHistoryProps) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch(`/api/profile/history?userId=${userId}`);
        const data = await res.json();

        console.log('data => ', data)
        setHistory([]);
      } catch (error) {
        console.error('获取阅读历史失败:', error);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchHistory();
    }
  }, [userId]);

  if (loading) {
    return <div className="text-center py-4">加载中...</div>;
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        暂无阅读历史
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {(history || []).map((item: any) => (
        <article key={item.id} className="border-b pb-4">
          <Link href={`/article/${item.articleId}`}>
            <h3 className="text-lg font-semibold hover:text-blue-600">
              {item.article.title}
            </h3>
          </Link>
          <p className="text-gray-600 mt-2">{item.article.description}</p>
          <div className="text-sm text-gray-500 mt-2">
            阅读时间：{new Date(item.createdAt).toLocaleString()}
          </div>
        </article>
      ))}
    </div>
  );
}