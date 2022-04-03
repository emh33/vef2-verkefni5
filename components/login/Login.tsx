import Link from 'next/link';

type LoginTypes = {
  loggedin:boolean,
  name?:string,
  onLogout?:React.MouseEventHandler<HTMLButtonElement>,
};

export function Login({
  loggedin = false,
  name,
  onLogout,
} :LoginTypes):JSX.Element {
  if (loggedin) {
    return (
      <>
        <p>
          Skráður inn sem <strong>{name}</strong>
        </p>
        <button type="button" onClick={onLogout}>Útskrá</button>
      </>
    );
  }

  return (
    <>
      <p>
        <Link href="/">Forsíða</Link>
      </p>
      <p>
        <Link href="/users/login">Innskráning</Link>
      </p>
      <p>
        <Link href="/users/register">Nýskráning</Link>
      </p>
    </>
  );
}
