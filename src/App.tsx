import Cron from './Cron/index'
import { Button, Form } from 'antd'

function App() {
  const [form] = Form.useForm()
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
        <Form.Item name="cron" label="Cron" initialValue="* * * * * ? *">
          <Cron />
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
