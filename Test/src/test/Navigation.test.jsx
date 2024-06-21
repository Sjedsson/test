import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navigation from "../components/Navigation/Navigation";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("Navigation Component", () => {
  const mockSetConfirmation = vi.fn();

  const setup = () => {
    render(<Navigation setConfirmation={mockSetConfirmation} />);
  };

  beforeEach(() => {
    setup();
  });

  it("should toggle menu navigation", () => {
    const bookingLink = () => screen.getByRole("link", { name: /Booking/i });
    const menuButton = () => screen.getByRole("img");

    expect(bookingLink()).toHaveClass("hide");

    fireEvent.click(menuButton());
    expect(bookingLink()).not.toHaveClass("hide");

    fireEvent.click(menuButton());
    expect(bookingLink()).toHaveClass("hide");

    fireEvent.click(menuButton());
    fireEvent.click(bookingLink());

    expect(mockSetConfirmation).toHaveBeenCalledTimes(1);
    expect(mockSetConfirmation).toHaveBeenCalledWith({});
  });
});
