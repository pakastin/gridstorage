module.exports = class Storage {
  constructor (mongo, db) {
    if ('mongo' in mongo) {
      // Support Mongoose
      const mongoose = mongo;
      this.mongo = mongoose.mongo;
      this.db = mongoose.connection.db;
      return;
    }
    this.mongo = mongo;
    this.db = db;
  }
  bucket (bucketName) {
    return new Bucket(this.mongo, this.db, bucketName);
  }
};

class Bucket {
  constructor (mongo, db, bucketName) {
    this.bucket = new mongo.GridFSBucket(db, {
      bucketName
    });
  }
  count (filename) {
    return this.bucket.find({ filename }).count();
  }
  find (...args) {
    return this.bucket.find(...args);
  }
  download (filename, options) {
    return this.bucket.openDownloadStreamByName(filename, options);
  }
  downloadById (id, options) {
    return this.bucket.openDownloadStream(id, options);
  }
  upload (filename, metadata) {
    return this.bucket.openUploadStream(filename, metadata);
  }
  rename (id, filename, callback) {
    return this.bucket.rename(id, filename, callback);
  }
  delete (id, cb) {
    return this.bucket.delete(id, cb);
  }
}
