import fs from 'fs';
import path from 'path';

const rootDir = path.join(process.cwd(), 'apps', 'frontend', 'src', 'core');

const structure = {
  auth: ['CurrentUser.ts', 'Permissions.ts', 'Roles.ts', 'Session.ts', 'Guards.ts'],
  config: ['Environment.ts', 'FeatureFlags.ts', 'ApplicationConfig.ts', 'BrandConfig.ts'],
  providers: ['ThemeProvider.tsx', 'QueryProvider.tsx', 'AuthProvider.tsx', 'NotificationProvider.tsx', 'CommandPaletteProvider.tsx'],
  contexts: ['UserContext.tsx', 'OrganizationContext.tsx', 'WorkspaceContext.tsx', 'ThemeContext.tsx'],
  stores: ['GlobalUIStore.ts', 'SidebarStore.ts', 'ThemeStore.ts', 'CommandPaletteStore.ts', 'NotificationStore.ts'],
  navigation: ['SidebarConfig.ts', 'TopNavigation.ts', 'BreadcrumbGenerator.ts', 'RouteRegistry.ts', 'ModuleRegistry.ts'],
  permissions: ['PermissionRegistry.ts', 'RoleRegistry.ts', 'PermissionHelpers.ts'],
  constants: ['Routes.ts', 'Roles.ts', 'Permissions.ts', 'Currencies.ts', 'Countries.ts', 'Locales.ts', 'Timezones.ts'],
  hooks: ['useCurrentUser.ts', 'usePermission.ts', 'useWorkspace.ts', 'useTheme.ts', 'useSidebar.ts', 'useCommandPalette.ts', 'useBreadcrumb.ts'],
  utils: ['DateUtils.ts', 'CurrencyUtils.ts', 'FileUtils.ts', 'ValidationUtils.ts', 'FormattingUtils.ts', 'ClipboardUtils.ts', 'DownloadUtils.ts', 'UploadUtils.ts'],
  lib: ['Logger.ts', 'EventBusAdapter.ts', 'Storage.ts', 'LocalCache.ts', 'ErrorHelpers.ts', 'RequestHelpers.ts', 'RetryHelpers.ts'],
  errors: ['ApplicationErrors.ts', 'APIErrors.ts', 'ValidationErrors.ts', 'PermissionErrors.ts'],
  types: ['GlobalTypes.ts', 'SharedDTOs.ts', 'ApplicationModels.ts']
};

const boilerplateMap = {
  '.ts': (name) => `// Global Core File: ${name}\n// This is a strictly architectural placeholder.\n\nexport const ${name.replace('.ts', '')} = {};\n`,
  '.tsx': (name) => `import React from 'react';\n\n// Global Core Provider/Context: ${name}\nexport function ${name.replace('.tsx', '')}({ children }: { children: React.ReactNode }) {\n  return <>{children}</>;\n}\n`
};

function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

let fileCount = 0;

Object.entries(structure).forEach(([dir, files]) => {
  const dirPath = path.join(rootDir, dir);
  ensureDirSync(dirPath);
  
  files.forEach(file => {
    const ext = path.extname(file);
    const content = boilerplateMap[ext] ? boilerplateMap[ext](file) : `// Placeholder for ${file}`;
    fs.writeFileSync(path.join(dirPath, file), content);
    fileCount++;
  });
});

console.log(`Successfully scaffolded ${Object.keys(structure).length} core directories and ${fileCount} core files.`);
