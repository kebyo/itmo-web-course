import { castArray as _castArray, isNil } from 'lodash';

export interface AnyObject {
  [key: string]: any;
}

/**
 * Если какой-то ключ объекта target равен null или undefined,
 * то применяется значение соответствующего ключа из defaults.
 * Мутирует объект target
 *
 * @param target - целевой объект
 * @param defaults - значения по умолчанию
 */
export function applyDefaults<T>(target: T, defaults: Partial<T>): void {
  for (const key of Object.keys(defaults)) {
    if (isNil(target[key])) {
      target[key] = defaults[key];
    }
  }
}

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
