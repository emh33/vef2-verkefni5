import router from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/state';
import { deleteRegisterEvent, postRegiserEvent } from '../../lib/req';
import { Button } from '../form/Button';
import { Input } from '../form/Input';
import s from './Event.module.scss';

type Registered = {
  id:number;
  name:string;
  username:string;
  comment:string;
};

export function Event({
  id, title, description, registrations, loggedin,
}:{ id:string, title:string, description:string,
  registrations:Registered[], loggedin:boolean,
}):JSX.Element {
  const context = useContext(AppContext);
  const [comment, setComment] = useState('');
  const [registered, setRegistered] = useState(false);

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setComment(e.target.value);
  };

  const submitRegister = async () : Promise<void> => {
    const post = await postRegiserEvent(id.toString(), comment);
    setRegistered(true);
    console.info(post);
    router.push(`/events/${id}`);
  };

  const deleteRegister = async () : Promise<void> => {
    const dRegister = await deleteRegisterEvent(id.toString());
    console.info(dRegister);
    setRegistered(false);
    router.push(`/events/${id}`);
  };

  useEffect(() => {
    if (context.user) {
      const userRegistrations = registrations.filter((user) => user.id === context.user?.id);
      if (userRegistrations.length >= 1) setRegistered(true);
    }
  }, [context.user, registrations]);

  return (
    <section className={s.event}>
      <h2 className={s.event__title}>{title}</h2>
      <p className={s.event__description}>{description}</p>

      {registrations.length === 0 && (
        <p className={s.event__empty}>Engin hefur skráð sig á þennan viðburð</p>
      )}

      {registrations.length > 0 && (
        <ul className={s.event__registeredList}>
          {registrations.map((registration, i) => (
            <li key={i} className={s.event__registeredItem}>
              <span className={s.event__registeredName}>{registration.name}</span>
              {registration.comment
              && <span className={s.event__registeredComment}>{registration.comment}</span>}
            </li>
          ))}
        </ul>
      )}
      <p>&nbsp;</p>
      {registered && (
      <div>
        <p>Þú hefur skráð þig á þennan viðburð</p>
        <Button onClick={deleteRegister}>Skrá þig af viðburð</Button>
      </div>
      )}

      {!registered && (
        <>
          {loggedin && (
            <form>
              <Input label="Athugasemd" name="comment" type="text" onChange={onChangeComment} />
              <Button onClick={submitRegister}>Skrá mig</Button>
              <p>&nbsp;</p>
            </form>
          )}

          {!loggedin && (
            <p>Skráðu þig inn til að skrá þig á viðburðinn</p>
          )}
        </>
      )}
    </section>
  );
}
