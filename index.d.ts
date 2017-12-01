interface DotPropImmutable {
  get<I, T>(source: I, path: number | string | (string | number)[], defaultValue?: any): T;
  set<I, T>(source: I, path: number | string | (string | number)[], value: any): T;
  delete<I, T>(source: I, path: number | string | (string | number)[]): T;
  toggle<I, T>(source: I, path: number | string | (string | number)[]): T;
  merge<I, T>(source: I, path: number | string | (string | number)[], value: any): T;
}

declare const dotPropImmutable: DotPropImmutable;

export = dotPropImmutable;
