import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import VoiceAssistant from '../pages/VoiceAssistant';

describe('VoiceAssistant Component', () => {
  const t = { voiceAsst: 'Voice Assistant' };

  it('cycles through voice states', async () => {
    vi.useFakeTimers();
    render(<VoiceAssistant t={t} />);

    const micBtn = screen.getByLabelText(/Start Listening/i);
    fireEvent.click(micBtn);

    // Should be in Listening phase
    expect(screen.getByText(/Listening/i)).toBeInTheDocument();

    // Advance 3s -> Processing
    act(() => {
      vi.advanceTimersByTime(3001);
    });
    expect(screen.getByText(/Mera polling booth kaha hai/i)).toBeInTheDocument();

    // Advance 2s more -> Speaking
    act(() => {
      vi.advanceTimersByTime(2001);
    });
    expect(screen.getByText(/Aapka polling booth St. Mary/i)).toBeInTheDocument();
    expect(screen.getByText(/AI Voice Assistant/i)).toBeInTheDocument();

    // Test stop listening
    fireEvent.click(screen.getByRole('button', { name: '' }));
    vi.useRealTimers();
  });
});
