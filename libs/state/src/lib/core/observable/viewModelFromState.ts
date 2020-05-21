/**
 * @description
 *
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from
 * the previous item. You can provide a custom comparison for each key individually by setting a `KeyCompareMap<T>`.
 * If no comparison is provided for a specified key, an equality check is used by default.
 *
 * If properties of the source change, which are not specified for comparison, no change will be emitted.
 *
 * The name `viewModelFromState` was picked since it internally iterates over the `keys` and utilizes the
 * [some](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/some) method in order to
 * compute if values are distinct or not.
 *
 * @example
 * // An example comparing the first letters of just the name property.
 *
 * import { of } from 'rxjs';
 * import { viewModelFromState } from 'rx-angular/state';
 *
 * interface Person {
 *    age: number;
 *    name: string;
 * }
 * // compare the first letters of the name property
 * const customComparison: KeyValueMap<Person> = {
 *   name: (oldName, newName) => oldName.substring(0, 3) === newName.substring(0, 3)
 * };
 *
 * of(
 *   { age: 4, name: 'Foo1'},
 *   { age: 7, name: 'Bar'},
 *   { age: 5, name: 'Foo2'},
 *   { age: 6, name: 'Foo3'},
 * ).pipe(
 *   viewModelFromState(customComparison),
 * )
 * .subscribe(x => console.log(x));
 *
 * // displays:
 * // { age: 4, name: 'Foo1' }
 * // { age: 7, name: 'Bar' }
 * // { age: 5, name: 'Foo2' }
 *
 * @see {@link KeyCompareMap}
 *
 * @param {KeyCompareMap<T>} keyCompareMap
 * @docsPage viewModelFromState
 * @docsCategory operators
 */
export function viewModelFromState<T extends object, K extends keyof T>(
  keysOrMap: K[] | KeyCompareMap<T>,
  compare?: CompareFn<T[K]>
) {
  return {};
}
