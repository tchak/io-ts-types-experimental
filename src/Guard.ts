import { pipe } from 'fp-ts/function';
import * as G from 'io-ts/Guard';

interface NonEmptyStringBrand {
  readonly NonEmptyString: unique symbol;
}

export type NonEmptyString = string & NonEmptyStringBrand;

export const NonEmptyString: G.Guard<unknown, NonEmptyString> = pipe(
  G.string,
  G.refine((s): s is NonEmptyString => s.length > 0)
);

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

interface UUIDBrand {
  readonly UUID: unique symbol;
}

export type UUID = string & UUIDBrand;

export const UUID: G.Guard<unknown, UUID> = pipe(
  G.string,
  G.refine((s): s is UUID => uuidRegex.test(s))
);

const emailRegex =
  // eslint-disable-next-line no-useless-escape, no-control-regex
  /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

export interface EmailBrand {
  readonly EmailBrand: unique symbol;
}

export type Email = string & EmailBrand;

export const Email: G.Guard<unknown, Email> = pipe(
  G.string,
  G.refine((s): s is Email => emailRegex.test(s))
);

const _Date: G.Guard<unknown, Date> = {
  is: (u): u is Date => u instanceof Date,
};

export { _Date as Date };

interface IntBrand {
  readonly Int: unique symbol;
}

export type Int = number & IntBrand;

export const Int: G.Guard<unknown, Int> = pipe(
  G.number,
  G.refine((n): n is Int => Number.isInteger(n))
);

const _RegExp: G.Guard<unknown, RegExp> = {
  is: (u): u is RegExp =>
    Object.prototype.toString.call(u) === '[object RegExp]',
};

export { _RegExp as RegExp };
