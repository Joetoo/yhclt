# Vue 开发规范

- [基于模块开发](#基于模块开发)
- [数据驱动视图思想](#数据驱动视图思想)
- [组件命名](#组件命名)
- [组件props原子化](#组件props原子化)
- [验证组件的props](#验证组件的props)
- [给v-for设置键值key](#给v-for设置键值key)
- [在v-if/v-else-if/v-else中使用key](#在v-if/v-else-if/v-else中使用key)
- [避免v-if和v-for用在同一个标签](#避免v-if和v-for用在同一个标签)
- [scoped中的元素选择器](#scoped中的元素选择器)
- [避免使用this.$parent](#避免使用this.$parent)
- [谨慎使用this.$refs](#谨慎使用this.$refs)
- [提供组件的API文档](#提供组件的API文档)
- [清晰的目录结构](#清晰的目录结构)
- [其它规范](#其它规范)

### 基于模块开发

始终基于模块的方式来构建你的 app，每一个子模块只做一件事情。

Vue.js 的设计初衷就是帮助开发者更好的开发界面模块。一个模块是应用程序中独立的一个部分。

**怎么做？**

每一个组件（等同于模块）首先必须专注于解决一个单一的问题，`独立的`、`可复用的`、`微小的` 和 `可测试的`。

如果你的组件做了太多的事或是变得臃肿，请将其拆分成更小的组件并保持单一的原则。一般来说，尽量保证每一个文件的代码行数不要超过 100 行。

### 数据驱动视图思想

Vue的核心思想 ———— 数据据驱动视图。所谓的数据驱动，是指视图是由数据驱动生成的，我们只用关心数据的修改，会让代码的逻辑变得非常清晰，因为DOM变成了数据的映射，我们所有的逻辑都是对数据的修改，而不用触碰DOM这样的代码非常利于维护。

**怎么做？**

```html
<!-- good -->
<nav>
  <ul>
    <li
      v-for="(v,i) in navData"
      @click="changeNav(v.id)"
      :key="v.id"
      :class="{ 'active': v.isActive }"
    >
      {{ v.text }}
    </li>
  </ul>
</nav>
<script type="text/javascript">
  export default {
    data() {
      return {
        navData: [
          {
            id: 1,
            text: 'A',
            isActive: true,
            link: '',
          },
          {
            id: 2,
            text: 'B',
            isActive: false,
            link: '',
          },
        ],
      }
    },
  }
</script>
```

**反例：**

```html
<!-- bad -->
<nav>
  <ul>
    <li @click="changeNav(1)" :class="{ 'active' : active === 1 }">A</li>
    <li @click="changeNav(2)" :class="{ 'active' : active === 2 }">B</li>
  </ul>
</nav>
<script type="text/javascript">
  export default {
      data () {
          return {
              active: 1
          }
      }
      methods: {
          changeNav(id){
              this.active = id;
          }
      }
  }
</script>
```

### 组件命名

组件的命名需遵从以下原则：

- **有意义的**: 不过于具体，也不过于抽象
- **简短**: 2 到 3 个单词
- **具有可读性**: 以便于沟通交流

同时还需要注意：

- 必须符合**自定义元素规范**: 使用连字符分隔单词，切勿使用保留字。
- **`app-` 前缀作为命名空间**: 如果非常通用的话可使用一个单词来命名，这样可以方便于其它项目里复用。

**为什么？**

- 组件是通过组件名来调用的。所以组件名必须简短、富有含义并且具有可读性。

**如何做？**

```html
<!-- 推荐 -->
<app-header></app-header>
<user-list></user-list>
<range-slider></range-slider>

<!-- 避免 -->
<btn-group></btn-group>
<!-- 虽然简短但是可读性差. 使用 `button-group` 替代 -->
<ui-slider></ui-slider>
<!-- ui 前缀太过于宽泛，在这里意义不明确 -->
<slider></slider>
<!-- 与自定义元素规范不兼容 -->
```

### 组件props原子化

虽然 Vue 支持传递复杂的 JavaScript 对象通过 props 属性，但是你应该尽可能的使用原始类型的数据。尽量只使用 JavaScript 原始类型（字符串、数字、布尔值）和函数。尽量避免复杂的对象。

**为什么？**

- 使得组件 API 清晰直观。
- 只使用原始类型和函数作为 props 使得组件的 API 更接近于 HTML(5) 原生元素。
- 其它开发者更好的理解每一个 prop 的含义、作用。
- 传递过于复杂的对象使得我们不能够清楚的知道哪些属性或方法被自定义组件使用，这使得代码难以重构和维护。

**怎么做？**

组件的每一个属性单独使用一个 props，并且使用函数或是原始类型的值。

```html
<!-- bad -->
<range-slider :config="complexConfigObject"></range-slider>
<!-- good -->
<range-slider
  :values="[10, 20]"
  min="0"
  max="100"
  step="5"
  :on-slide="updateInputs"
  :on-end="updateResults"
>
</range-slider>
```

### 验证组件的props

在 Vue 中，组件的 props 即 API，一个稳定并可预测的 API 会使得你的组件更容易被其他开发者使用。

组件 props 通过自定义标签的属性来传递。属性的值可以是 Vue 字符串(`:attr="value"` 或 `v-bind:attr="value"`)或是不传。你需要保证组件的 props 能应对不同的情况。

**为什么？**

验证组件 props 可以保证你的组件永远是可用的（防御性编程）。即使其他开发者并未按照你预想的方法使用时也不会出错。

**怎么做？**

- 提供默认值。
- 使用 `type` 属性[校验类型](https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E7%B1%BB%E5%9E%8B)。
- 使用 props 之前先检查该 prop 是否存在[Prop验证](https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E9%AA%8C%E8%AF%81)。

```html
<template>
  <input type="range" :max="max" :min="min" msg="提示" />
</template>
<script type="text/javascript">
  export default {
    props: {
      max: {
        type: Number, // 这里添加了数字类型的校验
        default() {
          return 10
        },
      },
      min: {
        type: Number,
        default() {
          return 0
        },
      },
      msg: {
        type: String,
        required: true, // 这里要求参数是必传
      },
    },
  }
</script>
```

### 给v-for设置键值key

vue中的v-for循环需加 :key="唯一标识" 唯一标识可以是item里面id,index等（必须是不重复的唯一值），因为vue组件高度复用增加Key可以标识组件的唯一性，为了更好地区别各个组件key的作用主要是为了高效的更新虚拟DOM。

**怎么做？**

```html
<li v-for="(value, index) in navData" :key="index">{{ v.text }}</li>
```

### 在v-if/v-else-if/v-else中使用key

如果一组 v-if + v-else 的元素类型相同，最好使用 key (比如两个 div 元素)。

默认情况下，Vue 会尽可能高效的更新 DOM。这意味着其在相同类型的元素之间切换时，会修补已存在的元素，而不是将旧的元素移除然后在同一位置添加一个新元素。如果本不相同的元素被识别为相同，则会出现意料之外的结果。[参考](https://cn.vuejs.org/v2/style-guide/#%E6%B2%A1%E6%9C%89%E5%9C%A8-v-if-v-else-if-v-else-%E4%B8%AD%E4%BD%BF%E7%94%A8-key-%E8%B0%A8%E6%85%8E%E4%BD%BF%E7%94%A8)

```html
<!-- bad -->
<div v-if="error">错误：{{ error }}</div>
<div v-else>{{ results }}</div>

<!-- good -->
<div v-if="error" key="search-status">错误：{{ error }}</div>
<div v-else key="search-results">{{ results }}</div>
```

### 避免v-if和v-for用在同一个标签

原因：v-for比v-if优先，如果每一次都需要遍历整个数组，将会影响速度，尤其是当之需要渲染很小一部分的时候。可以将v-if移动父级元素。

```html
<!-- bad -->
<ul>
  <li v-for="(value, index) in navData" :key="index" v-if="isShowNav">
    {{ v.text }}
  </li>
</ul>
<!-- good -->
<ul v-if="isShowNav">
  <li v-for="(value, index) in navData" :key="index">{{ v.text }}</li>
</ul>
```

### scoped中的元素选择器

元素选择器应该避免在 scoped 中出现。
在 scoped 样式中，类选择器比元素选择器更好，因为大量使用元素选择器是很慢的。

```html
<!-- bad -->
<template>
  <section></section>
</template>
<style scoped>
  section {
    background-color: red;
  }
</style>

<!-- good -->
<template>
  <section class="content"></section>
</template>
<style scoped>
  .content {
    background-color: red;
  }
</style>
```

### 避免使用this.$parent

Vue 支持组件嵌套，并且子组件可访问父组件的上下文。访问组件之外的上下文违反了[基于模块开发](#基于模块开发)的第一原则。因此你应该尽量避免使用 **`this.$parent`**。

**为什么？**

- 组件必须相互保持独立，Vue 组件也是。如果组件需要访问其父层的上下文就违反了该原则。
- 如果一个组件需要访问其父组件的上下文，那么该组件将不能在其它上下文中复用。

**怎么做？**

- 通过 props 将值传递给子组件。
- 通过 props 传递回调函数给子组件来达到调用父组件方法的目的。
- 通过在子组件触发事件来通知父组件。

[↑ 回到目录](#目录)

### 谨慎使用this.$refs

Vue 支持通过 `ref` 属性来访问其它组件和 HTML 元素。并通过 `this.$refs` 可以得到组件或 HTML 元素的上下文。在大多数情况下，通过 `this.$refs`来访问其它组件的上下文是可以避免的。在使用的的时候你需要注意避免调用了不恰当的组件 API，所以应该尽量避免使用 `this.$refs`。

### 为什么？

- 组件必须是保持独立的，如果一个组件的 API 不能够提供所需的功能，那么这个组件在设计、实现上是有问题的。
- 组件的属性和事件必须足够的给大多数的组件使用。

### 怎么做？

- 提供良好的组件 API。
- 总是关注于组件本身的目的。
- 拒绝定制代码。如果你在一个通用的组件内部编写特定需求的代码，那么代表这个组件的 API 不够通用，或者你可能需要一个新的组件来应对该需求。
- 检查所有的 props 是否有缺失的。
- 检查所有的事件。子组件向父组件通信一般是通过事件来实现的，但是大多数的开发者更多的关注于 props 从忽视了这点。
- **Props向下传递，事件向上传递！**。以此为目标升级你的组件，提供良好的 API 和 独立性。
- 当遇到 props 和 events 难以实现的功能时，通过 `this.$refs`来实现。
- 当需要操作 DOM 无法通过指令来做的时候可使用 `this.$ref` 而不是 `JQuery`、`document.getElement*`、`document.queryElement`。

### 提供组件的API文档

使用 Vue 组件的过程中会创建 Vue 组件实例，这个实例是通过自定义属性配置的。为了便于其他开发者使用该组件，对于这些自定义属性即组件API应该在 `ReadeMe.md` 文件中进行说明。

**为什么？**

- 良好的文档可以让开发者比较容易的对组件有一个整体的认识，而不用去阅读组件的源码，也更方便开发者使用。
- 组件配置属性即组件的 API，对于组件的用户来说他们更感兴趣的是 API 而不是实现原理。
- 正式的文档会告诉开发者组件 API 变更以及向后的兼容性情况。
- `ReadeMe.md` 是标准的我们应该首先阅读的文档文件。

**怎么做？**

在组件目录中添加 `ReadeMe.md` 文件：

```
Dialog.vue/
├── Dialog.vue
└── ReadeMe.md
```

在 ReadeMe 文件中说明模块的功能以及使用场景。对于 vue 组件来说，比较有用的描述是组件的自定义属性即 API 的描述介绍。

#### 例：

| param          | type     | default | description              |
| -------------- | -------- | ------- | ------------------------ |
| `width`        | String   | '280px' | dialog的宽度.            |
| `top`          | String   | '18%'   | dialog离浏览器顶部的举例 |
| `title`        | String   | '提示'  | dialog的标题             |
| `custom-class` | String   | -       | 自定义dialog的css样式类  |
| `on-cancel `   | Function | -       | 取消/关闭dialog的事件    |

### 清晰的目录结构

保持清晰的目录结构，更易于代码阅读和维护。

```
src/
├── request   // 接口请求项目
│   ├── http.js
└── assets
│   ├── css
└── ├── ├── reset.styl
└── ├── ├── global.styl
│   ├── font
│   ├── images
└── config   // 全局配置相关
│   ├── index.js
└── components // 公共组件目录
└── ├── Dialog
└── ├── ├── Dialog.vue
└── ├── ├── ReadeMe.md // 组件API文档
└── directives // 指令
└── filters // 公共过滤器
└── mixins // 混入 (不建议使用)
└── router
│   ├── index.js //路由入口
│   ├── module1.js //模块1路由配置
│   ├── module2.js
└── store // vuex 存储相关
│   ├── index.js
│   ├── state.js
│   ├── getters.js
│   ├── mutation.js
│   ├── action.js
└── pages // 页面组件目录
│   ├── User
│   ├── ├── User.vue
│   ├── ├── images
└── utils // 公共方法、类相关
│   ├── utils.js
└── App.vue
└── main.js
```

### 清晰的注释

- 页面组件

所有的组件页面都需要在顶部写注释，注明开发人员姓名，以及页面功能解释等其它信息

```html
<!--
 * @Author: 张三
 * @Description: 用户管理 > 用户注册页面
-->
```

- 公共组件

公共型组件需要写明开发人员姓名、组件名以及组件props参数、events事件方法和调用示例等其它信息

```html
<!--
 * @Author: 李四
 * @Description: 弹窗dialog组件
 * @Param {string} width 定义dialog的宽度
 * @Param {string} title 定义dialog的标题
 * @Events {function} on-close 关闭dialog的事件
 * @Return {object} 返回事件对象
 * @Example 调用示例
  <dialog title="添加管理员" :width="500" @on-close="isClose"></dialog>
-->
```

### 其它规范

api 目录的接口 js 文件必须加注释
store 中的 state, mutation, action 等必须加注释
vue 文件中的 template 必须加注释，若文件较大添加 start end 注释
vue 文件的 methods，每个 method 必须添加注释
vue 文件的 data, 非常见单词要加注释
