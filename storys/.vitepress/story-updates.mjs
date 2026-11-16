import { execFileSync } from 'node:child_process'
import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

/*
  Build-time "latest chapter" manifest.

  For every story folder in storys/ we look at the git history of its .md
  files and record the author timestamp of the newest commit. The result is
  injected into themeConfig.storyUpdates, so the browser can compare it with
  what each reader has already seen (stored in their localStorage).

  A commit whose subject contains NO_NOTIFY_MARKER is ignored, so typo fixes
  and config tweaks don't light up the status light for followers.
*/

export const NO_NOTIFY_MARKER = '[no-notify]'

const repoRoot = fileURLToPath(new URL('../..', import.meta.url))
const storysDir = fileURLToPath(new URL('..', import.meta.url))

function storyFolders() {
  return readdirSync(storysDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('.') && d.name !== 'public')
    .map((d) => d.name)
}

function latestCommit(folder) {
  const out = execFileSync(
    'git',
    ['log', '--format=%at%x09%s', '--', `:(glob)storys/${folder}/**/*.md`],
    { cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
  )
  for (const line of out.split('\n')) {
    if (!line) continue
    const [time, ...rest] = line.split('\t')
    const subject = rest.join('\t')
    if (subject.includes(NO_NOTIFY_MARKER)) continue
    return { time: Number(time), subject }
  }
  return null
}

/** @returns {Record<string, { time: number, subject: string }>} keyed by story folder name */
export function getStoryUpdates() {
  const updates = {}
  try {
    for (const folder of storyFolders()) {
      const latest = latestCommit(folder)
      if (latest) updates[folder] = latest
    }
  } catch (err) {
    console.warn('[story-updates] could not read git history, follow lights disabled:', err.message)
  }
  return updates
}
