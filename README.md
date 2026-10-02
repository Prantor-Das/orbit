# Orbit

## UI customization

- **Fonts and colors:** edit `app/globals.css`. `--font-sans` controls the application font; `--ui-font-mono` controls monospace text. Figtree is loaded through `next/font` and exposed as `--font-figtree`. For another webfont, load it through `@font-face` or `next/font` and reference it in `--font-sans`.
- **shadcn / tweakcn themes:** replace the standard color tokens in `:root` and `.dark` in `app/globals.css`. The workspace uses `--sidebar-*`, `--background`, `--foreground`, and other semantic tokens. Keep the custom font, avatar, provider, and width variables when pasting a theme.
- **Branding, icons, and agents:** edit `lib/constants/ui.tsx`. Change `UI.name`, labels, `UI.logo`, and `UI.icons`. Set an asset's `src` to `/your-logo.svg` (stored under `public/`) or change its icon component. Inline provider SVG definitions also live in this file.
- **Agent avatars:** edit `SAMPLE_AGENTS`. Set `image` for your own image/SVG, or `icon` for a Lucide avatar. Default icon colors use the `--agent-*-background` / `--agent-*-foreground` variables in `globals.css`. External image files keep their own colors; edit the file to recolor them.
- **Sidebar width:** edit `--orbit-sidebar-width` in `globals.css`.

`AppSidebar` also accepts an `agents` prop for real user-owned agent data. The current list and workspace destinations are placeholders.

## Formatting

```sh
pnpm install
pnpm format
pnpm format:check
```

Prettier rules live in `.prettierrc.json`; generated files and environment files are excluded by `.prettierignore`. `.editorconfig` keeps basic editor settings consistent.

The `prepare` script installs Husky's hooks on dependency installation. Each normal Git commit runs `.husky/pre-commit`, which invokes lint-staged and Prettier. Only staged files are formatted, and formatting is automatically included in the commit. lint-staged preserves unstaged edits, including partially staged files. Formatting failures block the commit.

After cloning, run `pnpm install` to activate hooks. Git clients must have Node and pnpm available in their environment. Hooks can be skipped explicitly with `HUSKY=0` or `git commit --no-verify`.
