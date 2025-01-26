import { render, screen } from "@testing-library/react";
import DataDeletion from "./DataDeletion";

describe("DataDeletion", () => {
  it("renders data deletion instructions", () => {
    render(<DataDeletion />);

    expect(screen.getByText("Data Deletion Instructions")).toBeInTheDocument();
    expect(
      screen.getByText(/To request deletion of your account/)
    ).toBeInTheDocument();
  });

  it("displays all deletion options", () => {
    render(<DataDeletion />);

    // Check for email option
    expect(screen.getByText("Option 1: Email Request")).toBeInTheDocument();
    expect(screen.getByText(/Send an email to/)).toBeInTheDocument();

    // Check for account settings option
    expect(screen.getByText("Option 2: Account Settings")).toBeInTheDocument();
    expect(screen.getByText(/When logged in/)).toBeInTheDocument();
  });

  it("shows processing time notice", () => {
    render(<DataDeletion />);

    expect(
      screen.getByText(/Data deletion will be processed within 30 days/)
    ).toBeInTheDocument();
  });
});
