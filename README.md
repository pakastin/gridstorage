# gridstorage
GridFS + Mongoose helper

## Installation
```
npm i gridstorage
```

## API
### new Storage(mongodb) : Storage
```js
const Storage = require('gridstorage');
const mongo = require('mongodb');
const { MongoClient } = mongodb

MongoClient.connect(uri, (err, db) => {
  if (err) {
    throw new Error(err);
  }
  const storage = new Storage(mongo, db);
```
To use with Mongoose:
### new Storage(mongoose) : Storage
```js
const Storage = require('gridstorage');
const mongoose = require('mongoose');

const storage = new Storage(mongoose);
```

### Storage.bucket(bucketName) : Bucket
```js
const videoBucket = storage.bucket('videos');
```

### Bucket.count(filename) : Promise –> Number
```js
if (await videoBucket.count(filename) > 0) {
  return next('Video exists');
}
```

### Bucket.find(...args) : Promise –> Cursor

### Bucket.download(filename, options) : GridFSBucketReadStream

### Bucket.downloadById(id, options) : GridFSBucketReadStream

### Bucket.upload(filename, metadata) : GridFSBucketWriteStream

### Bucket.rename(id, filename, callback) : Promise

### Bucket.delete(id, callback) : Promise
