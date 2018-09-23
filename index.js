module.exports = class Storage {
  constructor (mongo, db) {
    console.log(!!mongo.mongo);
    if (mongo.mongo) {
      // Support Mongoose
      this.mongoose = mongo;
      this.mongo = this.mongoose.mongo;
    } else {
      this.mongo = mongo;
      this._db = db;
    }
  }
  get db () {
    if (this._db) {
      return this._db;
    } else {
      return this.mongoose.connection.db;
    }
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
