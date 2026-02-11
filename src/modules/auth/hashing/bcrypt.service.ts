import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService extends HashingService {
  async hash(passowrd: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(passowrd, salt);
  }

  async compare(passowrd: string, passowrdHash: string): Promise<boolean> {
    return await bcrypt.compare(passowrd, passowrdHash);
  }
}
