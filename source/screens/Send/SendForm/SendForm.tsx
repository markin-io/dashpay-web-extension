import React, {useState} from 'react';
import {Button, Input, Label, Modal} from 'semantic-ui-react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {ValidationError} from 'yup';
import classnames from 'classnames';
import {useNavigate} from 'react-router-dom';

import useWalletBalance from '../../../hooks/useWalletBalance';
import moneyFormatter from '../../../utils/moneyFormatter';
import ConfirmModal from '../../../components/ConfirmModal';
import './SendForm.scss';
import useCreateTransaction from '../../../hooks/useCreateTransaction';
import Balance from './Balance';

interface IFormInput {
  address: string;
  amount: number;
}

const SendForm: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {balance} = useWalletBalance();
  const navigate = useNavigate();
  const {handleCreateTransaction, transaction, handleBroadcastTransaction} =
    useCreateTransaction();

  const SendFormSchema = Yup.object().shape({
    address: Yup.string()
      .required('Address is Required')
      .test(
        'isValidWallet',
        'wallet is not valid',
        (value?: string | null): boolean | ValidationError => {
          return (
            !!value &&
            value?.startsWith(
              process.env.NODE_ENV === 'development' ? 'y' : 'X'
            )
          );
        }
      ),
    amount: Yup.string()
      .required('Amount is Required')
      .test('isValidAmount', 'too much', (value?: string | null) => {
        if (value) {
          return balance >= moneyFormatter.formatSatoshis(+value);
        }
        return true;
      })
      .test('Is positive?', 'The number must be greater than 0!', (value) => {
        if (value) {
          return +value >= 0;
        }
        return true;
      }),
  });

  const {handleChange, values, errors} = useFormik<IFormInput>({
    initialValues: {
      address: '',
      amount: 0,
    },
    validationSchema: SendFormSchema,
    validateOnChange: true,
    onSubmit: () => undefined,
  });

  const checkWalletIcon = (): null | Record<string, unknown> => {
    if (values.address.length === 0) {
      return null;
    }
    if (errors.address) {
      return {name: 'ban', color: 'red'};
    }

    return {name: 'check circle', color: 'green'};
  };

  const onBroadcastTransaction = (): void => {
    setLoading(true);
    if (transaction) {
      handleBroadcastTransaction(transaction)
        .then(() => {
          navigate('/popup.html');
          setLoading(false);
        })
        .catch(() => {
          setOpen(false);
          setError(true);
          setTimeout(() => setError(false), 3000);
          setLoading(false);
        });
    }
  };

  const createTransaction = (): void => {
    handleCreateTransaction(values);
    setError(false);
  };

  return (
    <div className="send-form column">
      <Balance balance={balance} />
      <div className="send-form__group">
        <div className="send-form__group__item">
          <Label className={classnames(null, {error: !!errors.address})}>
            {errors.address ? errors.address : 'Address'}
          </Label>

          <Input
            name="address"
            value={values.address}
            onChange={handleChange}
            icon={checkWalletIcon()}
            iconPosition="left"
          />
        </div>

        <div className="send-form__group__item">
          <Label className={classnames(null, {error: !!errors.amount})}>
            {errors.amount ? errors.amount : 'Amount'}
          </Label>
          <Input
            name="amount"
            value={values.amount}
            onChange={handleChange}
            type="number"
            min="0.00000"
            step="0.00001"
            presicion={2}
          />
        </div>
      </div>

      {error && (
        <div className="send-form__error">
          <span>Oops</span>
          <p>Sorry, an unexpected error has occurred.</p>
        </div>
      )}

      <div className="send-form__button">
        <Modal
          onClose={(): void => setOpen(false)}
          onOpen={(): void => setOpen(true)}
          open={isOpen}
          className="modal"
          trigger={
            <Button
              fluid
              disabled={
                !!errors.amount ||
                !!errors.address ||
                values.address.length === 0 ||
                values.amount === 0
              }
              onClick={createTransaction}
            >
              Send
            </Button>
          }
        >
          <ConfirmModal
            amount={values.amount}
            onClose={(): void => setOpen(false)}
            address={values.address}
            fee={transaction?.fee || 0}
            onBroadcastTransaction={onBroadcastTransaction}
            loading={loading}
          />
        </Modal>
      </div>
    </div>
  );
};

export default SendForm;
