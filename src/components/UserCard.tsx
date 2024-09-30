import { Card, CardContent, Typography, Avatar, Button } from "@mui/material";

import { UserCardProps } from "../types";

export const UserCard = ({ user, isLastCard, lastCardRef }: UserCardProps) => (
  <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }} ref={isLastCard ? lastCardRef : null}>
    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Avatar src={user.avatar_url} alt={user.login} sx={{ width: 80, height: 80, mb: 2 }} />
      <Typography
        variant="body2"
        gutterBottom
        sx={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
          maxWidth: "100%",
        }}
      >
        {user.login}
      </Typography>
      <Typography variant="body2" color="textSecondary" mb={1}>
        ID: {user.id}
      </Typography>
      <Button variant="contained" href={user.html_url} target="_blank" rel="noopener noreferrer" size="small">
        View Profile
      </Button>
    </CardContent>
  </Card>
);
