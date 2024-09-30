import { Card, CardContent, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { FETCH_GITHUB_USERS_PER_PAGE } from "../constants";

export const SkeletonLoader = () => (
  <Grid container spacing={3} data-testid="skeleton-grid">
    {[...Array(FETCH_GITHUB_USERS_PER_PAGE)].map((_, index) => (
      <Grid
        size={{
          xs: 12,
          md: 3,
        }}
        key={index}
        data-testid="skeleton-item"
      >
        <Card>
          <CardContent>
            <Skeleton
              variant="circular"
              width={60}
              height={60}
              sx={{ mx: "auto", mb: 2 }}
              data-testid="avatar-skeleton"
            />
            <Skeleton variant="text" width="60%" sx={{ mx: "auto" }} data-testid="text-skeleton" />
            <Skeleton variant="text" width="40%" sx={{ mx: "auto" }} data-testid="text-skeleton" />
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);
