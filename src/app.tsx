import { type ChangeEvent, useState } from 'react';

import axios from 'axios';
import { ChevronDown } from 'lucide-react';
import { toast } from 'react-toastify';

import { Input } from '@component/input';
import Loading from '@component/loading';
import { cn } from '@util/tn-merge';

import { useDebounce } from './hooks/use-debounce';
import type { GitData, GitRepo } from './types';

const TOKEN = import.meta.env.VITE_API_KEY;

function App() {
  const debouncedSearch = useDebounce((value: string) => {
    fetchUsers(value);
  }, 500);

  const [openIndex, setOpenIndex] = useState<number>();
  const [results, setResults] = useState<GitData[]>([]);
  const [loading, setLoading] = useState({
    user: false,
    repo: false,
  });
  const [repos, setRepos] = useState<{ [ID: string]: GitRepo[] }>({});

  async function fetchUsers(q: string) {
    try {
      setLoading(prev => ({ ...prev, user: true }));

      const url = `https://api.github.com/search/users?q=${encodeURIComponent(q)}+in:login&per_page=5`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `token ${TOKEN}`,
        },
      });

      setResults(res.data.items);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(prev => ({ ...prev, user: false }));
    }
  }
  async function fetchRepos(url: string, id: number) {
    try {
      setLoading(prev => ({ ...prev, repo: true }));
      const res = await axios.get(url, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${TOKEN}`,
        },
      });

      setRepos(prev => ({ ...prev, [id]: res.data }));
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(prev => ({ ...prev, repo: false }));
    }
  }

  const handleCLick = async (i: number) => {
    if (i === openIndex) {
      setOpenIndex(undefined);
      return;
    }

    const { id, repos_url } = results[i];
    setOpenIndex(i);
    if (!repos[id]) {
      await fetchRepos(repos_url, id);
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div className="h-full w-full space-y-4 overflow-auto bg-white p-6 max-sm:p-2">
      <Input placeholder="Enter User Name" onChange={handleSearch} />
      <div className="flex flex-col gap-2">
        {loading.user && <Loading />}
        {results.map((item, i) => (
          <div key={i}>
            <header
              className="flex cursor-pointer items-center justify-between bg-gray-200 px-3 py-2 select-none"
              onClick={() => handleCLick(i)}
            >
              <p className="text-lg">{item.login}</p>
              <ChevronDown className={cn(i === openIndex && 'rotate-180')} />
            </header>
            <section className={cn(i === openIndex ? 'block' : 'hidden', 'space-y-2 p-4')}>
              {loading.repo && <Loading />}
              {repos[item.id]?.map(item => (
                <div key={item.id} className="flex gap-2 bg-gray-300 p-2">
                  <div className="flex-1 overflow-hidden">
                    <h1 className="truncate text-sm font-bold">{item.name}</h1>
                    <p className="overflow-hidden text-sm">{item.description ?? '-'}</p>
                  </div>
                  <div className="space-x-2">
                    {item.stargazers_count}
                    <i className="fa-solid fa-star ms-2"></i>
                  </div>
                </div>
              ))}
            </section>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
