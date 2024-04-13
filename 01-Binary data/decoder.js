import { Readable } from 'stream'

class CyrilicDecoder {

  #symbols = [
    "А",
    "Б",
    "В",
    "Г",
    "Д",
    "Е",
    "Ё",
    "Ж",
    "З",
    "И",
    "Й",
    "К",
    "Л",
    "М",
    "Н",
    "У",
    "Ф",
    "Х",
    "Ц",
    "Ч",
    "Ш",
    "Щ",
    "Ъ",
    "Ы",
    "Ь",
    "Э",
    "Ю",
    "Я",
  ]

  
  // { a: 1 }
  #encodeMap = this.#symbols.reduce((acc, curr, i) => {
    acc[curr] = i;
    return acc;
  }, {});

  // { 0: 'a', }
  #decodeMap = { ...this.#symbols };

  encode(str) {
    return str.split().map((letter) => {
      if (!this.#encodeMap[letter]) {
        throw new Error('Invalid string')
      }
      return (this.#encodeMap[letter] >>> 0).toString(2);
    });
  }

  async decode(bin) {
    const data = bin.setEncoding('ASCII')
    let result = '';
    for await (const chunk of data) {
      // console.log(chunk, chunk.length)
      result += chunk;
    }

    return result;
  }
}

export default CyrilicDecoder;

