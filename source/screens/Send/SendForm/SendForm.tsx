import React, {useMemo, useState} from 'react';
import {Button, Icon, Input, Label, Modal} from 'semantic-ui-react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {ValidationError} from 'yup';
import classnames from 'classnames';
import useWalletBalance from '../../../hooks/useWalletBalance';
import moneyFormatter from '../../../utils/moneyFormatter';
import ConfirmModal from '../../../components/ConfirmModal';
import './SendForm.scss';

interface IFormInput {
  address: string;
  amount: number;
}

const SendForm: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const {balance} = useWalletBalance();

  const balanceFormatted = useMemo(() => {
    return moneyFormatter.formatDuffs(balance);
  }, [balance]);

  const SignupSchema = Yup.object().shape({
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
          const toMuch = balance >= moneyFormatter.formatSatoshis(+value);
          return toMuch;
        }
        return true;
      }),
  });

  const {handleChange, values, errors} = useFormik<IFormInput>({
    initialValues: {
      address: '',
      amount: 0,
    },
    validationSchema: SignupSchema,
    validateOnChange: true,
    onSubmit: (data) => {
      console.log(data);
    },
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

  return (
    <div className="send-form">
      <div className="send-form__balance">
        <span>
          Balance: {showBalance ? `${balanceFormatted} Dash` : '****'}
        </span>
        <Button icon onClick={(): void => setShowBalance((prev) => !prev)}>
          <Icon name="eye" />
        </Button>
      </div>
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
            >
              Send
            </Button>
          }
        >
          <ConfirmModal
            amount={values.amount}
            onClose={(): void => setOpen(false)}
            address={values.address}
            fee={'0'}
          />
        </Modal>
      </div>
    </div>
  );
};

export default SendForm;
