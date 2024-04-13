import chalk from 'chalk';
import { pipeline } from 'stream';
import CyrilicDecoder from './decoder.js';
import decode from './decode.js';

// non-flowing mode 
// process.stdin
//   .setEncoding('ASCII')
//   .on('readable', () => {
//     let chunk
//     while ((chunk = process.stdin.read()) !== null) {
//       log(
//         chalk.red(`Chunk read (${chunk.length} bytes):\n`)
//         // chalk.red(`Chunk read (${chunk.length} bytes):\n`) + `${chunk}`
//       )
//     }
// })
// .on('end', () => console.log('End of stream'))

// Flowing mode
// process.stdin
//   // .setEncoding('UTF-8')
//   .on('data', (chunk) => {
//     console.log(chunk);
//   });

// const res = await decoder.decode(process.stdin);

pipeline(
  process.stdin,
  decode,
  process.stdout,
  (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
  }
);

// process.on('exit', () => {
//   const logger = new Console({ stout: process.stout})
//   console.log(res);
//   return res;
// })