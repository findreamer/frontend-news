import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // const history = await prisma.article.findMany({
    //   where: { userId: session.user.email },
    //   include: {
    //     article: {
    //       select: {
    //         id: true,
    //         title: true,
    //         description: true,
    //       },
    //     },
    //   },
    //   orderBy: {
    //     createdAt: 'desc',
    //   },
    //   take: 20,
    // });

    return NextResponse.json({});
  } catch (error) {
    console.error('获取阅读历史失败:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}