import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

interface ToolSettingsProps {
  title?: string;
  children: React.ReactNode;
}

export const ToolSettings = ({ title = "Settings", children }: ToolSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );
};

export const SettingsRow = ({ label, children }: { label: string, children: React.ReactNode }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
    <label className="text-sm font-medium text-muted-foreground">{label}</label>
    <div className="flex items-center gap-2">{children}</div>
  </div>
);

export const SettingsSeparator = () => <Separator />;