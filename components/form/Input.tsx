import s from './Input.module.scss';

export function Input({ label, name, type }:
{ label:string, name:string, type:string }): JSX.Element {
  return (
    <div className={s.input}>
      <label htmlFor={name}>{label}:</label>
      <input type={type} name={name} id={name} />
    </div>
  );
}
