import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Redux Store heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Redux Store/i);
  expect(headingElement).toBeInTheDocument();
});
