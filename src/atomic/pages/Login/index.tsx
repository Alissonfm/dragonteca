import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import classnames from 'classnames'
import { Formik, Form, Field, FieldProps } from 'formik'
import * as yup from 'yup'
import Button from '@mui/material/Button'

import { useUserStore, useStoreDispatch } from 'helpers/hooks'
import { userActions } from 'store/userStore'

import Input from 'atomic/atoms/Input'
import Page from 'atomic/templates/Page'

import LoginBg from 'assets/images/bg3.jpg'
import draconicBorder from 'assets/images/draconicBorder2.png'
import styles from './styles.module.css'
import { UserT } from 'models'

const Login: React.FunctionComponent<any> = () => {
  const dispatcher = useStoreDispatch()
  const navigator = useNavigate()
  const { authenticated } = useUserStore()

  const doLogin = (loginData: UserT) => {
    dispatcher(userActions.persistedLogin(loginData))
  }

  useEffect(() => {
    if (authenticated) {
      navigator("/home")
    }
  }, [authenticated, navigator])

  const initialValues: UserT = { name: '', mail: '' }
  const boxClasses = classnames(['glass', styles.loginBox])
  const buttonSX = { display: 'block', margin: '0 auto' }

  const schema = yup.object({
    name: yup.string().min(3, 'mínimo 3 caracteres').required('Campo obrigatório'),
    mail: yup.string().email('Digite um e-mail válido').required('Campo obrigatório')
  })

  const errorExtractor = (error: string | Array<string> | any) => typeof error !== 'string' ? error[0] : error 
  const mountField = ({ form, field }: FieldProps) => <Input {...field} errorMessage={errorExtractor(form.errors[field.name] ?? '')} />

  return (
    <Page background={LoginBg} title="Dragonteca login" hideTitle hideHeader>
      <div style={{ borderImage: `url(${draconicBorder})` }} className={boxClasses}>
        <h2>Boas vindas à Dragonteca</h2>
        <h4>Para conhecer os dragões é preciso se identificar, digite seu nome e e-mail nos campos abaixo.</h4>
        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={doLogin} validateOnChange={false} validateOnBlur={false}>
          <Form className={styles.form}>
            <Field type="text" name="name" component={mountField} />
            <Field type="mail" name="mail" component={mountField} />
            <Button sx={buttonSX} type="submit" variant='contained' size='large'>Entrar</Button>
          </Form>
        </Formik>
      </div>
    </Page>
  )
}

export default Login