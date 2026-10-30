import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IThemeManager } from '@jupyterlab/apputils';

/**
 * Initialization data for the @stellarshenson/galaxalabs-jupyterlab-steel-light-theme extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: '@stellarshenson/galaxalabs-jupyterlab-steel-light-theme:plugin',
  description:
    'Light gray-blue theme in the Win95 light-gray convention, the light counterpart of Galaxa Dark Theme - Steel (Sublime Mariana lineage), designed to reduce eye strain',
  autoStart: true,
  requires: [IThemeManager],
  activate: (app: JupyterFrontEnd, manager: IThemeManager) => {
    console.log(
      'JupyterLab extension @stellarshenson/galaxalabs-jupyterlab-steel-light-theme is activated!'
    );
    const style =
      '@stellarshenson/galaxalabs-jupyterlab-steel-light-theme/index.css';

    manager.register({
      name: 'Galaxa Light Theme - Steel',
      themeScrollbars: true,
      isLight: true,
      load: () => manager.loadCSS(style),
      unload: () => Promise.resolve(undefined)
    });
  }
};

export default plugin;
