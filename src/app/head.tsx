export default function Head() {
  const cacheBuster = "20260503";

  return (
    <>
      <link rel="icon" href={`/favicon.ico?v=${cacheBuster}`} sizes="any" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`/apple-touch-icon.png?v=${cacheBuster}`}
      />
    </>
  );
}