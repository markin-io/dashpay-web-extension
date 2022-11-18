const invert = (p: Promise<unknown>): Promise<Response> =>
  new Promise((res, rej) => p.then(rej, res));

export const firstOf = (ps: Promise<Response>[]): Promise<Response> =>
  invert(Promise.all(ps.map(invert)));
