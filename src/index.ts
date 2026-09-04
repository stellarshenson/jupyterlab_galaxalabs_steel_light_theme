import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IThemeManager } from '@jupyterlab/apputils';

/**
 * Initialization data for the galaxalabs_jupyterlab_steel_light_theme extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'galaxalabs_jupyterlab_steel_light_theme:plugin',
  description:
    'Light gray-blue theme in the Win95 light-gray convention, the light counterpart of the GalaxaLabs Steel Dark Theme (Sublime Mariana lineage), designed to reduce eye strain',
  autoStart: true,
  requires: [IThemeManager],
  activate: (app: JupyterFrontEnd, manager: IThemeManager) => {
    console.log(
      'JupyterLab extension galaxalabs_jupyterlab_steel_light_theme is activated!'
    );
    const style = 'galaxalabs_jupyterlab_steel_light_theme/index.css';

    manager.register({
      name: 'GalaxaLabs Steel Light Theme',
      themeScrollbars: true,
      isLight: true,
      load: () => manager.loadCSS(style),
      unload: () => Promise.resolve(undefined)
    });
  }
};

export default plugin;
