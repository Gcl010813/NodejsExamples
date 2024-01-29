import fs from 'fs'

function getFile(fpath) {
  // 返回
  return new Promise(function (resolve, reject) {
    fs.readFile(fpath, 'utf8', (err, data) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(data)
      }
    })
  })
}

getFile('./file1.txt')
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err.message)
  })
