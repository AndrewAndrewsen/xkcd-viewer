import { api } from "./api.js";

const getUniqueId = () => {
  return Date.now().toString(16);
};

export const getUserUid = () => {
  if (localStorage.getItem("user_uid")) {
    return localStorage.getItem("user_uid");
  } else {
    return initUser();
  }
};

export const initUser = async () => {
  if (typeof localStorage == "undefined" || localStorage === null) {
    return;
  }
  const user_uid = localStorage.getItem("user_uid");

  if (localStorage !== undefined && !user_uid) {
    const user_uid = getUniqueId();
    localStorage.setItem("user_uid", user_uid);
    localStorage.setItem(
      "user_activity",
      JSON.stringify({ votes: [], favorites: [] })
    );
    return user_uid;
  } else {
    getUserVotes();
  }
};

const getUserVotes = async () => {
  if (typeof localStorage == "undefined" || localStorage === null) {
    return;
  }

  const userActivity = JSON.parse(localStorage.getItem("user_activity"));
  if (userActivity?.votes) {
    userActivity.votes = await api("user/" + getUserUid(), {}, true);
    localStorage.setItem("user_activity", JSON.stringify(userActivity));
  }
  return userActivity;
};

export const getUserVote = async (num) => {
  if (typeof localStorage == "undefined" || localStorage === null) {
    return;
  }
  await getUserVotes();

  const user_activity = localStorage.getItem("user_activity");
  if (user_activity) {
    const activity = JSON.parse(user_activity);
    const vote = activity.votes.filter((vote) => vote.num === num)?.[0];
    return vote;
  }
};

export const addToFavorites = (num) => {
  if (typeof localStorage == "undefined" || localStorage === null) {
    return;
  }

  const user_activity = JSON.parse(localStorage.getItem("user_activity"));
  let favorites = user_activity.favorites;
  if (favorites.filter((strip) => strip.num === num).length > 0) {
    favorites = favorites.filter((strip) => strip.num != num);
  } else {
    favorites.push({ num: num });
  }
  user_activity.favorites = favorites;
  localStorage.setItem("user_activity", JSON.stringify(user_activity));

  return user_activity.favorites;
};

export const getUserFavorites = () => {
  if (typeof localStorage == "undefined" || localStorage === null) {
    return;
  }

  const user_activity = localStorage.getItem("user_activity");
  if (user_activity) {
    const activity = JSON.parse(user_activity);
    const favorites = activity.favorites;
    return favorites;
  }
};

export const getUserActivity = () => {
  if (typeof localStorage == "undefined" || localStorage === null) {
    return;
  }

  const user_activity = JSON.parse(localStorage.getItem("user_activity"));
  return user_activity;
};
