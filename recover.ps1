Write-Host "Running pnpm install..."
pnpm install
Write-Host "Running pnpm lint..."
pnpm --filter frontend lint
Write-Host "Running pnpm build..."
pnpm --filter frontend build
