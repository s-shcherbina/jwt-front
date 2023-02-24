import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useState } from 'react';
import { Context } from '../..';

const LoginForm: FC = () => {
  const { store } = useContext(Context);
  const [phone, setPhone] = useState<string>('');
  return (
    <div style={{ margin: 20 }}>
      <input
        type='text'
        placeholder='Телефон'
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={() => store.login(phone)}>Логин</button>
    </div>
  );
};

export default observer(LoginForm);
