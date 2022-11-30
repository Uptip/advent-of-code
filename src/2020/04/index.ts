import { pipe } from 'ramda';
import { SolutionFunction } from '../../types';

type Passport = {
  byr?: string;
  iyr?: string;
  eyr?: string;
  hgt?: string;
  hcl?: string;
  ecl?: string;
  pid?: string;
  cid?: string;
};

type PassportValidityInput = {
  passport: Passport;
  shallValidateFields?: boolean;
};

export const formatPassport = (input: string): Passport =>
  input
    .replace(/\s/gi, '\n')
    .split('\n')
    .filter(Boolean)
    .map(passportChunk => passportChunk.split(':'))
    .reduce(
      (acc, curr) => ({
        ...acc,
        [curr[0]]: curr[1],
      }),
      {},
    );

export const parseInput = (input: string): Passport[] =>
  input.split('\n\n').map(formatPassport);

export const isValidYear =
  ({ min, max }): Function =>
  (value: string) => {
    const regex = /^\d{4}$/;
    if (!regex.test(value)) {
      return false;
    }
    return Number(value) >= min && Number(value) <= max;
  };

export const isValidHeight = (value: string): boolean => {
  if (value.includes('in')) {
    const parsedValue = Number(value.replace('in', ''));
    return parsedValue >= 59 && parsedValue <= 76;
  }
  if (value.includes('cm')) {
    const parsedValue = Number(value.replace('cm', ''));
    return parsedValue >= 150 && parsedValue <= 193;
  }
  return false;
};

export const isValidHexColor = (value: string): boolean =>
  /^#[0-9a-f]{6}$/.test(value);

export const isValidEyeColor = (value: string): boolean =>
  ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);

export const isValidPassportId = (value: string): boolean =>
  /^\d{9}$/.test(value);

export const requiredFields = ['iyr', 'hcl', 'byr', 'eyr', 'hgt', 'ecl', 'pid'];

export const fieldsValidations = {
  byr: isValidYear({ min: 1920, max: 2002 }),
  iyr: isValidYear({ min: 2010, max: 2020 }),
  eyr: isValidYear({ min: 2020, max: 2030 }),
  hgt: isValidHeight,
  hcl: isValidHexColor,
  ecl: isValidEyeColor,
  pid: isValidPassportId,
};

export const isFieldValid = ({ field, value }) =>
  fieldsValidations[field](value);

export const isPassportValid = ({
  passport,
  shallValidateFields,
}: PassportValidityInput) => {
  for (const requiredField of requiredFields) {
    if (!passport[requiredField]) {
      return false;
    }
    if (!shallValidateFields) {
      continue;
    }
    if (
      !isFieldValid({ field: requiredField, value: passport[requiredField] })
    ) {
      return false;
    }
  }
  return true;
};

export const partOne: SolutionFunction = pipe(
  parseInput,
  input =>
    input.filter((passport: Passport) => isPassportValid({ passport })).length,
);

export const partTwo: SolutionFunction = pipe(
  parseInput,
  input =>
    input.filter((passport: Passport) =>
      isPassportValid({ passport, shallValidateFields: true }),
    ).length,
);
