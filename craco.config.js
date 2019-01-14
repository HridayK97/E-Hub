const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  plugins: [{ 
    plugin: CracoAntDesignPlugin,
    options: {
      customizeTheme: {
        "@primary-color": "#FF0000",
        "@link-color": "#FF0000"
      }
    }
  }]
};