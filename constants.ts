import { MemberName } from './types';

export const MEMBERS: MemberName[] = [
  'Quan', 'Thịnh', 'Tín', 'Vi', 
  'Huy', 'Thủy', 'Dân', 'Mai', 
  'Thảo', 'Tuấn', 'Thiện', 'An', 'Tiên'
];

export const INITIAL_PREDICTIONS = MEMBERS.reduce((acc, predictor) => {
  acc[predictor] = MEMBERS.reduce((inner, subject) => {
    inner[subject] = '';
    return inner;
  }, {} as Record<string, number | ''>);
  return acc;
}, {} as Record<string, Record<string, number | ''>>);

export const INITIAL_ACTUALS = MEMBERS.reduce((acc, member) => {
  acc[member] = '';
  return acc;
}, {} as Record<string, number | ''>);
