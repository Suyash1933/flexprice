import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "@/components/molecules/SearchBar/SearchBar";

describe("SearchBar", () => {
  it("renders with placeholder text", () => {
    render(<SearchBar onSearch={vi.fn()} placeholder="Search customers..." />);
    expect(screen.getByPlaceholderText("Search customers...")).toBeInTheDocument();
  });

  it("displays typed text", async () => {
    render(<SearchBar onSearch={vi.fn()} placeholder="Search..." />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "acme");
    expect(input).toHaveValue("acme");
  });

  it("shows clear button when text is present", async () => {
    render(<SearchBar onSearch={vi.fn()} initialValue="test" />);
    expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
  });

  it("clears text when clear button is clicked", async () => {
    render(<SearchBar onSearch={vi.fn()} initialValue="clear me" />);
    await userEvent.click(screen.getByRole("button", { name: /clear/i }));
    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  it("renders without clear button when empty", () => {
    render(<SearchBar onSearch={vi.fn()} placeholder="Search..." />);
    expect(screen.queryByRole("button", { name: /clear/i })).not.toBeInTheDocument();
  });
});
