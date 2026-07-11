export const featureFlags = {
  enableNewDashboard: process.env.NEXT_PUBLIC_FF_NEW_DASHBOARD === 'true',
  enableBetaBilling: process.env.NEXT_PUBLIC_FF_BETA_BILLING === 'true',
};
