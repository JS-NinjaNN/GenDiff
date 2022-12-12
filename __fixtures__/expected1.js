export const expected1 = () => {
  const string =
    //'{\n    host: hexlet.io\n  - timeout: 50\n  + timeout: 20\n  - proxy: 123.234.53.22\n  - follow: false\n}';
    [
      '{',
      '    host: hexlet.io',
      '  - timeout: 50',
      '  + timeout: 20',
      '  - proxy: 123.234.53.22',
      '  - follow: false',
      '}',
    ];
  return string;
};
