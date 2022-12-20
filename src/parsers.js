import { readFileSync } from 'fs';
import { cwd } from 'process';
import path from 'path';
import YAML from 'js-yaml';

const parseJson = (filepath) => JSON.parse(readFileSync(path.resolve(cwd(), filepath), 'utf-8'));

const parseYaml = (filepath) => YAML.load(readFileSync(path.resolve(cwd(), filepath), 'utf-8'));

export default (filepath) => {
  switch (path.extname(filepath)) {
    case '.json':
      return parseJson(filepath);
    case '.yaml':
      return parseYaml(filepath);
    case '.yml':
      return parseYaml(filepath);
    default:
      throw new Error('The file name must be entered with the extension!');
  }
};
