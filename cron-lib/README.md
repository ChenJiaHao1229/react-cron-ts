# react-cron-ts

基于 React+Antd 的 Cron 编辑器插件
[在线 Demo]()

### 依赖

- React
- Antd

### 安装

```bash
npm install react-cron-ts
```

### 使用

```tsx
import React from 'react'
import Cron from 'react-cron-ts'

const Page = () => {
  return (
    <Cron
      value="* * * * * ? *"
      onChange={(value) => {
        console.log(value)
      }}
    />
  )
}

export default Page
```

### 扩展

在 antd 的表单中使用

```tsx
import React from 'react'
import { Form, Button } from 'antd'
import Cron from 'react-cron-antd'

const FormCron = () => {
  const [form] = Form.useForm()
  return (
    <>
      <Form form={form}>
        <Form.Item name="cron" label="Cron" initialValue="* * * * * ? *">
          <Cron />
        </Form.Item>
      </Form>
      <Button onClick={() => console.log(form.getFieldsValue())}>提交</Button>
    </>
  )
}

export default FormCron
```

## 参数

```tsx
  /**
   * Cron表达式
   */
  value?: string
  /**
   * 插槽 可以用于替换Input输入框
   */
  children?: ReactNode
  /**
   * antd Input框参数 在无children时生效
   */
  inputProps?: InputProps
  /**
   * Cron编辑器内容显示高度
   */
  height?: string | number
  /**
   * 再次打卡是否保留前次编辑数据
   */
  closeClearEditData?: boolean
  /**
   * 输入框样式
   */
  style?: CSSProperties
  /**
   * 输入类名
   */
  className?: string
```

## 事件

```tsx
  className?: string
  /**
   * 确认回调 返回Cron表达式
   */
  onChange?: (value: string) => void
```
