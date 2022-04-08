/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Button } from '../../components/form/Button';
import { Input } from '../../components/form/Input';
import { Layout } from '../../components/layout/Layout';
import { Login as LoginComponent } from '../../components/login/Login';
import { postRegister } from '../../lib/req';

export default function Register(): JSX.Element {
  const [name, setName] = useState('');
  const [username, setUSername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setError] = useState<string[]>([]);
  const [info, setinfo] = useState('');

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setName(e.target.value);
  };
  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setUSername(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setPassword(e.target.value);
  };

  const submit = async () : Promise<void> => {
    const register = await postRegister({ name, username, password });
    if (register.message) {
      setError(register.message.errors.map((error:any) => error.msg));
      console.info(errors);
    }
    if (register.data) {
      console.info(register.data);
      setinfo(`Nú getur skráð þig inn ${register.data.name}`);
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
          <h2>Nýskráning</h2>
          <Input label="Nafn" name="name" type="text" onChange={onChangeName} />
          <Input label="Notendanafn" name="username" type="text" onChange={onChangeUsername} />
          <Input label="Lykilorð" name="password" type="password" onChange={onChangePassword} />
          <Button onClick={submit}>Skrá</Button>
        </div>
        <div>
          <p>{info}</p>
          {errors.map((e: string, i) => (
            <p key={i}>
              {e}
            </p>
          ))}
        </div>
      </Layout>
    </>
  );
}
