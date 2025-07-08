"use client";

import { ActivityCard, CreditInfo } from "@/components/ui/activity-card";

const INITIAL_CREDIT_INFO: CreditInfo = {
  remaining: 750,
  total: 1000,
  label: "API Credits",
  resetDate: "Feb 1, 2025"
};

export function ActivityCardDemo() {
  return (
    <div className="p-8">
      <div className="max-w-md mx-auto">
        <ActivityCard
          creditInfo={INITIAL_CREDIT_INFO}
          category="Demo"
          title="Credit Usage"
        />
      </div>
    </div>
  );
}
