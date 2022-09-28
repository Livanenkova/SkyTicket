import { useState } from 'react'

const useInputRequired = () => {
  const [value, setValue] = useState('')

  let errorMessage = ''

  const onChange = (initial) => {
    const userValue = initial
    if (userValue) {
      setValue(userValue)
    }
  }

  const onBlur = () => {
    if (value === '') {
      errorMessage = 'Ошибка - заполните поля'
    } else {
      errorMessage = 'Все отлично - вы великолепны'
    }
    return errorMessage
  }

  return {
    onChange,
    onBlur,
    errorMessage,
  }
}

export default useInputRequired
