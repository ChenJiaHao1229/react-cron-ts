<div align="center">
    <h1>ReactCronTS</h1>
    <h4>基于React+Antd的Cron编辑器插件</h4>
    <img width=500 src="./picture.png" alt="效果图" />
</div>

#

### 安装

```bash
npm install react-cron-antd
# 或
yarn add react-cron-antd
```

### 使用

```jsx
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

```jsx
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
