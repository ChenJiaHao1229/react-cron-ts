import { InputNumber, Radio, RadioChangeEvent, Select } from 'antd'
import React, { useEffect, useState } from 'react'

const weekList = [
  { label: '星期天', value: 1, name: 'SUN' },
  { label: '星期一', value: 2, name: 'MON' },
  { label: '星期二', value: 3, name: 'TUE' },
  { label: '星期三', value: 4, name: 'WED' },
  { label: '星期四', value: 5, name: 'THU' },
  { label: '星期五', value: 6, name: 'FRI' },
  { label: '星期六', value: 7, name: 'SAT' }
]

const DayCron: React.FC<{
  day: string
  week: string
  setDay: (day: string) => void
  setWeek: (week: string) => void
}> = ({ day, week, setDay, setWeek }) => {
  const [selectRadio, setSelectRadio] = useState<number>(0) // 单选值
  const [lastDay, setLastDay] = useState<number>(1) // 当前月倒数第   3
  const [workDay, setWorkDay] = useState<number>(1) // 当前月工作日   4
  const [circleStart, setCircleStart] = useState<number>(1) // 循环开始时间   5
  const [circleTime, setCircleTime] = useState<number>(1) // 循环时间大小     5
  const [cycleStart, setCycleStart] = useState<number>(1) // 周期开始时间   6
  const [cycleEnd, setCycleEnd] = useState<number>(1) // 周期结束时间       6
  const [startWeek, setStartWeek] = useState<number>(weekList[0].value) // 开始的星期   7
  const [spaceDay, setSpaceDay] = useState<number>(1) // 开始的星期相隔天数              7
  const [selectDayList, setSelectDayList] = useState<number[]>([1]) // 具体的哪天    8
  const [selectWeekList, setSelectWeekList] = useState<string[]>([weekList[0].name]) // 具体的哪星期    9
  const [lastWeek, setLastWeek] = useState<number>(weekList[0].value) // 最后一个星期几   10
  const [conunt, setConunt] = useState<number>(1) // 这个月第几周         11
  const [conWeek, setConWeek] = useState<number>(weekList[0].value) // 这个月第几周星期几   11

  useEffect(() => {
    // 回显数据
    if (week === '?') {
      if (day === '*') {
        setSelectRadio(0)
      } else if (day.indexOf('L') !== -1) {
        if (day === 'L') {
          setSelectRadio(1)
        } else if (day === 'LW') {
          setSelectRadio(2)
        } else {
          // 均不是 则只会是L-?了 直接取后一节
          setSelectRadio(3)
          setLastDay(parseInt(day.slice(2)))
        }
      } else if (day.indexOf('W') !== -1) {
        // 只会是 ?W的情况了 所有可以直接截取
        setSelectRadio(4)
        setWorkDay(parseInt(day.slice(0, -1)))
      } else if (day.indexOf('/') !== -1) {
        setSelectRadio(5)
        const [start, end] = day.split('/')
        setCircleStart(parseInt(start))
        setCircleTime(parseInt(end))
      } else if (day.indexOf('-') !== -1) {
        setSelectRadio(6)
        const [start, end] = day.split('-')
        setCycleStart(parseInt(start))
        setCycleEnd(parseInt(end))
      } else {
        setSelectRadio(8)
        setSelectDayList(day.split(',').map((item) => parseInt(item)))
      }
    } else {
      if (week.indexOf('/') !== -1) {
        setSelectRadio(7)
        const [start, end] = week.split('/')
        setStartWeek(parseInt(start))
        setSpaceDay(parseInt(end))
      } else if (week.indexOf('L') !== -1) {
        // 只会是 ?L的情况了 所有可以直接截取
        setSelectRadio(10)
        setLastWeek(parseInt(week.slice(0, -1)))
      } else if (week.indexOf('#') !== -1) {
        setSelectRadio(11)
        const [start, end] = week.split('#')
        setConWeek(parseInt(start))
        setConunt(parseInt(end))
      } else {
        setSelectRadio(9)
        setSelectWeekList(week.split(',').map((item) => item))
      }
    }
  }, [day, week])

  // 单选修改
  const handleRadio = (e: RadioChangeEvent) => {
    setSelectRadio(e.target.value)
    switch (e.target.value) {
      case 0:
        handlerCron('*', 'day')
        break
      case 1:
        handlerCron('L', 'day')
        break
      case 2:
        handlerCron('LW', 'day')
        break
      case 3:
        handlerCron(`L-${lastDay}`, 'day')
        break
      case 4:
        handlerCron(`${workDay}W`, 'day')
        break
      case 5:
        handlerCron(`${circleStart}/${circleTime}`, 'day')
        break
      case 6:
        handlerCron(`${cycleStart}-${cycleEnd}`, 'day')
        break
      case 7:
        handlerCron(`${startWeek}/${spaceDay}`, 'week')
        break
      case 8:
        handlerCron(selectDayList.length > 0 ? selectDayList.sort().join(',') : '1', 'day')
        break
      case 9:
        handlerCron(selectWeekList.length > 0 ? selectWeekList.sort().join(',') : 'SUN', 'week')
        break
      case 10:
        handlerCron(`${lastWeek}L`, 'week')
        break
      default:
        handlerCron(`${conWeek}#${conunt}`, 'week')
        break
    }
  }
  // 修改Cron
  const handlerCron = (value: string, type: 'day' | 'week' = 'day') => {
    if (type === 'day') {
      setDay(value)
      setWeek('?')
    } else {
      setWeek(value)
      setDay('?')
    }
  }

  return (
    <Radio.Group onChange={handleRadio} value={selectRadio} className="react-cron-bh-radio-group">
      <div>
        <Radio value={0} />
        <span className="react-cron-bh-radio-content">每一天</span>
      </div>
      <div>
        <Radio value={1} />
        <span className="react-cron-bh-radio-content">这个月最后一天</span>
      </div>
      <div>
        <Radio value={2} />
        <span className="react-cron-bh-radio-content">这个月最后一个工作日</span>
      </div>
      <div>
        <Radio value={3} />
        <span className="react-cron-bh-radio-content">
          当前月倒数第&nbsp;
          <InputNumber
            className="react-cron-bh-radio-number"
            min={1}
            max={31}
            value={lastDay}
            onChange={(value) => {
              if (selectRadio === 3) handlerCron(`L-${value}`, 'day')
              else setLastDay(value || 1)
            }}
          />
          &nbsp; 天
        </span>
      </div>
      <div>
        <Radio value={4} />
        <span className="react-cron-bh-radio-content">
          当前月最近的工作日到本月的第&nbsp;
          <InputNumber
            className="react-cron-bh-radio-number"
            min={1}
            max={31}
            value={workDay}
            onChange={(value) => {
              if (selectRadio === 4) handlerCron(`${value}W`, 'day')
              else setWorkDay(value || 1)
            }}
          />
          &nbsp; 天
        </span>
      </div>
      <div>
        <Radio value={5} />
        <span className="react-cron-bh-radio-content">
          从第&nbsp;
          <InputNumber
            className="react-cron-bh-radio-number"
            min={1}
            max={31}
            value={circleStart}
            onChange={(value) => {
              if (selectRadio === 5) handlerCron(`${value}/${circleTime}`, 'day')
              else setCircleStart(value || 0)
            }}
          />
          &nbsp;天开始，每隔&nbsp;
          <InputNumber
            className="react-cron-bh-radio-number"
            min={1}
            max={31}
            value={circleTime}
            onChange={(value) => {
              if (selectRadio === 5) handlerCron(`${circleStart}/${value}`, 'day')
              else setCircleTime(value || 1)
            }}
          />
          &nbsp; 天执行一次
        </span>
      </div>
      <div>
        <Radio value={6} />
        <span className="react-cron-bh-radio-content">
          从第&nbsp;
          <InputNumber
            className="react-cron-bh-radio-number"
            min={1}
            max={cycleEnd}
            value={cycleStart}
            onChange={(value) => {
              if (selectRadio === 6) handlerCron(`${value}-${cycleEnd}`, 'day')
              else setCycleStart(value || 0)
            }}
          />
          &nbsp; 天，到第&nbsp;
          <InputNumber
            className="react-cron-bh-radio-number"
            min={cycleStart}
            max={31}
            value={cycleEnd}
            onChange={(value) => {
              if (selectRadio === 6) handlerCron(`${cycleStart}-${value}`, 'day')
              else setCycleEnd(value || circleStart)
            }}
          />
          &nbsp; 天，每天执行一次
        </span>
      </div>
      <div>
        <Radio value={7} />
        <span className="react-cron-bh-radio-content">
          从&nbsp;
          <Select
            placeholder="请选择"
            className="react-cron-bh-radio-content-select"
            value={startWeek}
            options={weekList}
            onChange={(value) => {
              if (selectRadio === 7) handlerCron(`${value}/${spaceDay}`, 'week')
              else setStartWeek(value)
            }}
          />
          &nbsp;开始，每隔&nbsp;
          <InputNumber
            className="react-cron-bh-radio-number"
            min={1}
            max={7}
            value={spaceDay}
            onChange={(value) => {
              if (selectRadio === 7) handlerCron(`${startWeek}/${value}`, 'week')
              else setSpaceDay(value || 1)
            }}
          />
          &nbsp; 天执行一次
        </span>
      </div>
      <div>
        <Radio value={8} />
        <span className="react-cron-bh-radio-content">
          <span>具体哪天</span>&nbsp;
          <Select
            placeholder="请选择"
            mode="multiple"
            className="react-cron-bh-radio-content-select"
            value={selectDayList}
            options={Array(31)
              .fill(0)
              .map((item, index) => ({ label: index + 1, value: index + 1 }))}
            onChange={(values) => {
              if (selectRadio === 8)
                handlerCron(values.length > 0 ? values.sort().join(',') : '1', 'day')
              else setSelectDayList(values)
            }}
          />
        </span>
      </div>
      <div>
        <Radio value={9} />
        <span className="react-cron-bh-radio-content">
          <span>具体星期</span>&nbsp;
          <Select
            placeholder="请选择"
            mode="multiple"
            className="react-cron-bh-radio-content-select"
            value={selectWeekList}
            options={weekList}
            fieldNames={{ value: 'name' }}
            onChange={(values) => {
              if (selectRadio === 9)
                handlerCron(values.length > 0 ? values.sort().join(',') : 'SUN', 'week')
              else setSelectWeekList(values)
            }}
          />
        </span>
      </div>
      <div>
        <Radio value={10} />
        <span className="react-cron-bh-radio-content">
          <span>这个月最后一个</span>&nbsp;
          <Select
            placeholder="请选择"
            className="react-cron-bh-radio-content-select"
            value={lastWeek}
            options={weekList}
            onChange={(value) => {
              if (selectRadio === 10) handlerCron(`${value}L`, 'week')
              else setLastWeek(value)
            }}
          />
        </span>
      </div>
      <div>
        <Radio value={11} />
        <span className="react-cron-bh-radio-content">
          当前月第&nbsp;
          <InputNumber
            className="react-cron-bh-radio-number"
            min={1}
            max={5}
            value={conunt}
            onChange={(value) => {
              if (selectRadio === 11) handlerCron(`${conWeek}#${value}`, 'week')
              else setConunt(value || 1)
            }}
          />
          &nbsp;个&nbsp;
          <Select
            placeholder="请选择"
            className="react-cron-bh-radio-content-select"
            value={conWeek}
            options={weekList}
            onChange={(value) => {
              if (selectRadio === 11) handlerCron(`${value}#${conunt}`, 'week')
              else setConWeek(value)
            }}
          />
        </span>
      </div>
    </Radio.Group>
  )
}

export default DayCron
