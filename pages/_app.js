import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || ((page) => page.children);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
