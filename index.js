module.exports = class Storage {
  constructor (mongoose) {
    this.mongoose = mongoose;
    this.buckets = {};
  }
  bucket (bucketName) {
    return this.buckets[bucketName] || (this.buckets[bucketName] = new Bucket(this.mongoose, bucketName));
  }
};

class Bucket {
  constructor (mongoose, bucketName) {
    this.bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
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
    return this.bucket.openUploadStreamByName(filename, metadata);
  }
  rename (id, filename, callback) {
    return this.bucket.rename(id, filename, callback);
  }
  delete (id, cb) {
    return this.bucket.delete(id, cb);
  }
}
