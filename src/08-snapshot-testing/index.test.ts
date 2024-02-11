import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const list = ['first', 'second', 'three'];
    const newLinkedList = generateLinkedList<string>(list);
    expect(newLinkedList).toStrictEqual({
      next: {
        next: {
          next: {
            next: null,
            value: null,
          },
          value: 'three',
        },
        value: 'second',
      },
      value: 'first',
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const list = ['first', 'second', 'three'];
    const newLinkedList = generateLinkedList<string>(list);
    expect(newLinkedList).toMatchSnapshot();
  });
});
