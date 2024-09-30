import { useState, useMemo } from "react";
import { useDebounce } from "use-debounce";
import { useInfiniteQuery } from "@tanstack/react-query";

import { GitHubResponse } from "../types";
import { createContext } from "../utils/contextCreator";

import {
  FETCH_GITHUB_BASE_URL,
  FETCH_GITHUB_USERS_PER_PAGE,
  FETCH_GITHUB_USERS_DEBOUNCE_TIME,
  FETCH_GITHUB_USERS_DEFAULT_RESPONSE,
} from "../constants";

const fetchGithubUsers = async (pageParam: unknown, username: string): Promise<GitHubResponse> => {
  if (!username) return FETCH_GITHUB_USERS_DEFAULT_RESPONSE;
  const res = await fetch(
    `${FETCH_GITHUB_BASE_URL}${username}+in:login&per_page=${FETCH_GITHUB_USERS_PER_PAGE}&page=${pageParam}`
  );
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "There was something wrong, please try again later");
  }
  const data: GitHubResponse = await res.json();
  return data;
};

export const [useGithubUsers, GithubUsersProvider] = createContext(() => {
  const [usernameQuery, setUsernameQuery] = useState("");

  const debounceNumber = useMemo(() => FETCH_GITHUB_USERS_DEBOUNCE_TIME, []);
  const [debouncedUsername] = useDebounce(usernameQuery, debounceNumber);

  const { data, error, fetchNextPage, isError, isLoading, hasNextPage } = useInfiniteQuery<GitHubResponse, Error>({
    queryKey: ["githubUsers", debouncedUsername],
    queryFn: ({ pageParam }) => fetchGithubUsers(pageParam, debouncedUsername),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const totalPages = Math.ceil(lastPage.total_count / FETCH_GITHUB_USERS_PER_PAGE);
      if (pages.length >= totalPages) return undefined;
      return pages.length + 1;
    },
    enabled: !!usernameQuery,
    refetchOnWindowFocus: false,
  });

  const shouldDisplayZeroState = useMemo(() => !isLoading && !isError && !data, [isLoading, isError, data]);

  const shouldDisplayNoResults = useMemo(() => {
    if (!isLoading && !isError && data) {
      return !data.pages[0].incomplete_results && data.pages[0].items.length === 0;
    }
    return false;
  }, [isLoading, isError, data]);

  return {
    data,
    isLoading,
    error,
    isError,
    setUsernameQuery,
    fetchNextPage,
    hasNextPage,
    shouldDisplayZeroState,
    shouldDisplayNoResults,
  };
});
