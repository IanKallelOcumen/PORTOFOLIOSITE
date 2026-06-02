import { ExternalLink, GitBranch, Github, Star } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Card } from './Card';
import { Tag } from './Tag';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  homepage: string | null;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
}

function normalizeUrl(url: string) {
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function humanizeRepoName(name: string) {
  // Convert "StressBuster" -> "Stress Buster", "my-repo_name" -> "my repo name"
  const withSpaces = name
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();
  return withSpaces || name;
}

const TITLE_OVERRIDES: Record<string, string> = {
  'pitstop-panic-unity': 'Zero Breakdown',
};

const DESCRIPTION_OVERRIDES: Record<string, string> = {
  lakbaytala:
    '2D side-scroller mobile game inspired by mythological stories and history in Laguna.',
  stressbuster: 'Mobile app designed to help users cope with stress.',
  cogniville:
    'Educational quiz tool for teachers and students (general knowledge: Science, Math, English, Filipino).',
  bayanihan:
    '2D game inspired by Hill Climb Racing and the Filipino bayanihan tradition of moving houses.',
  'pitstop-panic-unity':
    'Mechanic-themed 2D game (Zero Breakdown) that teaches basic motorcycle and car maintenance knowledge.',
  blinkgame:
    'Web-based horror game featuring a Weeping Angel enemy and a Blink Mechanic.',
};

function fallbackDescription(repo: GitHubRepo) {
  const override = DESCRIPTION_OVERRIDES[repo.name.toLowerCase()];
  if (override) return override;
  if (repo.description?.trim()) return repo.description.trim();
  const title = humanizeRepoName(repo.name);
  const lang = repo.language ? ` built with ${repo.language}` : '';
  return `${title} — a personal project repository${lang}.`;
}

export function GitHubProjects({
  username,
  excludeRepos = [],
  mousePosition,
}: {
  username: string;
  excludeRepos?: string[];
  mousePosition: { x: number; y: number };
}) {
  const [repos, setRepos] = useState<GitHubRepo[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setError(null);
      setRepos(null);

      try {
        // Prefer a pre-generated static file to avoid GitHub API rate limits (recommended for GitHub Pages).
        try {
          const staticRes = await fetch('/github-repos.json', {
            signal: controller.signal,
            cache: 'no-store',
            headers: { Accept: 'application/json' },
          });
          if (staticRes.ok) {
            const staticData = (await staticRes.json()) as GitHubRepo[];
            if (Array.isArray(staticData) && staticData.length > 0) {
              setRepos(staticData);
              return;
            }
          }
        } catch {
          // ignore and fall back to live API
        }

        const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`;
        const res = await fetch(url, {
          signal: controller.signal,
          headers: {
            Accept: 'application/vnd.github+json',
          },
        });

        if (!res.ok) {
          throw new Error(`GitHub API error (${res.status})`);
        }

        const data = (await res.json()) as GitHubRepo[];
        setRepos(data);
      } catch (e: any) {
        if (e?.name === 'AbortError') return;
        setError(e?.message ?? 'Failed to load GitHub projects');
      }
    }

    load();
    return () => controller.abort();
  }, [username]);

  const filtered = useMemo(() => {
    if (!repos) return [];
    const exclude = new Set(excludeRepos.map((r) => r.toLowerCase()));

    return repos
      .filter((r) => !r.fork && !r.archived)
      .filter((r) => !exclude.has(r.name.toLowerCase()))
      .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
  }, [repos, excludeRepos]);

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">GITHUB PROJECTS</h2>
          <p className="text-xs text-[#888] mt-1">
            Auto-loaded from github.com/{username}
          </p>
        </div>
        <a
          href={`https://github.com/${username}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:border-[#ccff00]/60 hover:text-[#ccff00] transition-colors"
        >
          View all on GitHub <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {error && (
        <div className="text-sm text-[#ff6b6b] bg-white/5 border border-white/10 rounded-xl p-4">
          {error}
        </div>
      )}

      {!error && repos === null && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} mousePosition={mousePosition} className="min-h-[260px]">
              <div className="animate-pulse">
                <div className="h-28 bg-white/10 rounded-lg mb-4" />
                <div className="h-4 bg-white/10 rounded w-2/3 mb-3" />
                <div className="h-3 bg-white/10 rounded w-full mb-2" />
                <div className="h-3 bg-white/10 rounded w-5/6 mb-4" />
                <div className="flex gap-2">
                  <div className="h-6 bg-white/10 rounded w-20" />
                  <div className="h-6 bg-white/10 rounded w-16" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!error && repos !== null && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((repo) => {
            const liveLink = repo.homepage?.trim() ? normalizeUrl(repo.homepage) : '';
            const title = TITLE_OVERRIDES[repo.name.toLowerCase()] ?? humanizeRepoName(repo.name);

            return (
              <Card key={repo.id} mousePosition={mousePosition} className="min-h-[260px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="text-lg font-bold leading-tight">{title}</h3>
                      <div className="text-xs text-[#777] mt-1">
                        Updated {formatDate(repo.updated_at)}
                      </div>
                    </div>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded hover:bg-white/5 transition-colors"
                      aria-label="Open GitHub repository"
                      title="Open GitHub repository"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4 text-[#777] flex-shrink-0 mt-1" />
                    </a>
                  </div>

                  <p className="text-sm text-[#aaa] leading-relaxed line-clamp-3 min-h-[60px]">
                    {fallbackDescription(repo)}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    {repo.language && <Tag className="text-xs">{repo.language}</Tag>}
                    <Tag className="text-xs">
                      <Star className="w-3.5 h-3.5" /> {repo.stargazers_count}
                    </Tag>
                    <Tag className="text-xs">
                      <GitBranch className="w-3.5 h-3.5" /> {repo.forks_count}
                    </Tag>
                    {liveLink && <Tag className="text-xs">Live</Tag>}
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:border-[#ccff00]/60 hover:text-[#ccff00] transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                    {liveLink && (
                      <a
                        href={liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-[#ccff00]/10 border border-[#ccff00]/30 rounded-lg text-sm hover:bg-[#ccff00] hover:text-[#050505] hover:border-[#ccff00] transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
