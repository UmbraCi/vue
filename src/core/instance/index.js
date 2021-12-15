import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
//注册vm的 _init()方法，初始化  vm
initMixin(Vue)
//注册$data $props $watch $set $delete
stateMixin(Vue)
//注册 $on $once $off $emit
eventsMixin(Vue)
//注册 _update $forceUpdate $destroy
lifecycleMixin(Vue)
//注册 $nextTick    _render
renderMixin(Vue)

export default Vue
