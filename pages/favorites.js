import React, { useState } from "react";

import dynamic from "next/dynamic";
import Head from "next/head";

import Header from "../blocks/Header/Header.js";

import Center from "../components/Center/Center.js";
import ContentWrapper from "../components/ContentWrapper/ContentWrapper.js";
import GridWrapper from "../components/GridWrapper/GridWrapper.js";
import Spacer from "../components/Spacer/Spacer.js";

import { getUserFavorites } from "../util/user.js";

const MiniatureStrip = dynamic(
  () => import("../blocks/MiniatureStrip/MiniatureStrip.js"),
  { ssr: true }
);

import { api } from "../util/api.js";

export default function Favorites() {
  const [favorites, setFavorites] = useState(getUserFavorites());
  const [strips, setStrips] = useState([]);

  const fetchFavorite = async (num) => {
    return await api("strips/strip/" + num, {}, true);
  };

  useState(async () => {
    if (!favorites) return;

    await favorites.map(async (favorite) => {
      const arsel = await fetchFavorite(favorite.num);
      setStrips((prevState) => [...prevState, arsel]);
    });
  }, [favorites]);

  return (
    <div>
      <Head>
        <title>XKCD VIEWER - Favorites</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Spacer size="small" />
      <ContentWrapper>
        <Center>
          <h1>Favorites</h1>
        </Center>

        <GridWrapper>
          {strips?.map((strip) => {
            return <MiniatureStrip key={strip.num} strip={strip} />;
          })}
        </GridWrapper>

        <Spacer size="small" />
      </ContentWrapper>
      <Spacer size="small" />
    </div>
  );
}
