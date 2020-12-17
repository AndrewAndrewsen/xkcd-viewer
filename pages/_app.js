import "../styles/globals.css";
import React, { useEffect } from "react";

import { initUser } from "../util/user.js";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    initUser();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
