import axios from 'axios';

import { fireEvent, render, screen } from '@testing-library/react';

import App from './app';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('App Component', () => {
  it('renders search input', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Enter User Name/i);
    expect(input).toBeInTheDocument();
  });

  it('search user and display results', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        items: [{ id: 1, login: 'doni', repos_url: 'https://api.github.com/users/doni/repos' }],
      },
    });

    render(<App />);
    const input = screen.getByPlaceholderText(/Enter User Name/i);

    fireEvent.change(input, { target: { value: 'doni' } });

    expect(await screen.findByText('doni')).toBeInTheDocument();
  });

  it('expand user and load repos', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({
        data: {
          items: [{ id: 1, login: 'doni', repos_url: 'https://api.github.com/users/doni/repos' }],
        },
      })
      .mockResolvedValueOnce({
        data: [{ id: 101, name: 'my-repo', description: 'test repo', stargazers_count: 5 }],
      });

    render(<App />);
    const input = screen.getByPlaceholderText(/Enter User Name/i);

    fireEvent.change(input, { target: { value: 'doni' } });

    const user = await screen.findByText('doni');
    fireEvent.click(user);

    const repo = await screen.findByText('my-repo');
    expect(repo).toBeInTheDocument();
  });
});
