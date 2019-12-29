import { IConfig } from 'umi-types';
import { resolve } from 'path';

const isElectron = !!process.env['NODE_ELECTRON'];

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'factorio-calculate-ui',
        dll: true,

        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
        locale: {
          default: 'zh-CN',
          baseNavigator: true,
          antd: true
        }
      },
    ],
  ],
  alias: {
    'event-emitter': isElectron
      ? resolve(__dirname, '../src/event/electron.ts')
      : resolve(__dirname, '../src/event/event.ts'),
  },
};

export default config;
