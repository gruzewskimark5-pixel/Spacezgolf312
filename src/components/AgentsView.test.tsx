import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AgentsView } from './AgentsView';

describe('AgentsView Component', () => {
  it('renders the component title and description', () => {
    render(<AgentsView />);
    expect(screen.getByText('Event-Driven Agent Consumption')).toBeInTheDocument();
    expect(screen.getByText(/Agents perform actions based on updated intelligence/i)).toBeInTheDocument();
  });

  it('renders all agent names', () => {
    render(<AgentsView />);
    expect(screen.getByText('CRM Agent')).toBeInTheDocument();
    expect(screen.getByText('Offer Engine Agent')).toBeInTheDocument();
    expect(screen.getByText('Capital Agent')).toBeInTheDocument();
    expect(screen.getByText('Learning Loop Agent')).toBeInTheDocument();
    expect(screen.getByText('Alpha / Executive Layer')).toBeInTheDocument();
  });

  it('renders agent action descriptions', () => {
    render(<AgentsView />);
    expect(screen.getByText('Automates outreach, schedules follow-ups')).toBeInTheDocument();
    expect(screen.getByText('Generates offers, pricing recommendations')).toBeInTheDocument();
    expect(screen.getByText('Reallocates funds to high-priority markets')).toBeInTheDocument();
    expect(screen.getByText('Updates model weights for scoring functions')).toBeInTheDocument();
    expect(screen.getByText('Supervises agent activity, defines global objectives, triggers resource allocation')).toBeInTheDocument();
  });

  it('renders subscription tags', () => {
    render(<AgentsView />);
    // Check for some specific subscription tags
    expect(screen.getByText('HIDDENDISTRESSUPDATED')).toBeInTheDocument();
    expect(screen.getByText('OWNERRISKUPDATED')).toBeInTheDocument();
    expect(screen.getAllByText('LIQUIDITYUPDATED').length).toBeGreaterThan(0);
    expect(screen.getByText('All emitted signals')).toBeInTheDocument();
    expect(screen.getByText('Supervisory')).toBeInTheDocument();
  });

  it('renders the scaling strategy section', () => {
    render(<AgentsView />);
    expect(screen.getByText('Nationwide Scaling Strategy')).toBeInTheDocument();
    expect(screen.getByText('Hierarchical Market Nodes')).toBeInTheDocument();
    expect(screen.getByText('PIG Cross-Market Relationships')).toBeInTheDocument();
  });
});
