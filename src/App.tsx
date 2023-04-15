import Cron from './Cron/index'
import { Button, Form } from 'antd'
import { useState } from 'react'

function App() {
  const [form] = Form.useForm()
  const [language, setLanguage] = useState<'en' | 'cn'>('en')
  return (
    <div
      style={{
        width: 600,
        margin: '0 auto',
        marginTop: 200,
        border: '1px solid #e6e6e6',
        borderRadius: 10,
        padding: 24
      }}
    >
      <Form form={form}>
        <Form.Item name="cron" label="CronLanguage" initialValue="* * * * * ? *">
          <Cron language={language} handleLanguage={setLanguage} />
        </Form.Item>
        <Form.Item name="cron-noYear" label="Cron-noYear" initialValue="* * * * * ? *">
          <Cron noYear />
        </Form.Item>
      </Form>
      <Button onClick={() => form.resetFields()} style={{}}>
        重置
      </Button>
      <Button onClick={() => console.log(form.getFieldsValue())}>提交</Button>
    </div>
  )
}

export default App
