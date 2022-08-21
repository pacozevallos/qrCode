import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const axios = require('axios');

// const client_id = 'AV3AQkjnuIRsS1L8H1WqByz0Pqgz9V81wMaLMxv0G9faOepwPC-gYMVMsPERmYfPMptqlv5YpZZfZ9Iv';
// const secret = 'EE6RAwswnEpt9c8eRp5Qpe_i3oWd2FlU6hALLXdg8AwDny0-FAXGKMZP_rBHXcToWcVWxpnW4a_cLZ9t';
const basic = 'QVYzQVFram51SVJzUzFMOEgxV3FCeXowUHFnejlWODF3TWFMTXh2MEc5ZmFPZXB3UEMtZ1lNVk1zUEVSbVlmUE1wdHFsdjVZcFpaZlo5SXY6RUU2UkF3c3duRXB0OWM4ZVJwNVFwZV9pM29XZDJGbFU2aEFMTFhkZzhBd0RueTAtRkFYR0tNWlBfckJIWGNUb1djVld4cG5XNGFfY0xaOXQ=';
// const access_token = 'A21AAJ_LgEntBfmHzLaw1gX1qtdF323gWGb_tov665eWJx691pGB6atMAOe-UbZUV6Nd-fYjB0iZDCtkaIsDR_ISjEb2dcFyA';
const PAYPAL_API = 'https://api-m.sandbox.paypal.com'; // Live https://api-m.paypal.com
// const auth = { user: client_id, pass: secret };




export const createProduct = functions.https.onRequest( (req, res) => {

  const product = JSON.stringify({
    name: 'Subscripcion Youtube',
    description: 'Subscripcion a un canal de Youtube se cobra mensualmente',
    type: 'SERVICE',
    category: 'SOFTWARE',
    image_url: 'https://avatars.githubusercontent.com/u/15802366?s=460&u=ac6cc646599f2ed6c4699a74b15192a29177f85a&v=4'
  });

  const config = {
    method: 'post',
    url: `${PAYPAL_API}/v1/catalogs/products`,
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/json'
    },
    data: product
  };

  axios(config)
  .then((response: any) => {
    res.json(response.data);
    console.log(response.data);
  })
  .catch((error: any) => {
    res.json(error);
    console.log(error);
  });


});


export const createPlan = functions.https.onRequest((req, res) => {

  const { body } = req;
  // product_id

  const plan = JSON.stringify({
    name: 'PLAN mensual',
    product_id: body.product_id,
    status: 'ACTIVE',
    billing_cycles: [
      {
        frequency: {
          interval_unit: 'MONTH',
          interval_count: 1,
        },
        tenure_type: 'REGULAR',
        sequence: 1,
        total_cycles: 12,
        pricing_scheme: {
          fixed_price: {
            value: '3', // PRECIO MENSUAL QUE COBRAS 3.30USD
            currency_code: 'USD',
          },
        },
      },
    ],
    payment_preferences: {
      auto_bill_outstanding: true,
      setup_fee: {
        value: '10',
        currency_code: 'USD',
      },
      setup_fee_failure_action: 'CONTINUE',
      payment_failure_threshold: 3,
    },
    taxes: {
      percentage: '10', // 10USD + 10% = 11 USD
      inclusive: false,
    },
  });

  const config = {
    method: 'post',
    url: `${PAYPAL_API}/v1/billing/plans`,
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/json'
    },
    data: plan
  };

  axios(config)
  .then((response: any) => {
    res.json(response.data);
    console.log(response.data);
  })
  .catch((error: any) => {
    res.json(error);
    console.log(error);
  });

});



export const generateSubscription = functions.https.onRequest((req, res) => {

  const { body } = req;

  const subscription = JSON.stringify({
    plan_id: body.plan_id,
    start_time: '2022-11-01T00:00:00Z',
    quantity: 1,
    subscriber: {
        name: {
            given_name: 'Leifer',
            surname: 'Mendez'
        },
        email_address: 'customer@example.com',
    },
    return_url: 'http://localhost/gracias',
    cancel_url: 'http://localhost/fallo'
  });

  const config = {
    method: 'post',
    url: `${PAYPAL_API}/v1/billing/subscriptions`,
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/json'
    },
    data: subscription
  };

  axios(config)
  .then((response: any) => {
    res.json(response.data);
    console.log(response.data);
  })
  .catch((error: any) => {
    res.json(error);
    console.log(error);
  });

});
