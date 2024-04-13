import { Transform } from 'stream';

const decode = new Transform({
  transform(chunk, enc, cb) {
    // this.push(chunk);
    // console.log(enc);
    cb(null, chunk);
  }
});

export default decode;