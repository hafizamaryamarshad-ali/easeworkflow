export default function Head() {
  const cacheBuster = "20260502";

  return (
    <>
      <link rel="icon" href={`/favicon.ico?v=${cacheBuster}`} sizes="any" />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`/favicon-16x16.png?v=${cacheBuster}`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`/favicon-32x32.png?v=${cacheBuster}`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="48x48"
        href={`/favicon-48x48.png?v=${cacheBuster}`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href={`/favicon-512.png?v=${cacheBuster}`}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`/apple-touch-icon.png?v=${cacheBuster}`}
      />
    </>
  );
}