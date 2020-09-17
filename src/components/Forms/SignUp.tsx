import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useEffect,
  useState
} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useApp } from '../../providers/AppProvider'
import { useForm } from 'react-hook-form'
import {
  Button,
  FormGroup,
  HTMLSelect,
  InputGroup,
  Radio,
  RadioGroup
} from '@blueprintjs/core'

const strength = (value: string): number => {
  if (value === '') {
    return 0
  }
  let strength = 0
  let hasLowerCase = false
  let hasUpperCase = false
  let hasNumber = false
  let hasSpecialChar = false

  const isLowerCase = val => /^[a-z]*$/.test(val)
  const isUpperCase = val => /^[A-Z]*$/.test(val)
  const isNumeric = val => /^[0-9]*$/.test(val)
  const isSpecial = val => /^[!@#$%^&*(){}+=-_]*$/.test(val)

  const chars = value.split('')
  chars.forEach(c => {
    if (isLowerCase(c)) hasLowerCase = true
    if (isUpperCase(c)) hasUpperCase = true
    if (isNumeric(c)) hasNumber = true
    if (isSpecial(c)) hasSpecialChar = true
  })
  hasLowerCase ? strength++ : undefined
  hasUpperCase ? strength++ : undefined
  hasNumber ? strength++ : undefined
  hasSpecialChar ? strength++ : undefined

  return strength
}
const StyledMongoUserForm = styled.div`
  margin: 2rem;
  .title {
    margin-bottom: 1rem;
  }
  .bp3-input-group + p {
    color: #cc3300;
  }
  .actions {
    border-top: 2px solid #cc3300;

    button {
      margin-top: 1rem;
    }
  }
  .strength-indicator {
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    span {
      display: inline-block;
      width: 42px;
      height: 4px;
      background: #dedfe0;
      &:not(:first-child) {
        margin-left: 0.5rem;
      }
      &.on {
        background: #3dcc91;
      }
    }
  }
`

type Role = 'general' | 'administrator'
interface FormInputs {
  firstname: string
  lastname: string
  alias: string
  role: Role
  email: string
  password: string
  database: string
}

const SignUp: FunctionComponent = () => {
  const { updateMessageBucket, jwt } = useApp()
  const { register, handleSubmit, errors } = useForm<FormInputs>({
    mode: 'onTouched',
    shouldFocusError: true,
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      alias: '',
      role: 'general',
      database: 'mongo'
    }
  })
  const [pass, setPass] = useState('')
  const [passStrength, setPassStrength] = useState(0)
  const [database, setDatabase] = useState<Database>('mongo')
  const [role, setRole] = useState<Role>('general')
  const validatePassword = async (): Promise<boolean> => {
    return passStrength === 4 && pass.length >= 6
  }
  type Database = 'mongo' | 'mysql'
  const onSubmit = async (data: FormInputs, e: FormEvent) => {
    e.preventDefault()
    const { database } = data
    delete data.database
    const response = await axios.post(
      `https://demo2.kathyebel.dev:1200/rest/admin/create/user/${database}`,
      data,
      { headers: { Authorization: `Bearer ${jwt}` } }
    )
    // TODO: extract logic to somewhere else
    switch (response.data.type) {
      case 'rest-jwt-token-invalid':
        await updateMessageBucket('rest', 'warning', 'JWT Token is Invalid')
        break
      case 'rest-test-create-mysql-user-failure':
        await updateMessageBucket('rest', 'danger', 'Unable to create user')
        break
      case 'rest-test-create-mysql-user-success':
        await updateMessageBucket('rest', 'success', 'User Created!')
        break
      default:
        break
    }
  }

  useEffect(() => {
    setPassStrength(strength(pass))
  }, [pass])

  return (
    <StyledMongoUserForm>
      <h2 className="title">Sign Up {database.toUpperCase()} User</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          label="First Name"
          labelFor="firstname"
          labelInfo="(required)"
        >
          <InputGroup
            id="firstname"
            name="firstname"
            type="text"
            inputRef={register({ required: true, minLength: 2 })}
          />
          {errors.firstname && errors.firstname.type === 'required' && (
            <p>This field is required</p>
          )}
          {errors.firstname && errors.firstname.type === 'minLength' && (
            <p>Minimum of 2 characters</p>
          )}
        </FormGroup>
        <FormGroup label="Last Name" labelFor="lastname" labelInfo="(required)">
          <InputGroup
            id="lastname"
            name="lastname"
            type="text"
            inputRef={register({ required: true, minLength: 3 })}
          />
          {errors.lastname && errors.lastname.type === 'required' && (
            <p>This field is required</p>
          )}
          {errors.lastname && errors.lastname.type === 'minLength' && (
            <p>Minimum of 3 characters</p>
          )}
        </FormGroup>
        <FormGroup label="Alias" labelFor="alias" labelInfo="(required)">
          <InputGroup
            id="alias"
            name="alias"
            type="text"
            inputRef={register({ required: true, minLength: 4 })}
          />
          {errors.alias && errors.alias.type === 'required' && (
            <p>This field is required</p>
          )}
          {errors.alias && errors.alias.type === 'minLength' && (
            <p>Minimum of 4 characters</p>
          )}
        </FormGroup>
        <HTMLSelect
          name="role"
          elementRef={register({ required: true })}
          options={['administrator', 'general']}
          value={role}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setRole(e.target.value as Role)
          }
        />
        <FormGroup label="Email" labelFor="email" labelInfo="(required)">
          <InputGroup
            id="email"
            name="email"
            type="email"
            inputRef={register({ required: true, minLength: 7 })}
            leftIcon="envelope"
          />
          {errors.email && errors.email.type === 'required' && (
            <p>This field is required</p>
          )}
          {errors.email && errors.email.type === 'minLength' && (
            <p>Minimum of 7 characters</p>
          )}
        </FormGroup>
        <FormGroup label="Password" labelFor="password" labelInfo="(required)">
          <InputGroup
            id="password"
            name="password"
            type="password"
            inputRef={register({
              required: true,
              minLength: 6,
              validate: validatePassword
            })}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPass(e.target.value)
            }
            leftIcon="lock"
          />
          {errors.password && errors.password.type === 'required' && (
            <p>This field is required</p>
          )}
          {errors.password && errors.password.type === 'minLength' && (
            <p>Minimum of 6 characters</p>
          )}
        </FormGroup>
        <RadioGroup
          name="database"
          selectedValue={database}
          inline
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDatabase(e.target.value as Database)
          }
        >
          <Radio
            label="MongoDB"
            value="mongo"
            inputRef={register({
              required: true
            })}
          />
          <Radio
            label="MySql"
            value="mysql"
            inputRef={register({
              required: true
            })}
          />
        </RadioGroup>
        <div className="strength-indicator">
          <span className={passStrength >= 1 ? 'on' : ''} />
          <span className={passStrength >= 2 ? 'on' : ''} />
          <span className={passStrength >= 3 ? 'on' : ''} />
          <span className={passStrength >= 4 ? 'on' : ''} />
        </div>
        <div className="actions">
          <Button text="Submit" intent="primary" type="submit" />
        </div>
      </form>
    </StyledMongoUserForm>
  )
}

export default SignUp
