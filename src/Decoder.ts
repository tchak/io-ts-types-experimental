import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import type { Option } from 'fp-ts/Option';
import type { These } from 'fp-ts/These';
import * as D from 'io-ts/Decoder';

import * as G from './Guard';

const sum = D.sum('_tag');
const leftLiteral = D.literal('Left');
const rightLiteral = D.literal('Right');
const bothLiteral = D.literal('Both');
const noneLiteral = D.literal('None');
const someLiteral = D.literal('Some');

export function option<A>(
  value: D.Decoder<unknown, A>
): D.Decoder<unknown, Option<A>> {
  return sum({
    None: D.struct({
      _tag: noneLiteral,
    }),
    Some: D.struct({
      _tag: someLiteral,
      value,
    }),
  });
}

export function either<E, A>(
  left: D.Decoder<unknown, E>,
  right: D.Decoder<unknown, A>
): D.Decoder<unknown, E.Either<E, A>> {
  return sum({
    Left: D.struct({
      _tag: leftLiteral,
      left,
    }),
    Right: D.struct({
      _tag: rightLiteral,
      right,
    }),
  });
}

export function these<E, A>(
  left: D.Decoder<unknown, E>,
  right: D.Decoder<unknown, A>
): D.Decoder<unknown, These<E, A>> {
  return sum({
    Left: D.struct({
      _tag: leftLiteral,
      left,
    }),
    Right: D.struct({
      _tag: rightLiteral,
      right,
    }),
    Both: D.struct({
      _tag: bothLiteral,
      left,
      right,
    }),
  });
}

export function of<A>(value: A): D.Decoder<unknown, A> {
  return { decode: () => E.right(value) };
}

export function withFallback<A>(
  decoder: D.Decoder<unknown, A>,
  a: A
): D.Decoder<unknown, A> {
  return D.alt(() => of(a))(decoder);
}

export const BooleanFromString: D.Decoder<unknown, boolean> = pipe(
  D.literal('true', 'false'),
  D.map((s) => s === 'true')
);

export type NonEmptyString = G.NonEmptyString;
export const NonEmptyString: D.Decoder<unknown, G.NonEmptyString> = D.fromGuard(
  G.NonEmptyString,
  'NonEmptyString'
);

export type UUID = G.UUID;
export const UUID: D.Decoder<unknown, UUID> = D.fromGuard(G.UUID, 'UUID');

export type Email = G.Email;
export const Email: D.Decoder<unknown, Email> = D.fromGuard(G.Email, 'Email');

const _Date = D.fromGuard(G.Date, 'Date');

export { _Date as Date };

export const DateFromNumber: D.Decoder<unknown, Date> = pipe(
  D.number,
  D.parse((n) => {
    const d = new Date(n);
    return isNaN(d.getTime())
      ? D.failure(n, `cannot parse ${n} to a Date`)
      : D.success(d);
  })
);

export const DateFromString: D.Decoder<unknown, Date> = pipe(
  D.string,
  D.parse((s) => {
    const d = new Date(s);
    return isNaN(d.getTime())
      ? D.failure(s, `cannot parse ${JSON.stringify(s)} to a Date`)
      : D.success(d);
  })
);

export type Int = G.Int;
export const Int: D.Decoder<unknown, Int> = D.fromGuard(G.Int, 'Int');

export const NumberFromString: D.Decoder<unknown, number> = pipe(
  D.string,
  D.parse((s) => {
    const n = parseFloat(s);
    return isNaN(n)
      ? D.failure(s, `cannot parse ${JSON.stringify(s)} to a number`)
      : D.success(n);
  })
);

export const IntFromString: D.Decoder<unknown, Int> = pipe(
  NumberFromString,
  D.refine(G.Int.is, 'Int')
);
