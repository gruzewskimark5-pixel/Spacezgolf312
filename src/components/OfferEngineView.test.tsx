import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OfferEngineView } from './OfferEngineView';

describe('OfferEngineView Component', () => {
  it('renders the main header and description', () => {
    render(<OfferEngineView />);
    expect(screen.getByText('Offer Engine Money Layer')).toBeInTheDocument();
    expect(screen.getByText(/Turns intelligence signals into concrete, disciplined offers/i)).toBeInTheDocument();
  });

  it('renders all signal input levels', () => {
    render(<OfferEngineView />);
    expect(screen.getByText('Property-Level')).toBeInTheDocument();
    expect(screen.getByText('Owner-Level')).toBeInTheDocument();
    expect(screen.getByText('Geo-Level')).toBeInTheDocument();
    expect(screen.getByText('Global / Fund')).toBeInTheDocument();
  });

  it('renders all core formula headings', () => {
    render(<OfferEngineView />);
    expect(screen.getByText('1. Base MAO')).toBeInTheDocument();
    expect(screen.getByText('2. Risk Buffer')).toBeInTheDocument();
    expect(screen.getByText('3. Liquidity & Competition Adjustment')).toBeInTheDocument();
    expect(screen.getByText('4. Final Offer Band')).toBeInTheDocument();
  });

  it('renders all agent protocol steps', () => {
    render(<OfferEngineView />);
    expect(screen.getByText('1. Load Context')).toBeInTheDocument();
    expect(screen.getByText('2. Compute MAO + Offer Band')).toBeInTheDocument();
    expect(screen.getByText('3. Classify Outcome')).toBeInTheDocument();
    expect(screen.getByText('4. Emit Offer Decision')).toBeInTheDocument();
    expect(screen.getByText('5. Write to CPO')).toBeInTheDocument();
  });

  it('renders all classification categories', () => {
    render(<OfferEngineView />);
    expect(screen.getByText('NO-GO')).toBeInTheDocument();
    expect(screen.getByText('SOFT OFFER')).toBeInTheDocument();
    expect(screen.getByText('HARD OFFER')).toBeInTheDocument();
  });

  it('renders API surface documentation', () => {
    render(<OfferEngineView />);
    expect(screen.getByText('/offers/suggestions?property_id=...')).toBeInTheDocument();
    expect(screen.getByText('/offers/lock-in')).toBeInTheDocument();
  });

  it('renders the capital alignment section', () => {
    render(<OfferEngineView />);
    expect(screen.getByText('Capital Alignment')).toBeInTheDocument();
    expect(screen.getByText(/At the portfolio level, the Offer Engine Agent respects per-market capital caps/i)).toBeInTheDocument();
  });
});
