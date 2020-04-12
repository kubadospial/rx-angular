import { jestMatcher } from '@test-helpers';

import { select } from '../../../src/lib/core/operators/select';
import { EMPTY, NEVER, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';

interface PrimitiveState {
  bol: boolean;
  str: string;
  num: number;
}

interface NestedState {
  obj: {
    key1: {
      key11: {
        key111: string;
      };
    };
  };
}

let testScheduler: TestScheduler;

beforeEach(() => {
  testScheduler = new TestScheduler(jestMatcher);
});

// tslint:disable: no-duplicate-string
describe('select', () => {
  describe('should mirror the behavior of the stateful and', () => {
    it('should mirror EMPTY', () => {
      testScheduler.run(({ expectObservable }) => {
        const source = EMPTY;
        expectObservable(source.pipe(select())).toBe('|');
      });
    });

    it('should mirror NEVER', () => {
      testScheduler.run(({ expectObservable }) => {
        const source = NEVER;
        expectObservable(source.pipe(select())).toBe('');
      });
    });

    it('should pass values as they are', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const source = cold('v|');
        expectObservable(source.pipe(select())).toBe('v|');
      });
    });

    it('should pass only distinct values', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const source = cold('v-v-a-a-v|');
        expectObservable(source.pipe(select())).toBe('v---a---v|');
      });
    });
    it('should pass only values other than undefined', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const values = { u: undefined, a: null, b: '', c: [], d: {} };
        const source = cold('u-a-b-c-d|', values);
        expectObservable(source.pipe(select())).toBe('--a-b-c-d|', values);
      });
    });

    it('should replay the last emitted value', () => {});

    it('should accept one operator', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const values = { a: 2, b: 4 };
        const source = cold('a|', values);
        expectObservable(source.pipe(select(map(v => v * 2)))).toBe(
          'b|',
          values
        );
      });
    });

    it('should accept multiple operators', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const values = { a: 2, b: 4 };
        const source = cold('a|', values);
        expectObservable(
          source.pipe(
            select(
              map(v => v * 2),
              map(v => v / 2),
              map(v => v * 2),
              map(v => v / 2),
              map(v => v * 2)
            )
          )
        ).toBe('b|', values);
      });
    });
  });

  it('should accept one string keyof T', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const primitiveState: PrimitiveState = {
        bol: true,
        str: 'string',
        num: 42
      };
      const source: Observable<PrimitiveState> = cold('a|', {
        a: primitiveState
      });
      expectObservable(source.pipe(select('bol'))).toBe('a|', { a: true });
    });
  });

  it('should accept multiple strings keyof T', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const nestedState: NestedState = {
        obj: { key1: { key11: { key111: 'test' } } }
      };
      const source: Observable<NestedState> = cold('a|', { a: nestedState });
      expectObservable(
        source.pipe(select('obj', 'key1', 'key11', 'key111'))
      ).toBe('a|', { a: 'test' });
    });
  });

  it('should accept one operator', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const primitiveState: PrimitiveState = {
        bol: true,
        str: 'string',
        num: 42
      };
      const source: Observable<PrimitiveState> = cold('a|', {
        a: primitiveState
      });
      expectObservable(source.pipe(select(map(s => s.bol)))).toBe('a|', {
        a: true
      });
    });
  });

  it('should accept multiple operators', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const nestedState: NestedState = {
        obj: { key1: { key11: { key111: 'test' } } }
      };
      const source: Observable<NestedState> = cold('a|', { a: nestedState });
      expectObservable(
        source.pipe(
          select(
            map(s => s.obj),
            map(s => s.key1),
            map(s => s.key11),
            map(s => s.key111)
          )
        )
      ).toBe('a|', { a: 'test' });
    });
  });
});
