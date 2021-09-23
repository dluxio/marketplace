const _Rixits =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+=';

export const toBase64 = (number: number) => {
  if (
    number !== number ||
    number === null ||
    number === Number.POSITIVE_INFINITY
  )
    throw 'The input is not valid';
  if (number < 0) throw "Can't represent negative numbers now";
  var rixit;
  var residual = Math.floor(number);
  var result = '';
  while (true) {
    rixit = residual % 64;
    result = _Rixits.charAt(rixit) + result;
    residual = Math.floor(residual / 64);
    if (residual == 0) break;
  }
  return result;
};
