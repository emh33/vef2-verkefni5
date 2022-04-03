export default function Event(): JSX.Element {
  return (
    <h1>Þetta er viðburður númer </h1>
  );
}

/* export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string | undefined;

  const query = `
    query($id: ID!) {
      person(id: $id) {
        ...character
      }
    }
    ${characterFragment}
  `;

  let person = null;

  if (id) {
    const result = await fetchSwapi<IPersonResponse>(query, { id });

    person = result.person ?? null;
  }

  return {
    props: {
      person,
    },
  };
}; */
