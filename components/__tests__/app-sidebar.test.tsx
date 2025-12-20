import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../app-sidebar";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/overview",
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock auth client
vi.mock("@/lib/auth-client", () => ({
  signOut: vi.fn(() => ({
    fetchOptions: {
      onSuccess: vi.fn(),
    },
  })),
}));

// Mock posthog
vi.mock("posthog-js", () => ({
  default: {
    capture: vi.fn(),
  },
}));

const mockUser = {
  name: "Test User",
  email: "test@example.com",
  avatar: "https://example.com/avatar.jpg",
};

describe("AppSidebar", () => {
  it("renders navigation items", () => {
    render(
      <SidebarProvider>
        <AppSidebar user={mockUser} />
      </SidebarProvider>
    );

    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("Expenses")).toBeInTheDocument();
    expect(screen.getByText("Income")).toBeInTheDocument();
    expect(screen.getByText("Subscriptions")).toBeInTheDocument();
    expect(screen.getByText("Investments")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("displays user information", () => {
    render(
      <SidebarProvider>
        <AppSidebar user={mockUser} />
      </SidebarProvider>
    );

    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("renders Plutus logo", () => {
    render(
      <SidebarProvider>
        <AppSidebar user={mockUser} />
      </SidebarProvider>
    );

    const logo = screen.getByAltText("Plutus");
    expect(logo).toBeInTheDocument();
  });
});
