import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

describe('App lead capture form', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/?utm_source=google&utm_medium=cpc&utm_campaign=wagholi');
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the key lead capture fields for ad traffic enquiries', () => {
    render(<App />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/i agree to be contacted/i)).toBeInTheDocument();
  });

  it('submits the enquiry to the same-origin lead endpoint with a complete payload', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, leadId: 'lead_123' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    render(<App />);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: 'Suyash Patil' },
    });
    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: '+91 9876543210' },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'suyash@example.com' },
    });
    fireEvent.click(screen.getByLabelText(/i agree to be contacted/i));

    const form = screen.getByLabelText(/full name/i).closest('form');

    expect(form).not.toBeNull();
    fireEvent.submit(form!);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    const [url, options] = fetchMock.mock.calls[0];

    expect(url).toBe('/api/lead');
    expect(options).toEqual(
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    );

    expect(JSON.parse(options.body)).toEqual(
      expect.objectContaining({
        fullName: 'Suyash Patil',
        email: 'suyash@example.com',
        phone: '+91 9876543210',
        companyName: 'Wagholi Highstreet Enquiry',
        companyType: 'other',
        websiteUrl: '',
        serviceInterest: ['commercial-space-enquiry'],
        budgetRange: 'On Request',
        timeline: 'Immediate',
        problemSummary: 'Commercial property enquiry submitted from wagholihighstreet.in.',
        consent: true,
        sourceCta: 'priority-access',
        utmSource: 'google',
        utmMedium: 'cpc',
        utmCampaign: 'wagholi',
      }),
    );
  });
});
