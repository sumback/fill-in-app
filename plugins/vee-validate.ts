import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';

Object.keys(rules).forEach((rule) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line import/namespace
  extend(rule, rules[rule]);
});
