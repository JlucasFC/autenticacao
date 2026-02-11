import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingService {
  abstract hash(passowrd: string): Promise<string>;
  abstract compare(passowrd: string, passowrdHash: string): Promise<boolean>;
}
