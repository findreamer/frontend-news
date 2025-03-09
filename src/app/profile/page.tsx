import { ProtectedPage } from '@/components/ProtectedPage';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { UserInfo } from '@/components/profile/UserInfo';
import { UserStats } from '@/components/profile/UserStats';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';

async function getUserData(email: string) {
  return await prisma.user.findUnique({
    where: { email },
    include: {
      _count: {
        select: {
          articles: true,
          comments: true,
          likes: true,
          bookmarks: true,
        },
      },
    },
  });
}

export default async function ProfilePage() {
  const session = await getServerSession();
  const userData = session?.user?.email 
    ? await getUserData(session.user.email)
    : null;

  return (
    <ProtectedPage>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* 左侧个人信息 */}
          <div className="md:col-span-1">
            <UserInfo user={userData} />
            <UserStats stats={userData?._count} />
          </div>
          
          {/* 右侧内容区域 */}
          <div className="md:col-span-3">
            <ProfileTabs userId={userData?.id} />
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}