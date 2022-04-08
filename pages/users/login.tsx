import router from 'next/router';
import { useContext, useState } from 'react';
import { Button } from '../../components/form/Button';
import { Input } from '../../components/form/Input';
import { Layout } from '../../components/layout/Layout';
import { Login as LoginComponent } from '../../components/login/Login';
import { AppContext } from '../../context/state';
import { postLogin } from '../../lib/req';

export default function Login(): JSX.Element {
  const context = useContext(AppContext);
  const [username, setUSername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setUSername(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setPassword(e.target.value);
  };

  const submit = async () : Promise<void> => {
    const login = await postLogin({ username, password });
    if (login.user) {
      context.newUser(login.user.user);
      router.push('/');
    }
    if (login.message) {
      console.info(login.message);
      setError(login.message.error);
    }
  };

  return (
    <>
      <Layout
        title="Viðburðasíðan"
        footer={(
          <LoginComponent />
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
            <Button onClick={submit}>Innskrá</Button>
          </form>
          <div>
            <p>{error}</p>
          </div>
        </div>
      </Layout>
    </>
  );
}
