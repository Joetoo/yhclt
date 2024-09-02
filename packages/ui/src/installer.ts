/*
 * @Description: 组件安装器
 */

import type { App } from 'vue'
import { Badge } from './Badge'
import { Dialog } from './Dialog'
import { Empty } from './Empty'
import { TextEllipsis } from './TextEllipsis'
import { Checkbox } from './checkbox'

// import { Breadcrumb, BreadcrumbItem } from './breadcrumb'
// import { Button } from './button'
// import { ImageView } from './image-view'
// import { InputNumber } from './input-number'
// import { Message, showLoadingMessage, showMessage } from './message'
// import { Sku } from './sku'
// import { Step, StepItem } from './step'
// import { Tab, TabPanel } from './tab'
// import { Carousel, CarouselItem } from './carousel'
// import { Checkbox } from './checkbox'
// import { Confirm, showConfirm } from './confirm'

const components = [
  // ImageView,
  Badge,
  // Breadcrumb,
  // BreadcrumbItem,
  // Button,
  Dialog,
  // Carousel,
  // CarouselItem,
  Checkbox,
  // Confirm,
  Empty,
  TextEllipsis,
  // InputNumber,
  // Step,
  // StepItem,
  // Tab,
  // TabPanel,
  // Sku,
  // Message
]

export function installer(app: App) {
  components.forEach(component => app.component(component.name as string, component))

  // app.config.globalProperties.$confirm = showConfirm
  // app.config.globalProperties.$message = showMessage
  // app.config.globalProperties.$loading = showLoadingMessage
}

// declare module 'vue' {
//   export interface globalProperties {
//     // $confirm: typeof showConfirm
//     // $message: typeof showMessage
//     // $loading: typeof showLoadingMessage
//   }
// }
