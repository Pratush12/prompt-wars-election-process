import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import VoiceAssistant from '../pages/VoiceAssistant';

describe('VoiceAssistant Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('cycles through voice states', async () => {
    render(<VoiceAssistant t={{}} />);
    
    const micBtn = screen.getByLabelText(/Start Listening/i);
    
    // Start listening
    await act(async () => {
      fireEvent.click(micBtn);
    });

    expect(screen.getByText(/listening/i)).toBeInTheDocument();

    // Fast-forward timers to trigger the setTimeout inside startListening
    await act(async () => {
      vi.runAllTimers();
    });
    
    // After timers run, the async gemini response should be processing
    // and eventually resolving. Since it's a mocked resolved promise,
    // we should see the result. If not immediate, wait for it.

    expect(await screen.findByText(/Response From VoteSaathi/i)).toBeInTheDocument();
  });
});
