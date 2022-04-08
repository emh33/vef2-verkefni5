import {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';
import { useContext } from 'react';
import { EventItem } from '../../types/index';
import { Event } from '../../components/event/Event';
import { AppContext } from '../../context/state';
import { Layout } from '../../components/layout/Layout';
import { Login } from '../../components/login/Login';

export default function EventPage(
  { event }: InferGetServerSidePropsType<typeof getServerSideProps>,
): JSX.Element {
  const context = useContext(AppContext);

  return (
    <>
      <Layout
        title="Viðburðasíðan"
        footer={(
          <Login />
    )}
      >
        <Event
          id={event.id}
          title={event.name}
          description={event.description}
          registrations={event.registrations}
          loggedin={context.loggedin}
        />
      </Layout>
    </>
  );
}

const baseUrl = 'https://vef2-20222-v3-synilausn.herokuapp.com/events';

/* export const getStaticPaths : GetStaticPaths = async () => {
  const res = await fetch(baseUrl);
  const posts = await res.json();
  const data = posts.items;

  const paths = data.map((post:EventItem) => ({
    params: {
      id: `${post.id}`,
    },
  }));

  return { paths, fallback: false };
}; */

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;
  const res = await fetch(`${baseUrl}/${id}`);
  const event = (await res.json()) as EventItem;
  return !event ? { notFound: true } : {
    props: { event },
  };
};
