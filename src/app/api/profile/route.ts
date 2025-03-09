import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { name, bio } = body;

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { name, bio },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('更新个人资料失败:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}