'use client';

import { useState } from 'react';
import { ReadingHistory } from './ReadingHistory';
// import { UserComments } from './UserComments';
// import { UserLikes } from './UserLikes';

interface ProfileTabsProps {
  userId: string | undefined;
}

export function ProfileTabs({ userId }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState('history');

  const tabs = [
    { id: 'history', label: '阅读历史' },
    { id: 'comments', label: '我的评论' },
    { id: 'likes', label: '我的点赞' },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="border-b">
        <nav className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'history' && <ReadingHistory userId={userId} />}
        {/* {activeTab === 'comments' && <UserComments userId={userId} />} */}
        {/* {activeTab === 'likes' && <UserLikes userId={userId} />} */}
      </div>
    </div>
  );
}