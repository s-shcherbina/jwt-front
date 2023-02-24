import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useState } from 'react';
import { Context } from '../..';

const LoginSUForm: FC = () => {
  const { store } = useContext(Context);
  const [email, setEmail] = useState<string>('');
  const [invite, setInvite] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  return (
    <div style={{ margin: 20 }}>
      <input
        type='text'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        // type='password'
        type='text'
        placeholder='Пароль'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type='text'
        placeholder='Admin password'
        value={invite}
        onChange={(e) => setInvite(e.target.value)}
      />
      <button onClick={() => store.loginSU(email, password)}>Логин SU</button>
      <button onClick={() => store.registerSU(email, password, invite)}>
        Register SU
      </button>
    </div>
  );
};

export default observer(LoginSUForm);
