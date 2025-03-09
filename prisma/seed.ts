// 创建一个简单的 seed 脚本来填充一些初始数据 
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 首先删除所有相关数据（注意顺序）
  await prisma.article.deleteMany()
  await prisma.user.deleteMany()
  
  // 创建测试用户
  const hashedPassword = await bcrypt.hash('123456', 10)
  
  try {
    const user = await prisma.user.upsert({
      where: {
        email: 'test@example.com',
      },
      update: {
        password: hashedPassword,
      },
      create: {
        name: '测试用户',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'USER',
      },
    })
    
    console.log('Created/Updated test user:', user)
  } catch (error) {
    console.error('Error creating user:', error)
  }

  // 创建分类
  // const categories = await Promise.all([
  //   prisma.category.create({
  //     data: { name: '前端开发', description: '前端技术相关新闻' },
  //   }),
  //   prisma.category.create({
  //     data: { name: 'AI技术', description: 'AI相关新闻' },
  //   }),
  //   prisma.category.create({
  //     data: { name: '后端开发', description: '后端技术相关新闻' },
  //   }),
  // ])

  // 创建标签
  // const tags = await Promise.all([
  //   prisma.tag.create({ data: { name: 'React' } }),
  //   prisma.tag.create({ data: { name: 'Vue' } }),
  //   prisma.tag.create({ data: { name: 'Next.js' } }),
  //   prisma.tag.create({ data: { name: 'AI' } }),
  // ])

  // 创建测试文章
  // await prisma.article.create({
  //   data: {
  //     title: 'Next.js 14 发布',
  //     description: '带来更快的服务器组件和改进的开发体验',
  //     content: '详细内容...',
  //     published: true,
  //     authorId: user.id,
  //     categoryId: categories[0].id,
  //     tags: {
  //       connect: [{ id: tags[2].id }],
  //     },
  //   },
  // })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })