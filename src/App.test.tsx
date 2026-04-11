import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock the child components to simplify App testing
vi.mock('./components/ArchitectureGraph', () => ({
  ArchitectureGraph: () => <div data-testid="architecture-graph">Architecture Graph Component</div>,
}));
vi.mock('./components/PipelinesTable', () => ({
  PipelinesTable: () => <div data-testid="pipelines-table">Pipelines Table Component</div>,
}));
vi.mock('./components/CpoSchema', () => ({
  CpoSchema: () => <div data-testid="cpo-schema">CPO Schema Component</div>,
}));
vi.mock('./components/AgentsView', () => ({
  AgentsView: () => <div data-testid="agents-view">Agents View Component</div>,
}));
vi.mock('./components/OfferEngineView', () => ({
  OfferEngineView: () => <div data-testid="offer-engine-view">Offer Engine View Component</div>,
}));

describe('App Component', () => {
  it('renders the sidebar with the correct title', () => {
    render(<App />);
    expect(screen.getByText('REI Engine')).toBeInTheDocument();
  });

  it('renders all navigation tabs', () => {
    render(<App />);
    expect(screen.getByText('Execution Graph')).toBeInTheDocument();
    expect(screen.getByText('Pipelines')).toBeInTheDocument();
    expect(screen.getByText('CPO Schema')).toBeInTheDocument();
    expect(screen.getByText('AI Agents')).toBeInTheDocument();
    expect(screen.getByText('Offer Engine')).toBeInTheDocument();
  });

  it('initially renders the Execution Graph tab content', () => {
    render(<App />);
    // Header should show the active tab label
    expect(screen.getByRole('heading', { name: /Execution Graph/i })).toBeInTheDocument();
    // Content should be the Execution Graph
    expect(screen.getByTestId('architecture-graph')).toBeInTheDocument();
  });

  it('switches content when a different tab is clicked', async () => {
    render(<App />);

    // Click on Pipelines tab
    const pipelinesTab = screen.getByText('Pipelines');
    fireEvent.click(pipelinesTab);

    // Header should update
    expect(screen.getByRole('heading', { name: /Pipelines/i })).toBeInTheDocument();
    // Content should update
    expect(screen.getByTestId('pipelines-table')).toBeInTheDocument();
    // Previous content should be gone
    expect(screen.queryByTestId('architecture-graph')).not.toBeInTheDocument();
  });

  it('switches to AI Agents tab and back', () => {
    render(<App />);

    // Switch to AI Agents
    fireEvent.click(screen.getByText('AI Agents'));
    expect(screen.getByRole('heading', { name: /AI Agents/i })).toBeInTheDocument();
    expect(screen.getByTestId('agents-view')).toBeInTheDocument();

    // Switch back to Execution Graph
    fireEvent.click(screen.getByText('Execution Graph'));
    expect(screen.getByRole('heading', { name: /Execution Graph/i })).toBeInTheDocument();
    expect(screen.getByTestId('architecture-graph')).toBeInTheDocument();
  });

  it('displays the SYSTEM ONLINE status', () => {
    render(<App />);
    expect(screen.getByText('SYSTEM ONLINE')).toBeInTheDocument();
  });
});
