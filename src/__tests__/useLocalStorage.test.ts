import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../hooks/useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear();
  });

  it('should initialize with default value when no value in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'));
    expect(result.current[0]).toBe('default-value');
  });

  it('should initialize with value from localStorage', () => {
    window.localStorage.setItem('test-key', JSON.stringify('stored-value'));
    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'));
    expect(result.current[0]).toBe('stored-value');
  });

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'));

    act(() => {
      result.current[1]('new-value');
    });

    expect(result.current[0]).toBe('new-value');
    expect(window.localStorage.getItem('test-key')).toBe(JSON.stringify('new-value'));
  });

  it('should handle complex objects', () => {
    const initialValue = { name: 'London', isPinned: false };
    const { result } = renderHook(() => useLocalStorage('test-key', initialValue));

    act(() => {
      result.current[1]({ ...initialValue, isPinned: true });
    });

    expect(result.current[0]).toEqual({ name: 'London', isPinned: true });
    expect(window.localStorage.getItem('test-key')).toBe(
      JSON.stringify({ name: 'London', isPinned: true })
    );
  });

  it('should handle function updates', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 0));

    act(() => {
      result.current[1]((prev: number) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
    expect(window.localStorage.getItem('test-key')).toBe('1');
  });

  it('should handle errors gracefully', () => {
    // Mock localStorage.getItem to throw an error
    const originalGetItem = window.localStorage.getItem;
    window.localStorage.getItem = jest.fn(() => {
      throw new Error('Storage error');
    });

    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'));
    expect(result.current[0]).toBe('default-value');

    // Restore original getItem
    window.localStorage.getItem = originalGetItem;
  });
}); 