import { InputNumber, Radio, RadioChangeEvent, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import useLanguage from '../Language'
const options = Array(60)
  .fill(0)
  .map((item, index) => ({ label: index, value: index }))
const thisYear = new Date().getFullYear()
const typeInfo = {
  second: {
    max: 59,
    min: 0,
    options: options
  },
  minute: {
    max: 59,
    min: 0,
    options: options
  },
  hour: {
    max: 23,
    min: 0,
    options: Array(24)
      .fill(0)
      .map((item, index) => ({ label: index, value: index }))
  },
  month: {
    max: 12,
    min: 1,
    options: Array(12)
      .fill(0)
      .map((item, index) => ({ label: index + 1, value: index + 1 }))
  },
  year: {
    max: thisYear + 100,
    min: thisYear,
    options: Array(100)
      .fill(0)
      .map((item, index) => ({ label: index + thisYear, value: index + thisYear }))
  }
}

const TimeSelect: React.FC<{
  value: string
  language: 'cn' | 'en'
  onChange: (value: string) => void
  type: 'second' | 'minute' | 'hour' | 'month' | 'year'
}> = ({ value, onChange, type, language }) => {
  const [selectRadio, setSelectRadio] = useState<0 | 1 | 2 | 3>(0) // 单选值
  const [circleStart, setCircleStart] = useState<number>(typeInfo[type].min) // 循环开始时间
  const [circleTime, setCircleTime] = useState<number>(1) // 循环时间大小
  const [cycleStart, setCycleStart] = useState<number>(typeInfo[type].min) // 周期开始时间
  const [cycleEnd, setCycleEnd] = useState<number>(typeInfo[type].min) // 周期结束时间
  const [selectTime, setSelectTime] = useState<number[]>([typeInfo[type].options[0].value])
  const Language = useLanguage(language)

  useEffect(() => {
    // 回显数据
    if (value === '*') {
      setSelectRadio(0)
    } else if (value.indexOf('/') > -1) {
      setSelectRadio(1)
      const [start, end] = value.split('/')
      setCircleStart(parseInt(start))
      setCircleTime(parseInt(end))
    } else if (value.indexOf('-') > -1) {
      setSelectRadio(2)
      const [start, end] = value.split('-')
      setCycleStart(parseInt(start))
      setCycleEnd(parseInt(end))
    } else {
      setSelectRadio(3)
      setSelectTime(value.split(',').map((item) => parseInt(item)))
    }
  }, [value])

  // 单选修改
  const handleRadio = (e: RadioChangeEvent) => {
    setSelectRadio(e.target.value)
    switch (e.target.value) {
      case 0:
        onChange('*')
        break
      case 1:
        onChange(`${circleStart}/${circleTime}`)
        break
      case 2:
        onChange(`${cycleStart}-${cycleEnd}`)
        break
      default:
        onChange(selectTime.length > 0 ? selectTime.sort().join(',') : `${typeInfo[type].min}`)
        break
    }
  }

  return (
    <Radio.Group onChange={handleRadio} value={selectRadio} className="react-cron-bh-radio-group">
      <div>
        <Radio value={0} />
        <span className="react-cron-bh-radio-content">{Language[type].every}</span>
      </div>
      <div>
        <Radio value={1} />
        <span className="react-cron-bh-radio-content">
          {Language[type].circle[0]}&nbsp;
          <InputNumber
            className="react-cron-bh-radio-number"
            min={typeInfo[type].min}
            max={typeInfo[type].max}
            value={circleStart}
            onChange={(value) => {
              if (selectRadio === 1) onChange(`${value}/${circleTime}`)
              else setCircleStart(value || typeInfo[type].min)
            }}
          />
          &nbsp; {Language[type].circle[1]}&nbsp;
          <InputNumber
            className="react-cron-bh-radio-number"
            min={1}
            max={typeInfo[type].max}
            value={circleTime}
            onChange={(value) => {
              if (selectRadio === 1) onChange(`${circleStart}/${value}`)
              else setCircleTime(value || 1)
            }}
          />
          &nbsp; {Language[type].circle[2]}
        </span>
      </div>
      <div>
        <Radio value={2} />
        <span className="react-cron-bh-radio-content">
          {Language[type].cycle[0]}&nbsp;
          <InputNumber
            className="react-cron-bh-radio-number"
            min={typeInfo[type].min}
            max={cycleEnd}
            value={cycleStart}
            onChange={(value) => {
              if (selectRadio === 2) onChange(`${value}-${cycleEnd}`)
              else setCycleStart(value || typeInfo[type].min)
            }}
          />
          &nbsp; {Language[type].cycle[1]}&nbsp;
          <InputNumber
            className="react-cron-bh-radio-number"
            min={cycleStart}
            max={typeInfo[type].max}
            value={cycleEnd}
            onChange={(value) => {
              if (selectRadio === 2) onChange(`${cycleStart}-${value}`)
              else setCycleEnd(value || circleStart)
            }}
          />
          &nbsp; {Language[type].cycle[2]}
        </span>
      </div>
      <div>
        <Radio value={3} />
        <span className="react-cron-bh-radio-content">
          <span>{Language[type].specific}</span>
          <Select
            placeholder={Language.placeholder}
            mode="multiple"
            className="react-cron-bh-radio-content-select"
            value={selectTime}
            options={typeInfo[type].options}
            onChange={(values) => {
              if (selectRadio === 3)
                onChange(values.length > 0 ? values.sort().join(',') : `${typeInfo[type].min}`)
              else setSelectTime(values)
            }}
          />
        </span>
      </div>
    </Radio.Group>
  )
}

export default TimeSelect
