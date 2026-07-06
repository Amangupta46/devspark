"use client";

import * as React from "react";
import { MaxWidth, Stack, Grid } from "@/components/layout/primitives";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CardSkeleton,
  TableSkeleton,
  HeroSkeleton,
  DashboardSkeleton,
  TextSkeleton,
} from "@/components/ui/skeleton";
import { GlassCard } from "@/components/shared/glass-card";
import { Badge } from "@/components/shared/badge";
import { Chip } from "@/components/shared/chip";
import { Icon } from "@/components/shared/icon-registry";

export default function DevUIPage() {
  const [switchChecked, setSwitchChecked] = React.useState(false);
  const [checkboxChecked, setCheckboxChecked] = React.useState(false);
  const [chipActive, setChipActive] = React.useState(false);
  const [chipList, setChipList] = React.useState(["React", "TypeScript", "Tailwind", "Django"]);

  return (
    <TooltipProvider>
      <div className="bg-surface-ground min-h-screen py-12 pb-24 text-neutral-50">
        <MaxWidth>
          <Stack gap={10}>
            {/* Header */}
            <div className="border-border-default border-b pb-8">
              <span className="font-mono text-xs tracking-wider text-amber-400 uppercase">
                Environment Playground
              </span>
              <h1 className="text-neutral-0 mt-2 text-4xl font-extrabold md:text-5xl">
                Dev UI Showcase
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-300">
                A visual QA interface highlighting all reusable design primitives, layout grids,
                components, and animations.
              </p>
            </div>

            {/* Layout Primitives */}
            <section className="space-y-6">
              <SectionHeader title="1. Layout Primitives" subheading="Grids & Flex Builders" />
              <GlassCard className="space-y-4">
                <p className="text-xs text-neutral-400">
                  Flex Stack (Direction: row, align: center)
                </p>
                <Stack
                  direction="row"
                  align="center"
                  gap={4}
                  className="border-border-subtle rounded-md border p-4"
                >
                  <div className="bg-surface-elevated rounded px-4 py-2 text-xs">Item 1</div>
                  <div className="bg-surface-elevated rounded px-4 py-2 text-xs">Item 2</div>
                  <div className="bg-surface-elevated rounded px-4 py-2 text-xs">Item 3</div>
                </Stack>

                <p className="text-xs text-neutral-400">Responsive Grid (cols 1, md 3)</p>
                <Grid
                  cols={1}
                  colsMd={3}
                  gap={4}
                  className="border-border-subtle rounded-md border p-4"
                >
                  <div className="bg-surface-elevated rounded p-4 text-center text-xs">Col 1</div>
                  <div className="bg-surface-elevated rounded p-4 text-center text-xs">Col 2</div>
                  <div className="bg-surface-elevated rounded p-4 text-center text-xs">Col 3</div>
                </Grid>
              </GlassCard>
            </section>

            {/* Buttons */}
            <section className="space-y-6">
              <SectionHeader title="2. Buttons" subheading="Standard Actions" />
              <GlassCard>
                <Grid cols={1} colsMd={2} colsLg={5} gap={4}>
                  <Stack gap={2}>
                    <span className="text-xs text-neutral-400">Primary</span>
                    <Button variant="default">Button</Button>
                  </Stack>
                  <Stack gap={2}>
                    <span className="text-xs text-neutral-400">Secondary</span>
                    <Button variant="secondary">Button</Button>
                  </Stack>
                  <Stack gap={2}>
                    <span className="text-xs text-neutral-400">Ghost</span>
                    <Button variant="ghost">Button</Button>
                  </Stack>
                  <Stack gap={2}>
                    <span className="text-xs text-neutral-400">Danger</span>
                    <Button variant="danger">Button</Button>
                  </Stack>
                  <Stack gap={2}>
                    <span className="text-xs text-neutral-400">Link</span>
                    <Button variant="link">Button</Button>
                  </Stack>
                </Grid>

                <div className="border-border-subtle my-6 border-t pt-6">
                  <Grid cols={1} colsMd={3} gap={4}>
                    <Stack gap={2}>
                      <span className="text-xs text-neutral-400">Loading State</span>
                      <Button loading>Save Changes</Button>
                    </Stack>
                    <Stack gap={2}>
                      <span className="text-xs text-neutral-400">Disabled State</span>
                      <Button disabled>Action Locked</Button>
                    </Stack>
                    <Stack gap={2}>
                      <span className="text-xs text-neutral-400">Size variants (xs, sm, lg)</span>
                      <div className="flex flex-wrap items-center gap-2">
                        <Button size="xs">XS</Button>
                        <Button size="sm">SM</Button>
                        <Button size="lg">LG</Button>
                      </div>
                    </Stack>
                  </Grid>
                </div>
              </GlassCard>
            </section>

            {/* Inputs & Textareas */}
            <section className="space-y-6">
              <SectionHeader title="3. Form Inputs" subheading="Text & States" />
              <GlassCard>
                <Grid cols={1} colsMd={2} gap={6}>
                  <Stack gap={2}>
                    <label className="text-xs font-semibold text-neutral-300">
                      Standard Text Input
                    </label>
                    <Input placeholder="Enter username..." />
                  </Stack>
                  <Stack gap={2}>
                    <label className="text-xs font-semibold text-neutral-300">Disabled Input</label>
                    <Input placeholder="Not editable..." disabled />
                  </Stack>
                  <Stack gap={2}>
                    <label className="text-xs font-semibold text-neutral-300">
                      Input with Error State
                    </label>
                    <Input placeholder="Invalid input..." error />
                    <span className="text-error-400 text-xs">Username is already taken.</span>
                  </Stack>
                  <Stack gap={2}>
                    <label className="text-xs font-semibold text-neutral-300">Text Area</label>
                    <Textarea placeholder="Describe your project goals..." />
                  </Stack>
                </Grid>
              </GlassCard>
            </section>

            {/* Toggles */}
            <section className="space-y-6">
              <SectionHeader title="4. Toggles" subheading="Selection states" />
              <GlassCard>
                <Grid cols={1} colsMd={2} gap={6}>
                  <Stack gap={3}>
                    <span className="text-xs font-semibold text-neutral-400">Radix Checkbox</span>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="test-checkbox"
                        checked={checkboxChecked}
                        onCheckedChange={(checked) => setCheckboxChecked(checked === true)}
                      />
                      <label htmlFor="test-checkbox" className="cursor-pointer text-sm select-none">
                        Accept terms and conditions ({checkboxChecked ? "checked" : "unchecked"})
                      </label>
                    </div>
                  </Stack>

                  <Stack gap={3}>
                    <span className="text-xs font-semibold text-neutral-400">Radix Switch</span>
                    <div className="flex items-center gap-3">
                      <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} />
                      <span className="text-sm select-none">
                        Enable background telemetry ({switchChecked ? "active" : "inactive"})
                      </span>
                    </div>
                  </Stack>
                </Grid>
              </GlassCard>
            </section>

            {/* Dropdowns & Popovers */}
            <section className="space-y-6">
              <SectionHeader
                title="5. Dropdowns & Floating Elements"
                subheading="Radix Select & Popover"
              />
              <GlassCard>
                <Grid cols={1} colsMd={2} gap={6}>
                  <Stack gap={2}>
                    <span className="text-xs text-neutral-400">Select Box</span>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select platform..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nextjs">Next.js App Router</SelectItem>
                        <SelectItem value="django">Django REST API</SelectItem>
                        <SelectItem value="postgres">PostgreSQL DB</SelectItem>
                      </SelectContent>
                    </Select>
                  </Stack>

                  <Stack gap={2}>
                    <span className="text-xs text-neutral-400">Popover Panel</span>
                    <div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="secondary">Open Menu Configurations</Button>
                        </PopoverTrigger>
                        <PopoverContent className="space-y-3">
                          <h4 className="text-neutral-0 text-sm font-semibold">Theme Settings</h4>
                          <p className="text-xs leading-relaxed text-neutral-300">
                            Configure background shading settings and animations.
                          </p>
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-xs">Dark Mode</span>
                            <Switch checked />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </Stack>
                </Grid>
              </GlassCard>
            </section>

            {/* Overlays */}
            <section className="space-y-6">
              <SectionHeader title="6. Dialogs & Drawer Panels" subheading="Overlays" />
              <GlassCard>
                <Grid cols={1} colsMd={2} gap={6}>
                  <Stack gap={2}>
                    <span className="text-xs text-neutral-400">Dialog Modal</span>
                    <div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>Trigger Dialog Modal</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Project Initialization</DialogTitle>
                            <DialogDescription>
                              This operation will scaffold a new client project workspace folder
                              structure.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-3 py-4">
                            <label className="text-xs font-semibold text-neutral-300">
                              Project Label
                            </label>
                            <Input placeholder="Client code..." />
                          </div>
                          <div className="flex justify-end gap-3">
                            <DialogTrigger asChild>
                              <Button variant="secondary">Cancel</Button>
                            </DialogTrigger>
                            <Button>Initialize</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </Stack>

                  <Stack gap={2}>
                    <span className="text-xs text-neutral-400">Side Sheet Drawer</span>
                    <div>
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button variant="secondary">Trigger Side Sheet</Button>
                        </DrawerTrigger>
                        <DrawerContent side="right">
                          <DrawerHeader>
                            <DrawerTitle>Notification Logs</DrawerTitle>
                            <DrawerDescription>
                              Review latest compilation and build history logs.
                            </DrawerDescription>
                          </DrawerHeader>
                          <div className="space-y-4 py-6">
                            <div className="border-border-subtle bg-surface-elevated/40 space-y-1 rounded border p-3">
                              <div className="flex justify-between text-xs text-neutral-400">
                                <span>Git commit check</span>
                                <span>10m ago</span>
                              </div>
                              <p className="text-xs text-neutral-200">
                                Prettier formatting checks passed cleanly.
                              </p>
                            </div>
                            <div className="border-border-subtle bg-surface-elevated/40 space-y-1 rounded border p-3">
                              <div className="flex justify-between text-xs text-neutral-400">
                                <span>Next.js Build compiler</span>
                                <span>1h ago</span>
                              </div>
                              <p className="text-xs text-neutral-200">
                                Production bundle built successfully (2.9s).
                              </p>
                            </div>
                          </div>
                        </DrawerContent>
                      </Drawer>
                    </div>
                  </Stack>
                </Grid>
              </GlassCard>
            </section>

            {/* Tooltips & Accordions */}
            <section className="space-y-6">
              <SectionHeader
                title="7. Tooltips & Accordions"
                subheading="Disclosures & Info tips"
              />
              <GlassCard>
                <Grid cols={1} colsMd={2} gap={6}>
                  <Stack gap={2}>
                    <span className="text-xs text-neutral-400">Tooltip trigger (hover delay)</span>
                    <div className="flex gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="border-border-default bg-surface-elevated hover:text-neutral-0 inline-flex h-9 w-9 cursor-help items-center justify-center rounded-full border text-neutral-200">
                            <Icon name="Info" size={16} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">
                            Analytics IDs automatically track telemetry actions.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                      <span className="self-center text-sm">Hover info node</span>
                    </div>
                  </Stack>

                  <Stack gap={2}>
                    <span className="text-xs text-neutral-400">Radix Accordion</span>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="faq-1">
                        <AccordionTrigger>How long does development take?</AccordionTrigger>
                        <AccordionContent>
                          Standard marketing websites build in 2 weeks. Custom enterprise software
                          builds can take 4-8 weeks.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-2">
                        <AccordionTrigger>What is our tech stack?</AccordionTrigger>
                        <AccordionContent>
                          We prioritize Next.js App Router, Django REST, and PostgreSQL database
                          servers.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </Stack>
                </Grid>
              </GlassCard>
            </section>

            {/* Badges & Chips */}
            <section className="space-y-6">
              <SectionHeader
                title="8. Badges, Chips & Icon Registries"
                subheading="Status Indicators"
              />
              <GlassCard className="space-y-6">
                <div>
                  <h4 className="mb-3 text-xs font-semibold text-neutral-400">Status Badges</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="amber">Amber</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="info">Info</Badge>
                  </div>
                </div>

                <div className="border-border-subtle border-t pt-6">
                  <h4 className="mb-3 text-xs font-semibold text-neutral-400">Dismissible Chips</h4>
                  <div className="flex flex-wrap gap-2">
                    {chipList.map((tag) => (
                      <Chip
                        key={tag}
                        active={chipActive}
                        onClick={() => setChipActive(!chipActive)}
                        onDismiss={() => setChipList(chipList.filter((item) => item !== tag))}
                      >
                        {tag}
                      </Chip>
                    ))}
                    {chipList.length === 0 && (
                      <Button
                        size="xs"
                        variant="secondary"
                        onClick={() => setChipList(["React", "TypeScript", "Tailwind", "Django"])}
                      >
                        Reset Chips
                      </Button>
                    )}
                  </div>
                </div>

                <div className="border-border-subtle border-t pt-6">
                  <h4 className="mb-3 text-xs font-semibold text-neutral-400">
                    Lucide Icon Register
                  </h4>
                  <div className="flex flex-wrap gap-4 text-neutral-300">
                    <div className="flex items-center gap-1.5">
                      <Icon name="custom-github" size={16} />
                      <span>Github</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icon name="custom-linkedin" size={16} />
                      <span>LinkedIn</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icon name="custom-twitter" size={16} />
                      <span>Twitter (X)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icon name="Activity" size={16} />
                      <span>Activity</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </section>

            {/* Skeletons */}
            <section className="space-y-6">
              <SectionHeader title="9. Shimmering Loading States" subheading="Skeleton Templates" />
              <GlassCard className="space-y-8">
                <div>
                  <h4 className="mb-3 text-xs font-semibold text-neutral-400">
                    Text Skeleton Lines
                  </h4>
                  <TextSkeleton lines={3} />
                </div>

                <div className="border-border-subtle border-t pt-6">
                  <h4 className="mb-4 text-xs font-semibold text-neutral-400">
                    Grid Card Skeleton
                  </h4>
                  <Grid cols={1} colsMd={3} gap={4}>
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                  </Grid>
                </div>

                <div className="border-border-subtle border-t pt-6">
                  <h4 className="mb-4 text-xs font-semibold text-neutral-400">
                    Table Shimmer Layout
                  </h4>
                  <TableSkeleton rows={3} />
                </div>

                <div className="border-border-subtle border-t pt-6">
                  <h4 className="mb-4 text-xs font-semibold text-neutral-400">
                    Hero Banner Skeleton
                  </h4>
                  <div className="border-border-subtle bg-surface-elevated/10 rounded-lg border p-4">
                    <HeroSkeleton />
                  </div>
                </div>

                <div className="border-border-subtle border-t pt-6">
                  <h4 className="mb-4 text-xs font-semibold text-neutral-400">
                    Dashboard Structure Skeleton
                  </h4>
                  <div className="border-border-subtle bg-surface-elevated/10 rounded-lg border p-6">
                    <DashboardSkeleton />
                  </div>
                </div>
              </GlassCard>
            </section>
          </Stack>
        </MaxWidth>
      </div>
    </TooltipProvider>
  );
}
