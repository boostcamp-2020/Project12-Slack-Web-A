import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import checkUserToken from '@api/user'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const Auth = (Component: any, option: boolean) => () => {
  const history = useHistory()
  const token = localStorage.getItem('token')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const check = async () => {
      const [name, accessToken] = window.location.search.split('=')
      if (accessToken && name === '?access_token') {
        localStorage.setItem('token', accessToken)
        window.location.href = '/'
      }

      try {
        if (token) {
          const { success } = await checkUserToken()
          if (success && option) {
            history.push('/login')
          }
          if (success && !option) {
            history.push(window.location.pathname)
          }
        }

        if (!token && !option) {
          toast.warn('로그인 해주세요.')
          history.push('/login')
        }
        setLoading(false)
      } catch (err) {
        toast.error('잘못된 접근입니다.', {
          onClose: () => history.push('/login'),
        })
      }
    }
    check()
  }, [])

  return loading ? <Container>Loading...</Container> : <Component />
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export default Auth
