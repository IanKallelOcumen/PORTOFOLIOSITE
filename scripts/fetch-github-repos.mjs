import fs from 'node:fs';
import path from 'node:path';

const USERNAME = process.env.GITHUB_USERNAME || 'IanKallelOcumen';
const OUT_FILE = path.resolve(process.cwd(), 'public', 'github-repos.json');
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';

async function main() {
  const url = `https://api.github.com/users/${encodeURIComponent(USERNAME)}/repos?per_page=100&sort=updated`;

  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'portfolio-site-repo-fetch',
  };

  if (TOKEN) {
    headers.Authorization = `Bearer ${TOKEN}`;
  }

  const res = await fetch(url, { headers });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`GitHub API error (${res.status}): ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error('Unexpected GitHub API response (expected array).');
  }

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(data, null, 2), 'utf-8');

  console.log(`Saved ${data.length} repos -> ${OUT_FILE}`);
  console.log('Tip: commit public/github-repos.json so GitHub Pages does not hit the API (avoids rate limits).');
}

main().catch((err) => {
  console.error(err?.stack || String(err));
  process.exit(1);
});

