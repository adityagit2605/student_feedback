const prisma = require('./src/config/database');
async function test() {
  try {
    console.log('Prisma models:', Object.keys(prisma).filter(k => !k.startsWith('$')));
    const userCount = await prisma.user.count();
    console.log('User count:', userCount);
  } catch (err) {
    console.error('Test failed:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}
test();
