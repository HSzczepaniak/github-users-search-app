import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Box } from "@mui/material";

import { UserFormData } from "../types";
import { useGithubUsers } from "../contexts/GithubUsersContext";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
});

export const UsernameForm = () => {
  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const { setUsernameQuery } = useGithubUsers();

  const onSubmit = (data: UserFormData) => {
    setUsernameQuery(data.username);
  };

  return (
    <Box component="form" maxWidth={400} mb={2} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="username"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Search Github Users"
            type="search"
            fullWidth
            margin="normal"
            error={!!errors.username}
            helperText={errors.username?.message}
            onChange={e => {
              field.onChange(e);
              setUsernameQuery(e.target.value);
            }}
          />
        )}
      />
    </Box>
  );
};
