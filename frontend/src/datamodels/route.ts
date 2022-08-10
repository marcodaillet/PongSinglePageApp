import React, { ComponentType, FC } from 'react';

export type Route = {
  key: string;
  title: string;
  description?: string;
  path: string;
  component?: React.ReactNode;
  isEnabled: boolean;
  icon?: ComponentType;
  subRoutes?: Route[];
  appendDivider?: boolean;
  expanded?: boolean;
};