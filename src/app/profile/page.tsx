import { ProtectedPage } from '@/components/ProtectedPage';
import { getServerSession } from 'next-auth/next';
import Image from 'next/image'

export default async function ProfilePage() {
  const session = await getServerSession();

  return (
    <ProtectedPage>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">个人中心</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4">
            <Image
              src={session?.user?.image || '/default-avatar.png'}
              alt="用户头像"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold">{session?.user?.name}</h2>
              <p className="text-gray-600">{session?.user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}