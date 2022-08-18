import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const axios = require('axios').default;
admin.initializeApp();

const CLIENT = 'AV3AQkjnuIRsS1L8H1WqByz0Pqgz9V81wMaLMxv0G9faOepwPC-gYMVMsPERmYfPMptqlv5YpZZfZ9Iv';
const SECRET = 'EE6RAwswnEpt9c8eRp5Qpe_i3oWd2FlU6hALLXdg8AwDny0-FAXGKMZP_rBHXcToWcVWxpnW4a_cLZ9t';
const TOKEN = 'A21AAKS7PMxkd9yYjYQ1dTVwDPeopKkcU_f0Yo7aCbodmuG2zGynxavB1lvLAtE5tCIOyNvc4oYnvtygJ-RQSWieYlYEj012w';
const PAYPAL_API = 'https://api-m.sandbox.paypal.com'; // Live https://api-m.paypal.com
const auth = { user: CLIENT, pass: SECRET };

export const createProduct = functions.https.onRequest( (req, res) => {
  // tslint:disable-next-line:no-shadowed-variable
  const axios = require('axios');
  const data = JSON.stringify({
    name: 'Subscripcion Youtube',
    description: 'Subscripcion a un canal de Youtube se cobra mensualmente',
    type: 'SERVICE',
    category: 'SOFTWARE',
    image_url: 'https://avatars.githubusercontent.com/u/15802366?s=460&u=ac6cc646599f2ed6c4699a74b15192a29177f85a&v=4'
  });

  const config = {
    method: 'post',
    url: 'https://api-m.sandbox.paypal.com/v1/catalogs/products',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    },
    data
  };

  axios(config)
  .then((response: { data: any; }) => {
    console.log(JSON.stringify(response.data));
    return res.status(200).json({
      info: response.data});
  })
  .catch((error: any) => {
    console.log(error);
  });
});


export const createPlan = functions.https.onRequest((req, res) => {
  const { body } = req;
  // product_id

  const plan = {
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
  };

  axios.post(
    `${PAYPAL_API}/v1/billing/plans`,
    {
      auth,
      body: plan,
      json: true,
    },
    (err: any, response: { body: any }) => {
      res.json({ data: response.body });
    }
  );
});
