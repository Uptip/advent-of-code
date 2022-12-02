require('dotenv').config();
import rp from 'request-promise';
import path from 'path';
import { promises as fs } from 'fs';

const options = (year: number) => ({
  uri: 'https://app.scrapingbee.com/api/v1',
  qs: {
    api_key: process.env.SCRAPINGBEE_API_KEY,
    url: `https://adventofcode.com/${year}/leaderboard/self`,
    cookies: `session=${process.env.AOC_SESSION}`,
    forward_headers: 'true',
    block_resources: 'false',
    extract_rules: '{"data":"pre"}',
  },
});

const parseInput = (input: string) =>
  (
    `${JSON.parse(input).data} `
      .replace(
        /^-+?Part 1-+? -+?Part 2-+? Day Time Rank Score Time Rank Score /,
        '',
      )

      .match(/(.*?\s){7}/g) || []
  )
    .map(day => day.trim())
    .map(day => {
      const [date, partOneTime, _, __, partTwoTime] = day.split(' ');
      return {
        date: Number(date),
        partOneTime,
        partTwoTime: partTwoTime === '-' ? undefined : partTwoTime,
      };
    });

const run = async () => {
  const data2015 = await rp(options(2015));
  const data2016 = await rp(options(2016));
  const data2017 = await rp(options(2017));
  const data2018 = await rp(options(2018));
  const data2019 = await rp(options(2019));
  const data2020 = await rp(options(2020));
  const data2021 = await rp(options(2021));
  const data2022 = await rp(options(2022));

  await fs.writeFile(
    path.join(__dirname, '../data/stats.json'),
    JSON.stringify(
      {
        2015: parseInput(data2015),
        2016: parseInput(data2016),
        2017: parseInput(data2017),
        2018: parseInput(data2018),
        2019: parseInput(data2019),
        2020: parseInput(data2020),
        2021: parseInput(data2021),
        2022: parseInput(data2022),
      },
      null,
      2,
    ),
  );
};

run();
