import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ReadyToVote from '../pages/ReadyToVote';

describe('ReadyToVote Component', () => {
  const t = { readyToVote: 'Am I Ready to Vote?' };

  it('renders correctly and handles the wizard flow', async () => {
    render(<ReadyToVote t={t} />);

    // Step 1: Age
    expect(screen.getByText(/Are you 18 years or older/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Yes/i));

    // Step 2: Voter ID
    expect(screen.getByText(/Do you have a Voter ID/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Yes/i));

    // Step 3: Roll
    expect(screen.getByText(/Is your name in the Voter Roll/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/No/i));

    // Step 4: Address
    expect(screen.getByText(/Is your address updated/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Yes/i));

    // Step 5: Booth
    expect(screen.getByText(/Do you know your polling booth/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Yes/i));

    // Results screen
    expect(screen.getByText(/80%/i)).toBeInTheDocument();
    expect(screen.getByText(/Needs Action/i)).toBeInTheDocument();

    const portalBtn = screen.getByText(/Open Portal to Finish/i);
    fireEvent.click(portalBtn);
  });

  it('handles 100% score correctly', async () => {
    render(<ReadyToVote t={t} />);
    
    // Fast forward to end with all Yes
    for (let i = 0; i < 5; i++) {
      fireEvent.click(screen.getByText(/Yes/i));
    }
    // Results screen
    expect(await screen.findByText(/100%/i)).toBeInTheDocument();
    expect(screen.getByText(/Ready to Vote!/i)).toBeInTheDocument();
  });
});
