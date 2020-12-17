import React, { useState } from "react";

import Head from "next/head";
import dynamic from "next/dynamic";

import Center from "../components/Center/Center.js";
import ContentWrapper from "../components/ContentWrapper/ContentWrapper.js";
import GridWrapper from "../components/GridWrapper/GridWrapper.js";
import Header from "../blocks/Header/Header.js";
import PaginationButton from "../components/PaginationButton/PaginationButton.js";
import Spacer from "../components/Spacer/Spacer.js";

import { getAll } from "./api/strips/getAll.js";

const MiniatureStrip = dynamic(
  () => import("../blocks/MiniatureStrip/MiniatureStrip.js"),
  { ssr: false }
);

export const getStaticProps = async () => {
  const strips = await getAll();

  return { props: { strips } };
};

export default function Browse({ strips }) {
  const [page, setPage] = useState(0);
  const numStripsPerPage = 18;

  let pagination = [];

  for (let i = 0; i < strips.length / numStripsPerPage; i++) {
    pagination.push(i);
  }

  const PaginationBar = pagination.map((i) => {
    return (
      <PaginationButton
        key={i}
        setPage={setPage}
        currentPage={page}
        index={i}
      />
    );
  });

  return (
    <div>
      <Head>
        <title>XKCD VIEWER - Browse</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Spacer size="small" />
      <ContentWrapper>
        <Center>
          <h1>Browse</h1>
        </Center>
        <Center>{PaginationBar}</Center>
        <GridWrapper>
          {strips
            .slice(page * numStripsPerPage, (page + 1) * numStripsPerPage)
            .map((strip, i) => {
              return <MiniatureStrip key={page + i} strip={strip} />;
            })}
        </GridWrapper>
        <Center>{PaginationBar}</Center>
        <Spacer size="small" />
      </ContentWrapper>
      <Spacer size="small" />
    </div>
  );
}
