import fs from 'fs';
import path from 'path';

const rootDir = path.join(process.cwd(), 'apps', 'frontend', 'src', 'features');
const features = fs.readdirSync(rootDir).filter(f => fs.statSync(path.join(rootDir, f)).isDirectory());

let processedCount = 0;

features.forEach(mod => {
  const modCap = mod.charAt(0).toUpperCase() + mod.slice(1);
  
  // 1. Augment Types
  const typesPath = path.join(rootDir, mod, 'types', 'index.ts');
  if (fs.existsSync(typesPath)) {
    let content = fs.readFileSync(typesPath, 'utf8');
    if (!content.includes('RequestDTO')) {
      content += "\nexport interface " + modCap + "RequestDTO extends Partial<" + modCap + "DTO> {}\n";
      content += "export interface " + modCap + "PaginationDTO {\n  page: number;\n  limit: number;\n  total: number;\n}\n";
      content += "export interface " + modCap + "FilterDTO {\n  search?: string;\n  status?: string;\n}\n";
      fs.writeFileSync(typesPath, content);
    }
  }

  // 2. Augment Constants (Query Keys)
  const constPath = path.join(rootDir, mod, 'constants', 'index.ts');
  if (fs.existsSync(constPath)) {
    let content = fs.readFileSync(constPath, 'utf8');
    if (!content.includes('Keys = {')) {
      content += "\nexport const " + mod + "Keys = {\n";
      content += "  all: ['" + mod + "'] as const,\n";
      content += "  lists: () => [... " + mod + "Keys.all, 'list'] as const,\n";
      content += "  list: (filters: string) => [... " + mod + "Keys.lists(), { filters }] as const,\n";
      content += "  details: () => [... " + mod + "Keys.all, 'detail'] as const,\n";
      content += "  detail: (id: string) => [... " + mod + "Keys.details(), id] as const,\n};\n";
      fs.writeFileSync(constPath, content);
    }
  }

  // 3. Augment Hooks (React Query)
  const hooksPath = path.join(rootDir, mod, 'hooks', 'index.ts');
  if (fs.existsSync(hooksPath)) {
    let content = fs.readFileSync(hooksPath, 'utf8');
    if (!content.includes("useCreate" + modCap)) {
      content += "\n// import { useMutation, useQueryClient } from '@tanstack/react-query';\n";
      content += "// import { " + mod + "Keys } from '../constants';\n\n";
      content += "export function useCreate" + modCap + "() {\n  return { mutate: (data: any) => {}, isLoading: false };\n}\n\n";
      content += "export function useUpdate" + modCap + "() {\n  return { mutate: (data: any) => {}, isLoading: false };\n}\n\n";
      content += "export function useDelete" + modCap + "() {\n  return { mutate: (id: string) => {}, isLoading: false };\n}\n";
      fs.writeFileSync(hooksPath, content);
    }
  }

  // 4. Augment Services
  const servicesPath = path.join(rootDir, mod, 'services', 'index.ts');
  if (fs.existsSync(servicesPath)) {
    let content = fs.readFileSync(servicesPath, 'utf8');
    if (!content.includes('getById:')) {
      const appendedMethods = "\n  getById: async (id: string) => { return null; },\n" +
                              "  create: async (data: any) => { return null; },\n" +
                              "  update: async (id: string, data: any) => { return null; },\n" +
                              "  patch: async (id: string, data: any) => { return null; },\n" +
                              "  delete: async (id: string) => { return null; },\n" +
                              "  bulkDelete: async (ids: string[]) => { return null; },\n" +
                              "  search: async (query: string) => { return []; },\n" +
                              "  upload: async (file: File) => { return null; }\n";
      content = content.replace(/};\r?\n?$/, appendedMethods + '};\n');
      fs.writeFileSync(servicesPath, content);
      processedCount++;
    }
  }
});

console.log("Successfully augmented API layer for " + processedCount + " features non-destructively.");
