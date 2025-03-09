import { ProtectedPage } from '@/components/ProtectedPage';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';

async function getBookmarks(userId: string) {
  return await prisma.bookmark.findMany({
    where: { userId },
    include: {
      article: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export default async function BookmarksPage() {
  const session = await getServerSession();
  const bookmarks = session?.user?.email 
    ? await getBookmarks(session.user.email)
    : [];

  return (
    <ProtectedPage>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">我的收藏</h1>
        <div className="grid gap-4">
          {bookmarks.map((bookmark) => (
            <article
              key={bookmark.id}
              className="bg-white rounded-lg shadow p-6"
            >
              <h2 className="text-xl font-semibold mb-2">
                {bookmark.article.title}
              </h2>
              <p className="text-gray-600">
                {bookmark.article.description}
              </p>
              <div className="mt-4 text-sm text-gray-500">
                收藏于 {bookmark.createdAt.toLocaleDateString()}
              </div>
            </article>
          ))}
          {bookmarks.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              暂无收藏内容
            </div>
          )}
        </div>
      </div>
    </ProtectedPage>
  );
}