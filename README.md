> 之前在使用 Hexo 的时候尝试了不少主题，但都不是特别满意，因此就自己写了这款主题，希望能够喜欢。

![screenshot](source/images/A-Quark.png)

## 介绍

这款主题是一款非常简洁的主题，前还在开发中。可配置项在 config 文件中都有，每项也有注释说明，使用起来非常简单友好。主题整合了 Valine 与 Disqus 评论系统，方便使用。

## 安装

```bash
git clone https://github.com/Pcrab/hexo-theme-quark quark
```

同时记得将**主目录**下的 `_config.yml` 文件中的 theme 修改为 quark

```yaml
theme: quark
```

要注意修改主题的 `_config.yml` 中的 `author` 部分的内容，同时记得如果有备案号也要填写。如果要使用 Valine ，需要注册 leancloud 的账号，这里推荐使用 [国际版](https://leancloud.app/) ，域名无需备案。如果使用的是 Disqus，可以考虑配置反代，不过需要自己的服务器并且有一定的动手能力。

主题定制了标签，关于，搜索，友链这四个页面，如果需要使用的话，需要首先创建这四个页面

```bash
hexo new page tags
```

并修改成对应的 layout

```yaml
layout: tags
```

其他几个页面也需要通过相同的步骤创建。

如果创建了搜索页面，则同时需要安装 [hexo-generator-search](https://github.com/wzpan/hexo-generator-search) 这款插件。

```bash
yarn add hexo-generator-search
```

然后修改博客根目录下的 `_config.yml`

```yaml
search:
  path: search.xml
```

如果打开了 rss 功能，那么还需要安装 [hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed) 插件来生成。

```bash
yarn add hexo-generator-feed
```

同样也需要修改根目录下的 `_config.yml`

```yaml
feed:
    type: atom
    path: atom.xml
    limit: 20
    hub:
    content: true
    content_limit: 140
    content_limit_delim: ' '
    order_by: -date
```

其他请按情况修改配置。

## 亮点

`_config.yml` 文件中有着丰富的可配置项，方便个性化配置，包括

1. `icon` 与 `favicon`: 切换主页图标
2. `dark`: 夜间模式开关
3. `author`: 作者介绍 (即 about 页面)
4. `friendlinks`: 友链，支持图片说明
5. `comment`: 评论系统支持，目前有 Valine 与 Disqus
6. `copyright`: 版权支持，只有 cc
7. `startYear` 以及 `showTheme`: 部分页脚内容自定义
8. `beian`: 页脚添加备案号
