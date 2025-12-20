import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { BulkActionBar } from "../BulkActionBar";

describe("BulkActionBar", () => {
  it("does not render when no subscriptions selected", () => {
    const { container } = render(
      <BulkActionBar onClearSelection={vi.fn()} selectedCount={0} />
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders when subscriptions are selected", () => {
    render(
      <BulkActionBar
        onBulkCancel={vi.fn()}
        onBulkChangeCategory={vi.fn()}
        onBulkPause={vi.fn()}
        onClearSelection={vi.fn()}
        selectedCount={3}
      />
    );

    expect(screen.getByText("3 subscriptions selected")).toBeInTheDocument();
  });

  it("shows singular form for one subscription", () => {
    render(<BulkActionBar onClearSelection={vi.fn()} selectedCount={1} />);

    expect(screen.getByText("1 subscription selected")).toBeInTheDocument();
  });

  it("calls onBulkPause when Pause button is clicked", async () => {
    const user = userEvent.setup();
    const onBulkPause = vi.fn();

    render(
      <BulkActionBar
        onBulkPause={onBulkPause}
        onClearSelection={vi.fn()}
        selectedCount={2}
      />
    );

    const pauseButton = screen.getByText("Pause");
    await user.click(pauseButton);
    expect(onBulkPause).toHaveBeenCalledTimes(1);
  });

  it("calls onBulkCancel when Cancel button is clicked", async () => {
    const user = userEvent.setup();
    const onBulkCancel = vi.fn();

    render(
      <BulkActionBar
        onBulkCancel={onBulkCancel}
        onClearSelection={vi.fn()}
        selectedCount={2}
      />
    );

    const cancelButton = screen.getByText("Cancel");
    await user.click(cancelButton);
    expect(onBulkCancel).toHaveBeenCalledTimes(1);
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
        onBulkCancel={vi.fn()}
        onBulkChangeCategory={vi.fn()}
        onBulkPause={vi.fn()}
        onClearSelection={vi.fn()}
        selectedCount={3}
      />
    );

    expect(screen.getByText("Pause")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Change Category")).toBeInTheDocument();
  });
});
