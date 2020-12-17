import React from "react";

import Head from "next/head";

import Header from "../blocks/Header/Header.js";

import ContentWrapper from "../components/ContentWrapper/ContentWrapper.js";
import DisplayStrip from "../blocks/DisplayStrip/DisplayStrip.js";
import Spacer from "../components/Spacer/Spacer.js";

import { getAll } from "./api/strips/getAll.js";
import { getStrip } from "./api/strips/strip/[id].js";

import { api } from "../util/api.js";

export const getStaticPaths = async () => {
  const strips = await getAll();
  const paths = strips.map((strip) => ({
    params: { num: strip.num.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { num } }) => {
  const strip = await getStrip(num);
  return { props: { strip } };
};

export default function SingleStrip({ strip }) {
  return (
    <div>
      <Head>
        <title>XKCD VIEWER</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Spacer size={"small"} />

      <ContentWrapper>
        <Spacer size={"small"} />

        <DisplayStrip strip={strip} />

        <Spacer size={"small"} />
      </ContentWrapper>
    </div>
  );
}
