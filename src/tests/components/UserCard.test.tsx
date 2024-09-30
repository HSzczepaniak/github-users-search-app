import { render, screen } from "@testing-library/react";

import { UserCard } from "../../components/UserCard";
import { GitHubUser } from "../../types";

describe("UserCard", () => {
  const mockUser: GitHubUser = {
    login: "testuser",
    id: 12345,
    avatar_url: "https://example.com/avatar.jpg",
    html_url: "https://github.com/testuser",
  };

  test("renders user information correctly", () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText(mockUser.login)).toBeInTheDocument();
    expect(screen.getByText("ID: 12345")).toBeInTheDocument();

    const avatar = screen.getByAltText(mockUser.login) as HTMLImageElement;
    expect(avatar).toBeInTheDocument();
    expect(avatar.src).toBe("https://example.com/avatar.jpg");

    const profileButton = screen.getByRole("link", { name: /view profile/i });
    expect(profileButton).toBeInTheDocument();
    expect(profileButton).toHaveAttribute("href", "https://github.com/testuser");
    expect(profileButton).toHaveAttribute("target", "_blank");
    expect(profileButton).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("handles long usernames correctly", () => {
    const longUsernameUser: GitHubUser = {
      ...mockUser,
      login: "verylongusernamethatmightoverflow",
    };
    render(<UserCard user={longUsernameUser} />);

    const username = screen.getByText(longUsernameUser.login);
    expect(username).toHaveStyle({
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      maxWidth: "100%",
    });
  });
});
