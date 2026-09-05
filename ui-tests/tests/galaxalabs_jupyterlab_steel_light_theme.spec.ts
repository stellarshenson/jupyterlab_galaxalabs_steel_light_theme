import { expect, test } from '@jupyterlab/galata';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Don't load JupyterLab webpage before running the tests.
 * This is required to ensure we capture all log messages.
 */
test.use({ autoGoto: false });

const THEME_NAME = 'Steel Light Theme';

// The file browser lists galata's per-test directories with relative "Modified" times
// that differ between runs; two clean-venv runs an hour apart diverged past the 2 percent
// tolerance. Hiding only that column keeps the row fills, the alternating stripe and the
// selected-row highlight in frame and under test.
const VOLATILE_COLUMN_HIDDEN =
  '.jp-DirListing-itemModified { visibility: hidden; }';

const VARIABLES_CSS = path.join(
  __dirname,
  '..',
  '..',
  'style',
  'variables.css'
);

const NOTEBOOK = JSON.stringify({
  cells: [
    {
      cell_type: 'markdown',
      metadata: {},
      source: [
        '# Steel Light Theme\n',
        '\n',
        '- first item with `inline code`\n',
        '- second item\n',
        '- third item\n'
      ]
    },
    {
      cell_type: 'code',
      execution_count: 1,
      metadata: {},
      outputs: [
        {
          data: {
            'text/html': [
              '<div>\n',
              '<table border="1" class="dataframe">\n',
              '  <thead>\n',
              '    <tr style="text-align: right;">\n',
              '      <th></th>\n',
              '      <th>name</th>\n',
              '      <th>value</th>\n',
              '    </tr>\n',
              '  </thead>\n',
              '  <tbody>\n',
              '    <tr>\n',
              '      <th>0</th>\n',
              '      <td>alpha</td>\n',
              '      <td>1</td>\n',
              '    </tr>\n',
              '    <tr>\n',
              '      <th>1</th>\n',
              '      <td>beta</td>\n',
              '      <td>2</td>\n',
              '    </tr>\n',
              '    <tr>\n',
              '      <th>2</th>\n',
              '      <td>gamma</td>\n',
              '      <td>3</td>\n',
              '    </tr>\n',
              '  </tbody>\n',
              '</table>\n',
              '</div>'
            ],
            'text/plain': [
              '    name  value\n',
              '0  alpha      1\n',
              '1   beta      2\n',
              '2  gamma      3'
            ]
          },
          execution_count: 1,
          metadata: {},
          output_type: 'execute_result'
        }
      ],
      source: [
        'import pandas as pd\n',
        'df = pd.DataFrame({"name": ["alpha", "beta", "gamma"], "value": [1, 2, 3]})\n',
        'df'
      ]
    },
    {
      cell_type: 'code',
      execution_count: 2,
      metadata: {},
      outputs: [
        {
          ename: 'ValueError',
          evalue: 'steel is not a colour',
          output_type: 'error',
          traceback: [
            '\x1b[0;31m---------------------------------------------------------------------------\x1b[0m',
            '\x1b[0;31mValueError\x1b[0m                                Traceback (most recent call last)',
            'Cell \x1b[0;32mIn[2], line 1\x1b[0m\n\x1b[0;32m----> 1\x1b[0m \x1b[38;5;28;01mraise\x1b[39;00m \x1b[38;5;167;01mValueError\x1b[39;00m(\x1b[38;5;124m"\x1b[39m\x1b[38;5;124msteel is not a colour\x1b[39m\x1b[38;5;124m"\x1b[39m)\n',
            '\x1b[0;31mValueError\x1b[0m: steel is not a colour'
          ]
        }
      ],
      source: ['raise ValueError("steel is not a colour")']
    }
  ],
  metadata: {
    kernelspec: {
      display_name: 'Python 3 (ipykernel)',
      language: 'python',
      name: 'python3'
    },
    language_info: {
      name: 'python'
    }
  },
  nbformat: 4,
  nbformat_minor: 5
});

/**
 * Normalise a CSS colour to lowercase hex so rgb() and #rrggbb compare equal.
 */
function toHex(color: string): string {
  const value = color.trim().toLowerCase();
  const rgb = value.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgb) {
    return (
      '#' +
      rgb
        .slice(1, 4)
        .map(c => parseInt(c, 10).toString(16).padStart(2, '0'))
        .join('')
    );
  }
  if (/^#[0-9a-f]{3}$/.test(value)) {
    return (
      '#' + value[1] + value[1] + value[2] + value[2] + value[3] + value[3]
    );
  }
  return value;
}

function themeLayoutColor1(): string {
  const css = fs.readFileSync(VARIABLES_CSS, 'utf8');
  const match = css.match(/--jp-layout-color1:\s*([^;]+);/);
  if (!match) {
    throw new Error(`--jp-layout-color1 not found in ${VARIABLES_CSS}`);
  }
  return toHex(match[1]);
}

test('should emit an activation console message', async ({ page }) => {
  const logs: string[] = [];

  page.on('console', message => {
    logs.push(message.text());
  });

  await page.goto();

  expect(
    logs.filter(
      s =>
        s ===
        'JupyterLab extension galaxalabs_jupyterlab_steel_light_theme is activated!'
    )
  ).toHaveLength(1);
});

test('should apply the theme to the launcher', async ({ page }) => {
  await page.goto();
  await page.theme.setTheme(THEME_NAME);

  expect(await page.theme.getTheme()).toEqual(THEME_NAME);

  const layoutColor1 = await page.evaluate(() =>
    getComputedStyle(document.body).getPropertyValue('--jp-layout-color1')
  );
  expect(toHex(layoutColor1)).toEqual(themeLayoutColor1());

  await page.addStyleTag({ content: VOLATILE_COLUMN_HIDDEN });

  expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(
    'launcher.png'
  );
});

test('should render a notebook with the theme', async ({ page }) => {
  const fileName = 'fixture.ipynb';

  await page.goto();
  await page.contents.uploadContent(NOTEBOOK, 'text', fileName);
  await page.evaluate(async (path: string) => {
    await (window as any).jupyterapp.commands.execute('docmanager:open', {
      path,
      factory: 'Notebook'
    });
  }, fileName);
  await page.theme.setTheme(THEME_NAME);

  await expect(page.locator('.jp-Notebook')).toBeVisible();

  await page.addStyleTag({ content: VOLATILE_COLUMN_HIDDEN });

  expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(
    'notebook.png'
  );
});
