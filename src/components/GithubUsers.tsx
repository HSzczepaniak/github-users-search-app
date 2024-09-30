import { useEffect, useMemo } from "react";
import { Container, Typography, Grid2 as Grid } from "@mui/material";
import { useInView } from "react-intersection-observer";

import { SkeletonLoader } from "./SkeletonLoader";
import { UserCard } from "./UserCard";
import { UsernameForm } from "./UsernameForm";

import { useGithubUsers } from "../contexts/GithubUsersContext";
import { InfoBox } from "./InfoBox";

export const GithubUsers = () => {
  const { ref, inView } = useInView();
  const {
    data,
    isLoading,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    shouldDisplayZeroState,
    shouldDisplayNoResults,
  } = useGithubUsers();

  const userData = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap(page => page.items);
  }, [data]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
      }}
    >
      <Typography variant="h1" mb={2} fontSize="2.5rem">
        Search GitHub Users
      </Typography>
      <UsernameForm />
      {isLoading && <SkeletonLoader />}
      {isError && <InfoBox type="error" message={error?.message || "Error fetching users"} />}
      {shouldDisplayZeroState && <InfoBox type="info" message="Type a username to see GitHub users" />}
      {shouldDisplayNoResults && <InfoBox type="info" message="No users found" />}
      {userData && userData.length > 0 && (
        <Grid container spacing={3}>
          {userData?.map(user => (
            <Grid size={{ xs: 12, md: 3 }} key={user.id}>
              <UserCard user={user} isLastCard={userData.length === userData.indexOf(user) + 1} lastCardRef={ref} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
