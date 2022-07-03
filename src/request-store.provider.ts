import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class RequestStoreProvider {
  store = new Map<string, Subject<unknown>>();
}
