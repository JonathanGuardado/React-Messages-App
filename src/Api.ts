import random from 'lodash/random';
import faker from 'faker';
import { Observable } from 'rxjs';
import _uniqueId from 'lodash/uniqueId';

enum Priority {
  Error,
  Warn,
  Info,
}

export interface Message {
  message: string;
  priority: Priority;
  key: string
}

const observable = new Observable<Message>(subscriber => {
  const generate = () => {
    const message = faker.lorem.sentence();
    const priority = random(0, 2) as Priority;
    const nextInMS = random(500, 3000);
    const key = _uniqueId ("message-")
    subscriber.next({ message, priority, key});
    setTimeout(generate, nextInMS);
  };
  generate();
});

const subscribe = (callback: (message: Message) => void) => {
  const subscription = observable.subscribe({
    next: callback,
  });
  return () => subscription.unsubscribe();
};

export default subscribe;
