import { InputProps } from 'antd'
type CronProps = {
  /**
   * Cron表达式
   */
  value?: string
  /**
   * 插槽 可以用于替换Input输入框
   */
  children?: React.ReactNode
  /**
   * antd Input框参数
   * 在无children时生效
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
  style?: React.CSSProperties
  /**
   * 输入类名
   */
  className?: string
  /**
   * 组件语言 'cn'|'en'
   * 默认为cn
   */
  language?: 'cn' | 'en'
  /**
   * 是否需要年
   * 默认 false
   */
  noYear?: boolean
  /**
   * 切换语言回调
   * 传递了方法才会显示切换语言的单选框
   */
  handleLanguage?: (language: 'cn' | 'en') => void
  /**
   * 确认回调 返回Cron表达式
   */
  onChange?: (value: string) => void
}

declare const Cron: React.FC<CronProps>
export { CronProps }
export default Cron
