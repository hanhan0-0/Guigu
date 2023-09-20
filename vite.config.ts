import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// command是用于获取开发的环境
export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        localEnabled: command === 'serve', //保证开发阶段可以使用mock接口
      }),
      AutoImport({
        // 这里除了引入 vue 以外还可以引入pinia、vue-router、vueuse等，
        // 甚至你还可以使用自定义的配置规则，见 https://github.com/antfu/unplugin-auto-import#configuration
        imports: ['vue', 'vue-router'],
        // 第三方组件库的解析器
        resolvers: [ElementPlusResolver()],
        dts: './src/auto-imports.d.ts',
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),
      Components({
        // dirs 指定组件所在位置，默认为 src/components
        // 可以让我们使用自己定义组件的时候免去 import 的麻烦
        dirs: ['src/components/', 'src/layout'],
        // 配置需要将哪些后缀类型的文件进行自动按需引入
        extensions: ['vue', 'md'],
        // 解析的 UI 组件库，这里以 Element Plus 和 Ant Design Vue 为例
        resolvers: [ElementPlusResolver(), AntDesignVueResolver()],
        dts: './src/components.d.ts',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'), //相对路径别名配置，使用@代替src
      },
    },
    //scss全局变量配置项
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
  }
})
