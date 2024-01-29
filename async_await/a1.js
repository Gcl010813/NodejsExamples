import thenfs from 'then-fs'

async function getFiles() {
  const f1 = await thenfs.readFile('./files/file1.txt', 'utf8')
  console.log(f1)
  const f2 = await thenfs.readFile('./files/file2.txt', 'utf8')
  console.log(f2)
}

// getFiles()

/* async await 执行顺序测试 */
console.log('a')
// 在async方法中 , 第一个await之前的代码会同步执行  await之后的代码会异步执行
async function test() {
  console.log('b')
  const f1 = await thenfs.readFile('./files/file1.txt', 'utf8')
  const f2 = await thenfs.readFile('./files/file2.txt', 'utf8')
  console.log(f1, f2)
  console.log('d')
}
test()
console.log('c')
