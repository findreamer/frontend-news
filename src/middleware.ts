import {getToken} from 'next-auth/jwt'
import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

// 需要保护的路由路径
const protectedPaths = [
  '/profile',
  '/bookmarks',
  '/settings',
  '/subscriptions'
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // 检查当前路径是否需要保护
  const isProtectedPath = protectedPaths.some(prefix => 
    path.startsWith(prefix)
  );

  if (isProtectedPath) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    });

    // 如果用户未登录，重定向到登录页面
    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// 配置中间件匹配的路由
export const config = {
  matcher: [
    '/profile/:path*',
    '/bookmarks/:path*',
    '/settings/:path*',
    '/subscriptions/:path*'
  ]
};