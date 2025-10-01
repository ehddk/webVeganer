// 객체인지 확인하는 유틸리티 타입
type IsObject<T> = T extends object ? (T extends string ? false : true) : false;

// 객체가 아닐 때 키로 사용할 문자열 유니온 타입 추출
type ExtractStringKeys<T> = T extends object ? keyof T : T;

type PageProps<
  P extends string | object = string,
  S extends string | object = string,
> = {
  params: Promise<
    IsObject<P> extends true
      ? P
      : {
          [K in ExtractStringKeys<P>]: string;
        }
  >;
  searchParams: Promise<
    IsObject<S> extends true
      ? S
      : {
          [K in ExtractStringKeys<S>]?: string | string[];
        }
  >;
};
