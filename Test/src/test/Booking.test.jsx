import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingInfo from '../components/BookingInfo/BookingInfo';
import { beforeEach, test, expect, vi } from 'vitest';


const updateBookingDetails = vi.fn();

beforeEach(() => {
  render(<BookingInfo updateBookingDetails={updateBookingDetails} />);
});

test('renders BookingInfo component', () => {

  expect(screen.getByRole('heading', { level: 2, name: /When, WHAT & Who/i })).toBeInTheDocument();

 
  expect(screen.getByText(/Date/i).nextElementSibling).toHaveAttribute('type', 'date');
  expect(screen.getByText(/Time/i).nextElementSibling).toHaveAttribute('type', 'time');
  expect(screen.getByText(/Number of awesome bowlers/i).nextElementSibling).toHaveAttribute('type', 'number');
  expect(screen.getByText(/Number of lanes/i).nextElementSibling).toHaveAttribute('type', 'number');
});

test('updates booking details when date is changed in BookingInfo', () => {
  fireEvent.change(screen.getByText(/Date/i).nextElementSibling, { target: { value: '2020-02-21' } });
  expect(updateBookingDetails).toHaveBeenCalledWith(expect.any(Object));
});

test('updates booking details when time is changed in BookingInfo', () => {
  fireEvent.change(screen.getByText(/Time/i).nextElementSibling, { target: { value: '12:00' } });
  expect(updateBookingDetails).toHaveBeenCalledWith(expect.any(Object));
});

test('updates booking details when number of awesome bowlers is changed in BookingInfo', () => {
  fireEvent.change(screen.getByText(/Number of awesome bowlers/i).nextElementSibling, { target: { value: '6' } });
  expect(updateBookingDetails).toHaveBeenCalledWith(expect.any(Object));
});

test('updates booking details when number of lanes is changed in BookingInfo', () => {
  fireEvent.change(screen.getByText(/Number of lanes/i).nextElementSibling, { target: { value: '3' } });
  expect(updateBookingDetails).toHaveBeenCalledWith(expect.any(Object));
});