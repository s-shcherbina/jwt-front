import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useState } from 'react';
import { Context } from '../..';

const RegisterForm: FC = () => {
  const { store } = useContext(Context);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [locality, setLocality] = useState<string>('');
  const [service, setService] = useState<string>('');
  const [department, setDepartment] = useState<string>('');

  return (
    <div style={{ margin: 20 }}>
      <input
        type='text'
        placeholder="Прізвище, ім'я"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type='text'
        placeholder='Телефон'
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type='text'
        placeholder='Місто, ceло'
        value={locality}
        onChange={(e) => setLocality(e.target.value)}
      />
      <input
        type='text'
        placeholder='Оператор доставки'
        value={service}
        onChange={(e) => setService(e.target.value)}
      />
      <input
        type='text'
        placeholder='Відділення'
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <button
        onClick={() => {
          store.register({ name, phone, locality, service, department });
        }}
      >
        Реєстрація
      </button>
    </div>
  );
};

export default observer(RegisterForm);
