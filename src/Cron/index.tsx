import { FieldTimeOutlined, InsertRowAboveOutlined } from '@ant-design/icons'
import { Button, Card, Input, InputProps, Popover, Tabs, Tooltip } from 'antd'
import React, { CSSProperties, ReactNode, useEffect, useState } from 'react'
import './index.css'
import TimeSelect from './TimeSelect'
import DayCron from './DayCron'

type CronProps = {
  value?: string
  children?: ReactNode
  inputProps?: InputProps
  height?: string | number
  closeClearEditData?: boolean
  style?: CSSProperties
  className?: string
  onChange?: (value: string) => void
}

const Cron: React.FC<CronProps> = ({
  value,
  children,
  inputProps,
  height,
  closeClearEditData,
  style,
  className,
  onChange
}) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Popover
      content={
        <CronContent
          value={value || '* * * * * ? *'}
          height={height}
          onChange={(value) => onChange && onChange(value)}
          open={open}
          setOpen={setOpen}
          closeClearEditData={closeClearEditData}
        />
      }
      trigger="click"
      open={open}
      onOpenChange={setOpen}
    >
      {children || (
        <Input
          value={value}
          suffix={<FieldTimeOutlined />}
          readOnly
          className={className}
          style={style}
          {...inputProps}
        />
      )}
    </Popover>
  )
}

const getTab = (title: string) => {
  return (
    <>
      <InsertRowAboveOutlined />
      {title}
    </>
  )
}

// 正则
const secondReg =
  /^\*$|(^([0-9]|[1-5][0-9])-([0-9]|[1-5][0-9])$)|(^([0-9]|[1-5][0-9])\/\d+$)|(^(([0-9]|[1-5][0-9]),)*([0-9]|[1-5][0-9])$)/
const minuteReg =
  /^\*$|(^([0-9]|[1-5][0-9])-([0-9]|[1-5][0-9])$)|(^([0-9]|[1-5][0-9])\/\d+$)|(^(([0-9]|[1-5][0-9]),)*([0-9]|[1-5][0-9])$)/
const hourReg =
  /(^\*$)|(^([0-9]|(1[0-9])|(2[0-3]))-([0-9]|(1[0-9])|(2[0-3]))$)|(^([0-9]|(1[0-9])|(2[0-3]))\/\d+$)|(^(([0-9]|(1[0-9])|(2[0-3])),)*([0-9]|(1[0-9])|(2[0-3]))$)/
const dayReg =
  /^\*$|^\?$|(^([1-9]|[1-2][0-9]|3[0-1])-([1-9]|[1-2][0-9]|3[0-1])$)|(^([1-9]|[1-2][0-9]|3[0-1])\/\d+$)|(^(([1-9]|[1-2][0-9]|3[0-1]),)*([1-9]|[1-2][0-9]|3[0-1])$)/
const monthReg =
  /^\*$|(^([1-9]|1[0-2])-([1-9]|1[0-2])$)|(^([1-9]|1[0-2])\/\d+$)|(^(([1-9]|1[0-2]),)*([1-9]|1[0-2])$)/
const weekReg =
  /^\*$|^\?$|(^(SUN|MON|TUE|WED|THU|FRI|SAT)-(SUN|MON|TUE|WED|THU|FRI|SAT)$)|(^(SUN|MON|TUE|WED|THU|FRI|SAT)#\d+$)|(^(SUN|MON|TUE|WED|THU|FRI|SAT)L$)|(^((SUN|MON|TUE|WED|THU|FRI|SAT),)*(SUN|MON|TUE|WED|THU|FRI|SAT)$)/
const yearReg =
  /^\*$|^\?$|(^(2019|20[2-5][0-9]|206[0-6])-(2019|20[2-5][0-9]|206[0-6])$)|(^(2019|20[2-5][0-9]|206[0-6])\/\d+$)|(^((2019|20[2-5][0-9]|206[0-6]),)*(2019|20[2-5][0-9]|206[0-6])$)/

const CronContent: React.FC<{
  value: string
  height?: string | number
  open: boolean
  setOpen: (open: boolean) => void
  onChange: (value: string) => void
  closeClearEditData?: boolean
}> = ({ value, height, setOpen, onChange, closeClearEditData, open }) => {
  const [active, setActive] = useState<string>('second')
  const [cronText, setCronText] = useState<string>('')
  const [second, setSecond] = useState('*')
  const [minute, setMinute] = useState('*')
  const [hour, setHour] = useState('*')
  const [day, setDay] = useState('*')
  const [month, setMonth] = useState('*')
  const [week, setWeek] = useState('*')
  const [year, setYear] = useState('*')
  // 监听打开
  useEffect(() => {
    if (open && closeClearEditData) initData()
    // eslint-disable-next-line
  }, [open])
  useEffect(() => {
    initData()
    // eslint-disable-next-line
  }, [value])

  const initData = () => {
    // 初始化数据
    setCronText(value)
    const [second, minute, hour, day, month, week, year] = value!.split(' ')
    setSecond(secondReg.test(second) ? second : '*')
    setMinute(minuteReg.test(minute) ? minute : '*')
    setHour(hourReg.test(hour) ? hour : '*')
    setDay(dayReg.test(day) ? day : '*')
    setMonth(monthReg.test(month) ? month : '*')
    setWeek(weekReg.test(week) ? week : '?')
    setYear(yearReg.test(year) ? year : '*')
  }

  // 监听回调数据变化
  useEffect(() => {
    setCronText(`${second} ${minute} ${hour} ${day} ${month} ${week} ${year}`)
  }, [second, minute, hour, day, month, week, year])

  return (
    <div>
      <Card
        bodyStyle={{
          padding: 0,
          height
        }}
        rootClassName="react-cron-bh-card"
        bordered={true}
      >
        <Tabs
          className="react-cron-bh-tabs"
          activeKey={active}
          type="card"
          onChange={setActive}
          items={[
            {
              key: 'second',
              label: getTab('秒'),
              children: <TimeSelect value={second} onChange={setSecond} type="second" />,
              className: 'react-cron-bh-tab'
            },
            {
              key: 'minute',
              label: getTab('分'),
              children: <TimeSelect value={minute} onChange={setMinute} type="minute" />,
              className: 'react-cron-bh-tab'
            },
            {
              key: 'hour',
              label: getTab('时'),
              children: <TimeSelect value={hour} onChange={setHour} type="hour" />,
              className: 'react-cron-bh-tab'
            },
            {
              key: 'day',
              label: getTab('日&周'),
              children: <DayCron day={day} week={week} setDay={setDay} setWeek={setWeek} />,
              className: 'react-cron-bh-tab'
            },
            {
              key: 'month',
              label: getTab('月'),
              children: <TimeSelect value={month} onChange={setMonth} type="month" />,
              className: 'react-cron-bh-tab'
            },
            {
              key: 'year',
              label: getTab('年'),
              children: <TimeSelect value={year} onChange={setYear} type="year" />,
              className: 'react-cron-bh-tab'
            }
          ]}
        />
      </Card>
      <div className="react-cron-bh-bottom">
        <Tooltip title={cronText}>
          <span>{cronText}</span>
        </Tooltip>
        <div>
          <Button style={{ marginRight: 8 }} onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button
            type="primary"
            onClick={() => {
              onChange(cronText)
              setOpen(false)
            }}
          >
            确认
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Cron
