import React, { useState } from 'react';
import {InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core';
import {useForm, FormProvider} from 'react-hook-form';
import states from './states.js';
import {Link} from 'react-router-dom';

import FormInput from './FormInput';

function AddressForm({next}) {
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingState, setShippingState] = useState('');
  const methods = useForm();

    return (
      <div>
        <Typography variant="h6" gutterBottom>Shipping Address</Typography>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit((data) => next({...data, shippingCountry, shippingState}))}>
            <Grid container spacing={3}>
              <FormInput required name='firstName' label='First name' />
              <FormInput required name='lastName' label='Last Name'/>
              <FormInput required name='address1' label='Address'/>
              <FormInput required name='email' label='Email'/>
              <FormInput required name='City' label='City'/>
              <FormInput required name='ZIP' label='ZIP code'/>
              <Grid item xs={12} sm={6}>
                <InputLabel required>Country</InputLabel>
                <Select
                required
                  value={shippingCountry}
                  onChange={(e) => setShippingCountry(e.target.value)}
                  >
                    <MenuItem value="">
                      <br/>
                    </MenuItem>
                    <MenuItem value="USA">
                      USA
                    </MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel required>State</InputLabel>
                <Select
                required
                  value={shippingState}
                  onChange={(e) => setShippingState(e.target.value)}>
                    <MenuItem value="">
                      <br/>
                    </MenuItem>
                    {states.map((state, index) => (
                      <MenuItem key={state.index} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>

            </Grid>
            <br />
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <Button component={Link} to="/Cart" variant="outlined">Back to Cart</Button>
              <Button type="submit" variant="contained" color="primary">Next</Button>
            </div>
          </form>
        </FormProvider>
      </div>
    );
}

export default AddressForm;
