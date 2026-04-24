import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Welcome from '../pages/Welcome';

const MockWelcome = ({ t }) => (
  <BrowserRouter>
    <Welcome t={t} />
  </BrowserRouter>
);

describe('Welcome Component', () => {
  const t = { welcome: 'Welcome', tagline: 'Tagline', getStarted: 'Get Started' };

  it('enables Get Started only when district is entered', () => {
    render(<MockWelcome t={t} />);
    
    const btn = screen.getByLabelText(/Start Voting Assistant/i);
    expect(btn).toBeDisabled();

    const input = screen.getByPlaceholderText(/Enter District/i);
    fireEvent.change(input, { target: { value: 'Bengaluru' } });
    
    expect(btn).not.toBeDisabled();
    fireEvent.click(btn);
  });

  it('renders language options', () => {
    render(<MockWelcome t={t} />);
    expect(screen.getByText('Hindi')).toBeInTheDocument();
    expect(screen.getByText('Kannada')).toBeInTheDocument();
  });
});
