// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import * as Yup from 'yup';
import './App.css';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const SignupSchema = Yup.object().shape({
  password: Yup.object().shape({
    password: Yup.string().required('Required')
  }),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

const App = (props) => {
  const { classes } = props;
  return (
    <div >
      <Formik
        initialValues={{ email: '', password: { password: '', showPassword: false } }}

        validationSchema={SignupSchema}

        onSubmit={(values, { setSubmitting, setStatus }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            setStatus({ msg: 'Set some arbitrary status or data' })
          }, 400);
        }}
      >
        {(props) => {
          let { isSubmitting, status, handleReset, dirty, values, setValues } = props;

          // const [values, setValues] = React.useState({
          //   showPassword: false,
          // });

          const handleclickshowpassword = () => {
            setValues({ ...values, password: { ...values.password, showPassword: !values.password.showPassword } });
          };

          return (<Paper elevation={1}>
          <Form className="form-debug-container">
            <div className="form-container" >

              <Field name="email" label="Email" placeholder="email" component={CustomInputComponent} className="field"/>
              <Field name="password.password"  className="field" >
                {({ field: { value, ...field }, // { name, value, onChange, onBlur}
                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  // ...props
                }) => {
                  return (
                    <div>
                      <TextField
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton aria-label="Toggle password visibility" onClick={handleclickshowpassword}>
                                {values.password.showPassword.showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        label="Password" placeholder="password"
                        value={values.password.password}
                        type={values.password.showPassword ? 'text' : 'password'}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        {...field}
                      />

                      <ErrorMessage name={field.name} component="div" />
                    </div>
                  )

                }}
              </Field>
              {status && status.msg}

              <Button type="button"
                onClick={handleReset}
                disabled={!dirty || isSubmitting}
                variant="contained" className={classes.button}>
                Reset
            </Button>
              <Button type="submit" disabled={isSubmitting} variant="contained" color="primary" className={classes.button}>
                Submit
            </Button>
            </div>

            <div className="debug">
              <DisplayFormikState {...props} />
            </div>
          </Form>
          </Paper>);
        }}

      </Formik>

    </div>
  );
}

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
    <div>
      <TextField fullWidth InputLabelProps={{ shrink: true }} {...field} {...props} />
      <ErrorMessage name={field.name} component="div" />
    </div>
  );

export const DisplayFormikState = props =>
  <div style={{ margin: '1rem 0' }}>
    <h3 style={{ fontFamily: 'monospace' }} />
    <pre
      style={{
        background: '#f6f8fa',
        fontSize: '1rem',
        padding: '.5rem',
      }}
    >
      <strong>props</strong> ={' '}
      {JSON.stringify(props, null, 4)}
    </pre>
  </div>;


export default withStyles(styles)(App);
