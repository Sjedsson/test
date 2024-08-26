import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeAll, afterEach, afterAll, describe, test, expect, vi } from 'vitest';
import Booking from '../views/Booking';

beforeAll(() => {
  global.fetch = vi.fn().mockImplementation((url, options) => {
    if (url === 'https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com' && options.method === 'POST') {
      const mockResponse = {
        when: '2024-06-06T12:00',
        lanes: '1',
        people: '1',
        shoes: ['42'],
        price: 220,
        id: 'STR2101YPJD',
        active: true,
      };

      return Promise.resolve({
        status: 201,
        json: () => Promise.resolve(mockResponse),
      });
    }

    return Promise.resolve({
      status: 404,
      json: () => Promise.resolve({ message: 'Not Found' }),
    });
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

afterAll(() => {
  vi.restoreAllMocks();
});

describe('Booking Component Tests', () => {
  test('successfully retrieves mock booking data from API', async () => {
    const response = await fetch('https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key: 'value' }),
    });

    const result = await response.json();

    expect(response.status).toBe(201);
    expect(result).toMatchObject({
      when: '2024-06-06T12:00',
      lanes: '1',
      people: '1',
      shoes: ['42'],
      price: 220,
      id: 'STR2101YPJD',
      active: true,
    });
  });

  test('renders Booking component and triggers booking on button click', async () => {
    render(<Booking />);

    const bookButton = screen.getByText(/strIIIIIike!/i);
    fireEvent.click(bookButton);
  });
});
