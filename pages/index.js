import React from "react";

import Head from "next/head";

import Header from "../blocks/Header/Header.js";

import Center from "../components/Center/Center.js";
import ContentWrapper from "../components/ContentWrapper/ContentWrapper.js";
import DisplayStrip from "../blocks/DisplayStrip/DisplayStrip.js";
import Spacer from "../components/Spacer/Spacer.js";

import { getRandom } from "./api/strips/getRandom.js";

export const getServerSideProps = async () => {
  const strip = await getRandom();

  return { props: { strip } };
};

export default function Home({ strip }) {
  return (
    <div>
      <Head>
        <title>XKCD VIEWER</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Spacer size={"small"} />

      <ContentWrapper>
        <Center>
          <h1>Random</h1>
        </Center>
        <Spacer size={"small"} />

        <DisplayStrip strip={strip} />

        <Spacer size={"small"} />
      </ContentWrapper>
    </div>
  );
}
