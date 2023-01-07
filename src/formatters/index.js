import formatStylish from './stylish.js';
import formatPlain from './plain.js';

export default (diff, formatName) => {
  switch (formatName) {
    case 'stylish':
      return formatStylish(diff);
    case 'plain':
      return formatPlain(diff);
    case 'json':
      return JSON.stringify(diff);
    default:
      throw new Error(`The ${formatName} format is not supported.\nSupported output formats: stylish, plain and json.`);
  }
};
