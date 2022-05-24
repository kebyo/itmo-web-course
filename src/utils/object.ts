import { castArray as _castArray, isNil } from 'lodash';

/**
 * Применяет изменения из changes в target (мутирует target)
 *
 * @param target - целевой объект
 * @param changes - изменения
 */
export function applyChanges<T>(target: T, changes: Partial<T>): void {
  for (const field of Object.keys(changes)) {
    target[field] = changes[field];
  }
}

/**
 * Конвертирует значение в массив, возвращая [] для null и undefined
 */
export function castArray<T>(something: T | T[] | null | undefined): T[] {
  return isNil(something) ? [] : _castArray(something);
}
