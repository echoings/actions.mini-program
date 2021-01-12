# actions.mini-program

将[miniprogram-ci](https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html)集成进Github Action，不做特殊封装，参数透传。维持和官方功能一致。只简化操作流程，通过Github Action实现自动化。可配合[actions.notify](https://github.com/echoings/actions.notify)将返回的预览二维码或结果通知给 **飞书，Slack，Telegram** 等IM。

A [GitHub Action](https://github.com/features/actions) to integration Mini Program [dev, pub, preview...] with github action, make collaborative development easier, use with [actions.notify](https://github.com/echoings/actions.notify) to notify result to IM is recommended.

## Usage

You can use this action after any other action. Here is an example setup of this action:

1. Create a `.github/workflows/actions.yml` file in your GitHub repo.
2. Add the following code to the `actions.yml` file.

```yml
on: push
name: actions.mini-program
jobs:
  start:
    name: Start
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: actions.mini-program
      uses: actions.mini-program@main
      with:
        project_type: miniProgram
        action_type: preview
        project_path: ./dist
        version: 1.0.0
        command_options:
          --enable-es6
          --project-ignores=['node_modules/**/*']
      env:
        MINI_APP_ID: ${{ secrets.MINI_APP_ID }}
        MINI_APP_PRIVATE_KEY: ${{ secrets.MINI_APP_PRIVATE_KEY }}

```

3. get your mini program appid and [download private key](https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html), then set them as github secrect and env values
```yaml
  MINI_APP_ID: ${{ secrets.MINI_APP_ID }}
  MINI_APP_PRIVATE_KEY: ${{ secrets.MINI_APP_PRIVATE_KEY }}
```
