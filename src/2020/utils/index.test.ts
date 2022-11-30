'use strict';
import { loadFile } from '.';
import path from 'path';

jest.mock('fs');

const mockedContent = `1721
979
366
299
675
1456
`;

describe('listFilesInDirectorySync', () => {
  const MOCK_FILE_INFO = {
    [path.join(__dirname, '..', '/path/to/file')]: mockedContent,
  };

  beforeEach(() => {
    require('fs').__setMockFiles(MOCK_FILE_INFO);
  });

  test('reads file content', async () => {
    const fileContent = await loadFile('/path/to/file');
    expect(fileContent).toBe(mockedContent);
  });
});
