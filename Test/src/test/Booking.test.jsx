import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from '../mocks/handlers';
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import Booking from '../views/Booking';

const mockApiServer = setupServer(...handlers);

beforeAll(() => mockApiServer.listen());
afterEach(() => mockApiServer.resetHandlers());
afterAll(() => mockApiServer.close());

describe('Booking System Validation', () => {
  it('verifies mock booking data from API response', async () => {
    const apiResponse = await fetch('https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'initiate' }),
    });

    const bookingData = await apiResponse.json();

    expect(apiResponse.status).toBe(201);
    expect(bookingData).toEqual(
      expect.objectContaining({
        when: '2024-06-06T12:00',
        lanes: '1',
        people: '1',
        shoes: ['42'],
        price: 220,
        id: 'STR2101YPJD',
        active: true,
      })
    );
  });

  it('completes a booking and validates confirmation details', async () => {
    render(<Booking />);

    fireEvent.change(screen.getByTestId('Date'), { target: { value: '2024-05-31' } });
    fireEvent.change(screen.getByTestId('Time'), { target: { value: '11:30' } });
    fireEvent.change(screen.getByTestId('Number of lanes'), { target: { value: '1' } });
    fireEvent.change(screen.getByTestId('Number of awesome bowlers'), { target: { value: '1' } });

    const addShoeButton = screen.getByRole('button', { name: '+' });
    fireEvent.click(addShoeButton);

    const shoeSizeInput = await waitFor(() => screen.getByTestId('Shoe size / person 1'));
    fireEvent.change(shoeSizeInput, { target: { value: '40' } });

    await waitFor(() => {
      const confirmBookingButton = screen.getByRole('button', { name: /strIIIIIike!/i });
      expect(confirmBookingButton).toBeEnabled();
      fireEvent.click(confirmBookingButton);
    });

    const bookingNumber = await waitFor(() => screen.getByTestId('Booking number').value);

    const totalPrice = screen.getByRole('article', {
      class: 'confirmation__price',
    });

    expect(bookingNumber).toBe('STR2101YPJD');
    expect(totalPrice).toHaveTextContent('Total:220 sek');
  });
});