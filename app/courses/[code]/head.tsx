export default function Head({ params }: { params: { code: string } }) {
  return (
    <>
      <title>{params.code}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content=""
      />
    </>
  );
}
