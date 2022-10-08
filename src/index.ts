import * as path from 'path'
import * as fs from 'fs'
import * as crypto from 'crypto'

import express from 'express'

interface ViewOptions {
  imageFileName: string
}

function view(options: ViewOptions): string {
  return `<img src="/images/${options.imageFileName}" style="width: 100%;">`
}

function randomElement<T>(array: T[]): T {
  const index = crypto.randomInt(array.length) 
  return array[index]
}

const imagesDirectoryPath = path.join(__dirname, 'images')
const imageFileNames = fs.readdirSync(imagesDirectoryPath)

const app = express()

app.use('/images', express.static(imagesDirectoryPath, {
  immutable: true,
  maxAge: '1y',
  index: false,
  lastModified: true,
  etag: true,
  cacheControl: true
}))

app.get('/', (_, res) => {
  res.contentType('text/html')
  res.send(view({
    imageFileName: randomElement(imageFileNames)
  }))
})

app.listen(3000)
