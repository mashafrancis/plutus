import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { BulkActionBar } from "../BulkActionBar";

describe("BulkActionBar", () => {
  it("does not render when no expenses selected", () => {
    const { container } = render(
      <BulkActionBar onClearSelection={vi.fn()} selectedCount={0} />
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders when expenses are selected", () => {
    render(
      <BulkActionBar
        onBulkAddTags={vi.fn()}
        onBulkChangeCategory={vi.fn()}
        onBulkDelete={vi.fn()}
        onClearSelection={vi.fn()}
        selectedCount={3}
      />
    );

    expect(screen.getByText("3 expenses selected")).toBeInTheDocument();
  });

  it("shows singular form for one expense", () => {
    render(<BulkActionBar onClearSelection={vi.fn()} selectedCount={1} />);

    expect(screen.getByText("1 expense selected")).toBeInTheDocument();
  });

  it("calls onBulkDelete when Delete button is clicked", async () => {
    const user = userEvent.setup();
    const onBulkDelete = vi.fn();

    render(
      <BulkActionBar
        onBulkDelete={onBulkDelete}
        onClearSelection={vi.fn()}
        selectedCount={2}
      />
    );

    const deleteButton = screen.getByText("Delete");
    await user.click(deleteButton);
    expect(onBulkDelete).toHaveBeenCalledTimes(1);
  });

  it("calls onClearSelection when Clear button is clicked", async () => {
    const user = userEvent.setup();
    const onClearSelection = vi.fn();

    render(
      <BulkActionBar onClearSelection={onClearSelection} selectedCount={2} />
    );

    const clearButton = screen.getByText("Clear");
    await user.click(clearButton);
    expect(onClearSelection).toHaveBeenCalledTimes(1);
  });

  it("renders all action buttons", () => {
    render(
      <BulkActionBar
        onBulkAddTags={vi.fn()}
        onBulkChangeCategory={vi.fn()}
        onBulkDelete={vi.fn()}
        onClearSelection={vi.fn()}
        selectedCount={3}
      />
    );

    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.getByText("Change Category")).toBeInTheDocument();
    expect(screen.getByText("Add Tags")).toBeInTheDocument();
  });
});
