/**
 * @author chenwentao
 * @date 2019-12-07 16:20
 */
// ref: https://umijs.org/config/
import proxy from './proxy'

const {REACT_APP_ENV} = process.env;
console.log(REACT_APP_ENV)
const config = {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {

        antd: true,
        dynamicImport: {
          loadingComponent: '../src/layouts/page/components/Spin',
          webpackChunkName: true,
          level: 3,
        },
        title: 'xprocess',
        dll: {
          exclude: [],
        },
        locale: {
          enable: true,
          default: 'en-US',
          baseNavigator: true,
        },
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],

  ],
  // history: 'browser',
  theme: {
    'primary-color': '#84441e',
  },
  urlLoaderExcludes: [/.svg$/],

  // cssLoaderOptions: {
  //   localIdentName: '[local]',
  // },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
  },
};

export default config;
