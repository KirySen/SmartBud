
export default {
  treeShaking: true,
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'SmartBud',
      dll: false,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  'proxy': {
    '/api': {
      'target': 'http://localhost:8080',
      'pathRewrite': { '^/api': '' },
      'changeOrigin': true
    }
  }
}
