/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  //'component','directive','filter'
  ASSET_TYPES.forEach(type => {
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        //没有春如function 则取出来之前定义的全局 'component','directive','filter'
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }
        //isPlainObject是否是原始对象
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id
          //_base其实就是Vue的构造函数
          //extend 把普通的对象转换成Vue component 构造函数  所以这里definition就是一个构造函数
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        //如果definition直接就是构造函数就不需要走上面的if语句转换成构造函数
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
