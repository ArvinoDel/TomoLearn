import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import CountdownTimer from '../CountdownTimer';
import FakeTimers from '@sinonjs/fake-timers';

afterEach(() => {
  cleanup();
});

function useFakeTimers() {
  return FakeTimers.install();
}

describe('CountdownTimer', () => {
  test('timer counts down correctly', () => {
    const clock = useFakeTimers();
    render(<CountdownTimer initialTime={10} />);

    expect(screen.getByText('00:10')).toBeInTheDocument();

    act(() => {
      clock.tick(3000); // advance 3 seconds
    });

    expect(screen.getByText('00:07')).toBeInTheDocument();
    clock.uninstall();
  });

  test('shows warning styling under five minutes', () => {
    const clock = useFakeTimers();
    render(<CountdownTimer initialTime={301} />);

    const timeDisplay = screen.getByText('05:01');
    expect(timeDisplay).toHaveClass('text-blue-600');

    act(() => {
      clock.tick(1000); // move to 5 minutes remaining
    });

    expect(screen.getByText('05:00')).toHaveClass('text-orange-600');
    clock.uninstall();
  });

  test('handles initialTime <= 0 without NaN progress', () => {
    render(<CountdownTimer initialTime={0} />);

    expect(screen.getByText('00:00')).toBeInTheDocument();
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-valuenow', '100');
    expect(progress.getAttribute('aria-valuenow')).not.toBe('NaN');
  });
});

