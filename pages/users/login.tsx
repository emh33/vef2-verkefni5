import { useContext } from 'react';
import { Button } from '../../components/form/Button';
import { Input } from '../../components/form/Input';
import { Layout } from '../../components/layout/Layout';
import { Login as LoginComponent } from '../../components/login/Login';
import { AppContext } from '../../context/state';

export default function Login(): JSX.Element {
  const name = 'test';
  const LoginContext = useContext(AppContext);

  const onLogout = (e:React.MouseEvent<HTMLButtonElement>):void => {
    e.preventDefault();
    LoginContext.logout();
  };

  const login = (e:React.MouseEvent<HTMLButtonElement>):void => {
    e.preventDefault();
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
          <Input label="Notendanafn" name="username" type="text" />
          <Input label="Lykilorð" name="password" type="password" />
          <Button onClick={login}>Innskrá</Button>
        </div>
      </Layout>
    </>
  );
}
