import { useContext } from 'react';
import { Button } from '../../components/form/Button';
import { Input } from '../../components/form/Input';
import { Layout } from '../../components/layout/Layout';
import { AppContext } from '../../context/state';
import { Login as LoginComponent } from '../../components/login/Login';

export default function Register(): JSX.Element {
  const name = 'test';
  const LoginContext = useContext(AppContext);

  const onLogout = (e:React.MouseEvent<HTMLButtonElement>):void => {
    e.preventDefault();
    LoginContext.logout();
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
          <h2>Nýskráning</h2>
          <Input label="Nafn" name="name" type="text" />
          <Input label="Notendanafn" name="username" type="text" />
          <Input label="Lykilorð" name="password" type="password" />
          <Button>Skrá</Button>
        </div>
      </Layout>
    </>
  );
}
