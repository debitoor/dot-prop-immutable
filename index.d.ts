type Path = number | string | (string | number)[];

interface DotPropImmutable {
  get<I, T = any>(source: I, path: Path, defaultValue?: any): T;
  set<I, T = any>(source: I, path: Path, value: any): T;
  delete<I, T = any>(source: I, path: Path): Partial<T>;
  toggle<I, T = any>(source: I, path: Path): T;
  merge<I, T = any>(source: I, path: Path, value: any): T;
  getMany<I, T = any>(): T;
  setMany<I, T = any>(source, paths: Path[]): T;
  deleteMany<I, T = any>(): T;
  toggleMany<I, T = any>(): T;
}

declare const dotPropImmutable: DotPropImmutable;

export = dotPropImmutable;