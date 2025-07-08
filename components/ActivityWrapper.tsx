"use client";

import { ActivityCard, CreditInfo } from '@/components/ui/activity-card';

interface ActivityWrapperProps {
  creditInfo: CreditInfo;
  category?: string;
  title?: string;
}

export default function ActivityWrapper({ 
  creditInfo, 
  category = "Account",
  title = "API Credits"
}: ActivityWrapperProps) {
  return (
    <ActivityCard
      category={category}
      title={title}
      creditInfo={creditInfo}
    />
  );
}
