'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export function NewsHeader() {
  const { data: session } = useSession();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="py-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">前端资讯</h1>
        <div className="flex items-center gap-4">
          <input
            type="search"
            placeholder="搜索资讯..."
            className="px-4 py-2 border rounded-lg"
          />
          {session ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                <img
                  src={session.user?.image || '/default-avatar.png'}
                  alt="头像"
                  className="w-8 h-8 rounded-full"
                />
                <span>{session.user?.name}</span>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    个人中心
                  </Link>
                  <Link
                    href="/bookmarks"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    我的收藏
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    设置
                  </Link>
                  <hr className="my-2" />
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    退出登录
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                登录
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50"
              >
                注册
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}