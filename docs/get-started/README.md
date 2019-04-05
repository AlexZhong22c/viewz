# 快速上手

本章节待完善

## 安装 viewz

```bash
npm i --save viewz
```

或

```bash
yarn add --save viewz
```

## Hello World

```javascript
import { zButton } from 'viewz'
import Vue from 'vue'

new Vue({
  el: '#app',
  components: {
    zButton
  }
})
```