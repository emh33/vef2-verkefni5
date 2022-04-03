import React, { useState } from 'react';
import { InferGetStaticPropsType, GetStaticProps } from 'next';
import { Event } from '../types/index';
import { Events } from '../components/events/Events';
import { Layout } from '../components/layout/Layout';
import { Login } from '../components/login/Login';

function Home({ data }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const { items: eventsList } = data;
  const name = 'test';
  const [loggedin, setLoggedin] = useState(false);

  const onRegister = (e:React.MouseEvent<HTMLButtonElement>):void => {
    e.preventDefault();
    setLoggedin(true);
  };
  const onLogout = (e:React.MouseEvent<HTMLButtonElement>):void => {
    e.preventDefault();
    setLoggedin(false);
  };

  return (
    <Layout
      title="Viðburðasíðan"
      footer={(
        <Login
          loggedin={loggedin}
          name={name}
          onLogout={onLogout}
        />
    )}
    >
      <Events title="Viðburðir á næstunni" events={eventsList} />
    </Layout>
  );
}

const baseUrl = 'https://vef2-20222-v3-synilausn.herokuapp.com/events';

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(baseUrl);
  const data: Event[] = await res.json();
  return !data ? { notFound: true } : {
    props: { data },
    revalidate: 3600,
  };
};

export default Home;
