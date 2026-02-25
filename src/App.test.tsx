import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import App from './App'

const mockTodos = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Todo ${i + 1}`,
  completed: false,
}))

describe('App', () => {
  beforeEach(() => {
    vi.mocked(globalThis.fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    } as Response)
  })

  it('renders the heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /qa workshop/i })).toBeInTheDocument()
  })

  it('verifies checkboxes exist using data-testid', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })

    for (let i = 1; i <= 10; i++) {
      expect(screen.getByTestId(`todo-checkbox-${i}`)).toBeInTheDocument()
    }
  })
})
