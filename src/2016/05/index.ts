import md5 from 'md5';

export const example = `cxdnnyjw`;

export const partOne = (input: string) => {
  let i = 0;
  let password = '';
  while (password.length < 8) {
    const hash = md5(`${input}${i}`);
    if (hash.startsWith('00000')) {
      password += hash[5];
    }
    i++;
  }

  return password;
};

export const partTwo = (input: string) => {
  let password = Array(8).fill(undefined);
  let i = 0;
  while (password.some(x => !x)) {
    const hash = md5(`${input}${i}`);
    if (hash.startsWith('00000')) {
      const [position, value] = hash.slice(5);
      if (Number(position) < 8 && !password[position]) {
        password[position] = value;
        console.log(password);
      }
    }
    i++;
  }

  return password.join('');
};
