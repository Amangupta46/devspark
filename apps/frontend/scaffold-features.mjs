import fs from "fs";
import path from "path";

const rootDir = path.join(process.cwd(), "apps", "frontend", "src", "features");
const features = [
  "crm",
  "projects",
  "quotes",
  "finance",
  "team",
  "client",
  "notifications",
  "analytics",
  "settings",
];
const subfolders = [
  "components",
  "hooks",
  "services",
  "schemas",
  "constants",
  "utils",
  "types",
  "mappers",
];

const boilerplate = {
  types: (mod) => `// DTO: Exact shape from the backend Django API
export interface ${mod.charAt(0).toUpperCase() + mod.slice(1)}DTO {
  id: string;
  created_at: string;
}

// UI Model: The shape the React components consume
export interface ${mod.charAt(0).toUpperCase() + mod.slice(1)}UI {
  id: string;
  createdAt: Date;
}
`,
  mappers: (
    mod,
  ) => `import { ${mod.charAt(0).toUpperCase() + mod.slice(1)}DTO, ${mod.charAt(0).toUpperCase() + mod.slice(1)}UI } from '../types';

export function map${mod.charAt(0).toUpperCase() + mod.slice(1)}(dto: ${mod.charAt(0).toUpperCase() + mod.slice(1)}DTO): ${mod.charAt(0).toUpperCase() + mod.slice(1)}UI {
  return {
    id: dto.id,
    createdAt: new Date(dto.created_at)
  };
}
`,
  schemas: (mod) => `// Placeholder Zod schema for form validation
// import { z } from 'zod';
export const ${mod}Schema = {}; // z.object({ id: z.string() })
`,
  services: (mod) => `// Placeholder Axios API Service
export const ${mod}Service = {
  getAll: async () => {
    // const response = await axios.get('/api/${mod}');
    // return response.data;
    return [];
  }
};
`,
  hooks: (mod) => `// Placeholder React Query Hook
// import { useQuery } from '@tanstack/react-query';
import { ${mod}Service } from '../services';

export function use${mod.charAt(0).toUpperCase() + mod.slice(1)}() {
  /*
  return useQuery({
    queryKey: ['${mod}'],
    queryFn: ${mod}Service.getAll
  });
  */
  return { data: [], isLoading: false };
}
`,
  components: (mod) => `import React from 'react';
import { use${mod.charAt(0).toUpperCase() + mod.slice(1)} } from '../hooks';

export function ${mod.charAt(0).toUpperCase() + mod.slice(1)}View() {
  const { data, isLoading } = use${mod.charAt(0).toUpperCase() + mod.slice(1)}();
  
  if (isLoading) return <div>Loading ${mod}...</div>;
  return <div>${mod.charAt(0).toUpperCase() + mod.slice(1)} Feature Ready</div>;
}
`,
  constants: (mod) => `export const ${mod.toUpperCase()}_STATUS = {
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED'
} as const;
`,
  utils: (
    mod,
  ) => `export function format${mod.charAt(0).toUpperCase() + mod.slice(1)}Name(name: string) {
  return name.trim();
}
`,
};

function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

features.forEach((mod) => {
  const modPath = path.join(rootDir, mod);
  ensureDirSync(modPath);

  subfolders.forEach((sub) => {
    const subPath = path.join(modPath, sub);
    ensureDirSync(subPath);

    // Create one boilerplate file per folder
    const ext = sub === "components" ? "tsx" : "ts";
    const filename =
      sub === "components"
        ? `${mod.charAt(0).toUpperCase() + mod.slice(1)}View.tsx`
        : `index.${ext}`;

    fs.writeFileSync(path.join(subPath, filename), boilerplate[sub](mod));
  });
});

console.log(
  `Successfully scaffolded ${features.length} features with ${subfolders.length} architectural layers each.`,
);
