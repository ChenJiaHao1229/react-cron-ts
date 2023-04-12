import { useState, useEffect } from 'react'
import cn from './cn'
import en from './en'

export default function useLanguage(lang: 'cn' | 'en') {
  const [language, setLanguage] = useState<typeof cn>(cn)
  useEffect(() => setLanguage({ cn, en }[lang]), [lang])
  return language
}
