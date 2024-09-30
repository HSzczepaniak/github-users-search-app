import { render, screen } from "@testing-library/react";

import { SkeletonLoader } from "../../components/SkeletonLoader";

describe("SkeletonLoader", () => {
  test("renders the correct number of skeleton items", () => {
    render(<SkeletonLoader />);

    const skeletonItems = screen.getAllByTestId("skeleton-item");
    expect(skeletonItems).toHaveLength(30);
  });

  test("renders skeleton elements within each item", () => {
    render(<SkeletonLoader />);

    const avatarSkeletons = screen.getAllByTestId("avatar-skeleton");
    expect(avatarSkeletons).toHaveLength(30);

    const textSkeletons = screen.getAllByTestId("text-skeleton");
    expect(textSkeletons).toHaveLength(60);
  });

  test("applies correct grid sizing", () => {
    render(<SkeletonLoader />);

    const gridContainer = screen.getByTestId("skeleton-grid");
    expect(gridContainer).toHaveClass("MuiGrid2-container");

    const gridItems = screen.getAllByTestId("skeleton-item");
    gridItems.forEach(item => {
      expect(item).toHaveClass("MuiGrid2-grid-xs-12");
      expect(item).toHaveClass("MuiGrid2-grid-md-3");
    });
  });
});
