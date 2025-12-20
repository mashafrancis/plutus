import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { BulkActionBar } from "../BulkActionBar";

describe("BulkActionBar", () => {
  it("does not render when no income selected", () => {
    const { container } = render(
      <BulkActionBar onClearSelection={vi.fn()} selectedCount={0} />
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders when income entries are selected", () => {
    render(
      <BulkActionBar
        onBulkAddTags={vi.fn()}
        onBulkChangeSource={vi.fn()}
        onBulkDelete={vi.fn()}
        onClearSelection={vi.fn()}
        selectedCount={3}
      />
    );

    expect(screen.getByText("3 income entries selected")).toBeInTheDocument();
  });

  it("shows singular form for one income entry", () => {
    render(<BulkActionBar onClearSelection={vi.fn()} selectedCount={1} />);

    expect(screen.getByText("1 income entry selected")).toBeInTheDocument();
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
        onBulkChangeSource={vi.fn()}
        onBulkDelete={vi.fn()}
        onClearSelection={vi.fn()}
        selectedCount={3}
      />
    );

    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.getByText("Change Source")).toBeInTheDocument();
    expect(screen.getByText("Add Tags")).toBeInTheDocument();
  });
});
