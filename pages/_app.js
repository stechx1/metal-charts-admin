import "../styles/globals.css";
import { ToastContainer, toast ,Slide} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || ((page) => page.children);
  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer 
      position="top-right"
      autoClose={6000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      transition={Slide}
      />
    </Layout>
  );
}

export default MyApp;
