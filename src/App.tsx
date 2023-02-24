import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from '.';
import LoginForm from './components/register/LoginForm';
import LoginSUForm from './components/register/LoginSUForm';
import RegisterForm from './components/register/RegisterForm';
import UserService from './services/UsersService';
import { IUser } from './types';

const App: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    if (localStorage.getItem('token')) store.checkAuth();
  }, [store]);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      {store.isAuth ? (
        <>
          <h1>
            Авторизований користувач {store.user.id} {store.user.role}
          </h1>
          <button
            onClick={() => {
              store.logout();
              setUsers([]);
            }}
          >
            Вийти
          </button>
        </>
      ) : (
        <>
          <h1>Увійдіть</h1>
          <RegisterForm />
          <LoginForm />
          <hr />
          <LoginSUForm />
        </>
      )}
      <hr />
      <button
        onClick={() => {
          store.logout();
          setUsers([]);
        }}
      >
        Вийти
      </button>
      <hr />
      <button onClick={getUsers}>Користувачі:</button>
      <hr />
      {users.map((user) => (
        <div key={user.phone}>
          {user.phone} {user.name}
        </div>
      ))}
    </div>
  );
};

export default observer(App);
