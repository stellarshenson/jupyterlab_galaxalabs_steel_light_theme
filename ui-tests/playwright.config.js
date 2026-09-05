/**
 * Configuration for Playwright using default from @jupyterlab/galata
 */
const baseConfig = require('@jupyterlab/galata/lib/playwright-config');

const PORT = process.env.JUPYTER_TEST_PORT || '8888';
const BASE_URL = `http://localhost:${PORT}`;

module.exports = {
  ...baseConfig,
  // serverFiles 'on' keeps galata's per-test directories instead of deleting them at
  // teardown. The delete fails on this workstation (send2trash cannot reach /.Trash-1000
  // across devices) and succeeds on a GitHub runner, so leaving it at the default made the
  // file-browser rows in both snapshots depend on the host. Keeping them is deterministic
  // everywhere.
  use: { ...baseConfig.use, baseURL: BASE_URL, serverFiles: 'on' },
  expect: {
    ...baseConfig.expect,
    toMatchSnapshot: { maxDiffPixelRatio: 0.02 }
  },
  webServer: {
    command: 'jlpm start',
    url: `${BASE_URL}/lab`,
    timeout: 120 * 1000,
    reuseExistingServer: false
  }
};
