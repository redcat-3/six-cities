import EventEmitter from 'node:events';
import { FileWriterInterface } from './file-writer.interface.js';
import { WriteStream } from 'node:fs';
import { createWriteStream } from 'node:fs';

const CHUNK_SIZE = 2 ** 16; // 64KB

export default class TSVFileWriter implements FileWriterInterface {
  private stream: WriteStream;

  constructor(public readonly filename: string) {
    this.stream = createWriteStream(this.filename, {
      flags: 'w',
      encoding: 'utf8',
      highWaterMark: CHUNK_SIZE,
      autoClose: true,
    });
  }

  public async write(row: string): Promise<void> {
    if (!this.stream.write(`${row}\n`)) {
      await EventEmitter.once(this.stream, 'drain');
    }
  }
}
