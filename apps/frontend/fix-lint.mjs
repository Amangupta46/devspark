import fs from 'fs';
import path from 'path';

const rootDir = path.join(process.cwd(), 'apps', 'frontend', 'src');

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(filePath));
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      results.push(filePath);
    }
  });
  return results;
}

const allFiles = walkDir(rootDir);

let processedCount = 0;

allFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Fix 1: Remove unused state from page.tsx templates
  if (filePath.includes('page.tsx')) {
    content = content.replace(/import \{ useState \} from "react";\r?\n/g, '');
    content = content.replace(/  const \[activeFilters, setActiveFilters\] = useState\(\{\}\);\r?\n\r?\n/g, '');
  }

  // Fix 2: Remove unused variables in features
  if (filePath.includes('features') && filePath.endsWith('View.tsx')) {
    content = content.replace(/const \{ data, isLoading \} =/g, 'const { isLoading } =');
  }
  if (filePath.includes('features') && filePath.endsWith('hooks\\index.ts')) {
    content = content.replace(/import \{ .*Service \} from '\.\.\/services';\r?\n/g, '');
  }

  // Fix 3: Fix `any` types in Tables
  if (filePath.includes('advanced-table.tsx') || filePath.includes('data-table.tsx') || filePath.includes('page.tsx')) {
    content = content.replace(/accessor: \(row: any\)/g, 'accessor: (row: Record<string, unknown>)');
  }

  // Fix 4: Unused imports in components
  if (filePath.includes('navbar.tsx') || filePath.includes('kanban-board.tsx') || filePath.includes('comment-thread.tsx')) {
    content = content.replace(/import \{ cn \} from "@\/lib\/utils";\r?\n/g, '');
  }
  if (filePath.includes('sidebar.tsx')) {
    content = content.replace(/Bell, Search, /g, '');
  }
  if (filePath.includes('command-palette.tsx')) {
    content = content.replace(/import \{ cn \} from "@\/lib\/utils";\r?\n/g, '');
  }
  if (filePath.includes('filter-panel.tsx')) {
    content = content.replace(/Plus, /g, '');
    content = content.replace(/import \{ useState \} from "react";\r?\n/g, '');
  }
  if (filePath.includes('date-picker.tsx') || filePath.includes('select.tsx')) {
    content = content.replace(/import \{ useState \} from "react";\r?\n/g, '');
  }
  if (filePath.includes('timeline.tsx')) {
    content = content.replace(/\(item, index\)/g, '(item)');
  }
  if (filePath.includes('team\\error.tsx')) {
    content = content.replace(/error: Error;/g, '');
    content = content.replace(/\{ error, reset \}: \{ reset: \(\) => void \}/g, '{ reset }: { reset: () => void }');
    content = content.replace(/\{ error, reset \}: \{ error: Error; reset: \(\) => void \}/g, '{ reset }: { reset: () => void }');
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    processedCount++;
  }
});

console.log(`Successfully cleaned ${processedCount} files, resolving ESLint warnings and errors.`);
