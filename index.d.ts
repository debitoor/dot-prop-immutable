interface DotPropImmutable {
  get<I, T = any>(source: I, path: number | string | (string | number)[], defaultValue?: any): T;
  set<I, T = any>(source: I, path: number | string | (string | number)[], value: any): T;
  delete<I, T = any>(source: I, path: number | string | (string | number)[]): Partial<T>;
  toggle<I, T = any>(source: I, path: number | string | (string | number)[]): T;
  merge<I, T = any>(source: I, path: number | string | (string | number)[], value: any): T;
}

declare const dotPropImmutable: DotPropImmutable;

export = dotPropImmutable;
