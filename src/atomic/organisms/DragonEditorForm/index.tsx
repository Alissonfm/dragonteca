import React from 'react'
import _map from 'lodash/map'
import { v4 } from 'uuid'
import { Formik, Form, Field, FieldProps } from 'formik'
import * as yup from 'yup'

import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'

import Input from 'atomic/atoms/Input'
import History from 'atomic/organisms/History'
import { DragonT } from 'models'

type DragonEditorFormT = {
  initialValues: DragonT | undefined,
  onSubmit: (data: any) => void,
  triggerRef: React.Ref<HTMLButtonElement>
}

const DragonEditorForm: React.FunctionComponent<DragonEditorFormT> = ({ initialValues, onSubmit, triggerRef }) => {
  const [newHistory, setNewHistory] = React.useState<string>('')
  const [newHistoryError, setNewHistoryError] = React.useState<string>('')
  const [histories, setHistories] = React.useState<Array<string>>(initialValues?.histories ?? [])

  const onChangeHistory = React.useCallback((target: string, newValue: string) => {
    const index = histories.findIndex((value) => value === target)
    
    if (index >= 0) {
      const updatedHistories = histories.concat([])
      updatedHistories.splice(index, 1, newValue)
      setHistories(() => updatedHistories)
    }
  }, [histories])

  const onDeleteHistory = React.useCallback((target: string) => {
    const index = histories.findIndex((value) => value === target)

    if (index >= 0) {
      const updatedHistories = histories.concat([])
      updatedHistories.splice(index, 1)
      setHistories(() => updatedHistories)
    }
  }, [histories])

  const mappedHistories = React.useMemo(() => _map(histories, (history) => (
    <History
      key={v4()}
      canEdit 
      value={history} 
      onChange={(newValue) => onChangeHistory(history, newValue)}
      onRemove={() => onDeleteHistory(history)}
    />
  )), [onChangeHistory, onDeleteHistory])

  if (!initialValues) return null

  const onChangeNewHistory = ({target: { value }}: {target: { value: string }}) => setNewHistory(() => value)
  
  const onSaveNewHistory = () => {
    if(newHistory.length > 3) {
      setNewHistoryError(() => '')
      setHistories(() => [newHistory].concat(histories))
      setNewHistory(() => '')
    } else {
      setNewHistoryError(() => 'Escreva pelo menos 3 caracteres para a hist??ria...')
    }
  }

  const historiesWrapperSX = {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
  }

  const newHistoryWrapperSX = {
    width: '100%',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: '2rem'
  }

  const submitInterceptor = (newData: DragonT) => {
    onSubmit({...newData, histories })
  }

  const errorExtractor = (error: string | Array<string> | any) => typeof error !== 'string' ? error[0] : error 
  const mountField = ({ form, field }: FieldProps) => <Input {...field} errorMessage={errorExtractor(form.errors[field.name] ?? '')} />

  const schema = yup.object({
    name: yup.string().min(3, 'M??nimo de 3 caracteres').required('Campo obrigat??rio'),
    type: yup.string().min(3, 'M??nimo de 3 caracteres').required('Campo obrigat??rio'),
  })

  const formikProps = {
    initialValues,
    onSubmit: submitInterceptor,
    validationSchema: schema,
    validateOnChange: false,
  }

  return (
    <>
      <Formik {...formikProps} >
        <Form>
          <Field type="text" name="name" component={mountField} />
          <Field type="text" name="type" component={mountField} />
          <button title="form trigger" style={{ display: 'none' }} ref={triggerRef} type="submit" />
        </Form>
      </Formik>
      <Box sx={historiesWrapperSX}>
        <Box sx={newHistoryWrapperSX}>
          <Input multiline label="Nova hist??ria" value={newHistory} onChange={onChangeNewHistory} errorMessage={newHistoryError} />
          <IconButton color="primary" sx={{ marginTop: '0.5rem', marginLeft: '0.5rem' }} onClick={onSaveNewHistory}><i className="fa-solid fa-plus"></i></IconButton>
        </Box>
        {mappedHistories}
    </Box>
  </>
  )
}

export default DragonEditorForm