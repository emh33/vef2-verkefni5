import { useContext, useState } from 'react';
import { Button } from '../../components/form/Button';
import { Input } from '../../components/form/Input';
import { Layout } from '../../components/layout/Layout';
import { Login as LoginComponent } from '../../components/login/Login';
import { AppContext } from '../../context/state';

export default function Login(): JSX.Element {
  const name = 'test';
  const LoginContext = useContext(AppContext);
  const [username, setUSername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const onLogout = (e:React.MouseEvent<HTMLButtonElement>):void => {
    e.preventDefault();
    LoginContext.logout();
  };

  const login = (e:React.MouseEvent<HTMLButtonElement>):void => {
    e.preventDefault();
    console.warn(`${username}${password}`);
  };

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setUSername(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setPassword(e.target.value);
  };

  return (
    <>
      <Layout
        title="Viðburðasíðan"
        footer={(
          <LoginComponent
            loggedin={LoginContext.isLoggedin}
            name={name}
            onLogout={onLogout}
          />
        )}
      >
        <div>
          <h2>Innskráning</h2>
          <form method="post">
            <Input
              label="Notendanafn"
              name="username"
              type="text"
              onChange={onChangeUsername}
            />
            <Input label="Lykilorð" name="password" type="password" onChange={onChangePassword} />
            <Button onClick={login}>Innskrá</Button>
          </form>
        </div>
      </Layout>
    </>
  );
}
