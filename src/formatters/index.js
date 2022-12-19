/* eslint-disable import/extensions */
import stylish from './stylish.js';
import plain from './plain.js';

export default (diff, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    default:
      throw new Error(`The ${formatName} format is not supported.\nSupported formats: stylish, plain`);
  }
};
