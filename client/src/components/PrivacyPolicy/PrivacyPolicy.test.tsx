import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PrivacyPolicy from "./PrivacyPolicy";

describe("PrivacyPolicy", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>{children}</BrowserRouter>
  );

  it("renders privacy policy content", () => {
    render(<PrivacyPolicy />, { wrapper });

    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText(/Information We Collect/)).toBeInTheDocument();
    expect(screen.getByText(/How We Use Your Information/)).toBeInTheDocument();
    expect(screen.getByText(/Data Deletion/)).toBeInTheDocument();
  });

  it("displays all required sections", () => {
    render(<PrivacyPolicy />, { wrapper });

    // Check for specific content items
    const requiredItems = [
      "Name",
      "Email address",
      "Profile picture",
      "Social media ID",
      "Create and manage your account",
      "Authenticate you when you sign in",
      "Provide our services",
    ];

    requiredItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("has working data deletion link", () => {
    render(<PrivacyPolicy />, { wrapper });

    const deletionLink = screen.getByText("data deletion page");
    expect(deletionLink).toHaveAttribute("href", "/data-deletion");
  });
});
