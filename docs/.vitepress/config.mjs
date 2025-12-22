import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [["link", { rel: "icon", href: "/日记.png" }]],
  title: "Zhi's Notes",
  description: "A VitePress Site",
  themeConfig: {
       // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
    outline: [1, 6],
    outlineTitle: '文章目录',
    logo: '/日记.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '课程', link: '/courses/softwareSecurtyHomework' }
    ],

    sidebar: {
      '/courses/': [
        {
          text: '软件安全',
          items: [
            { text: 'C/C++代码分析工具', link: '/courses/softwareScurty/[239-12] CC++代码分析工具' },
            { text: 'AFL', link: '/courses/softwareScurty/[239-15] AFL' },
            { text: 'Metasploit进行漏洞测试', link: '/courses/softwareScurty/[239-16] Metasploit进行漏洞测试' },
            { text: 'Crackme登录注册功能破解', link: '/courses/softwareScurty/304-25 Crackme登录注册功能破解' },
            { text: '熊猫烧香', link: '/courses/softwareScurty/熊猫烧香' }
          ]
        }
      ],
      '/': [
        {
          text: '示例',
          items: [
            { text: 'Markdown Examples', link: '/markdown-examples' },
            { text: 'Runtime API Examples', link: '/api-examples' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026-present Li Zhi'
    }
  }
})
