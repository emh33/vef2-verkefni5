import * as React from 'react';
import Link from 'next/link';
import s from './Events.module.scss';

type EventType = {
  id: number;
  name: string;
  slug:string;
  description:string;
  created?:string;
  updated?:string;
};

export function Events({
  title, events,
}:{ title:string, events:EventType[],
}):JSX.Element {
  return (
    <section className={s.events}>
      <h2 className={s.events__title}>{title}</h2>
      <ul className={s.events__list}>
        {events.map((item, i) => (
          <li className={s.events__event} key={i}>
            <Link href={`events/${item.id}`}>
              <span className={s.events__eventLink}>{item.name}</span>
            </Link>
            <p className={s.events__eventDescription}>{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
