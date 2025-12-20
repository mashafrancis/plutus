import { Download, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { Preferences, Profile } from "@/lib/types/settings";
import { PreferencesSection } from "./PreferencesSection";
import { ProfileSection } from "./ProfileSection";

interface GeneralTabProps {
  preferences: Preferences;
  profile: Profile;
  onUpdatePreferences?: (updates: Partial<Preferences>) => void;
  onUpdateProfile?: (updates: Partial<Profile>) => void;
  onExportData?: (format: "csv" | "json" | "pdf", options?: any) => void;
  onImportData?: (format: "csv" | "json", file: File) => void;
  onDeleteAllData?: () => void;
}

export function GeneralTab({
  preferences,
  profile,
  onUpdatePreferences,
  onUpdateProfile,
  onExportData,
  onImportData,
  onDeleteAllData,
}: GeneralTabProps) {
  const handleExport = (format: "csv" | "json" | "pdf") => {
    onExportData?.(format);
  };

  const handleImport = (format: "csv" | "json") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = format === "csv" ? ".csv" : ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        onImportData?.(format, file);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <ProfileSection onUpdate={onUpdateProfile} profile={profile} />

      {/* Preferences Section */}
      <PreferencesSection
        onUpdate={onUpdatePreferences}
        preferences={preferences}
      />

      {/* Data Management Section */}
      <Card>
        <CardHeader>
          <CardTitle className="font-geist-sans font-semibold text-lg text-neutral-900 dark:text-neutral-100">
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Export */}
          <div className="space-y-3">
            <Label className="font-geist-sans font-medium text-neutral-900 text-sm dark:text-neutral-100">
              Export Data
            </Label>
            <p className="font-geist-sans text-neutral-600 text-sm dark:text-neutral-400">
              Download your data in various formats for backup or analysis.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                className="font-geist-sans"
                onClick={() => handleExport("csv")}
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
              <Button
                className="font-geist-sans"
                onClick={() => handleExport("json")}
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Export JSON
              </Button>
              <Button
                className="font-geist-sans"
                onClick={() => handleExport("pdf")}
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>

          {/* Import */}
          <div className="space-y-3 border-neutral-200 border-t pt-4 dark:border-neutral-800">
            <Label className="font-geist-sans font-medium text-neutral-900 text-sm dark:text-neutral-100">
              Import Data
            </Label>
            <p className="font-geist-sans text-neutral-600 text-sm dark:text-neutral-400">
              Import transactions and settings from a file.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                className="font-geist-sans"
                onClick={() => handleImport("csv")}
                variant="outline"
              >
                <Upload className="mr-2 h-4 w-4" />
                Import CSV
              </Button>
              <Button
                className="font-geist-sans"
                onClick={() => handleImport("json")}
                variant="outline"
              >
                <Upload className="mr-2 h-4 w-4" />
                Import JSON
              </Button>
            </div>
          </div>

          {/* Delete All Data */}
          <div className="space-y-3 border-neutral-200 border-t pt-4 dark:border-neutral-800">
            <Label className="font-geist-sans font-medium text-red-600 text-sm dark:text-red-400">
              Danger Zone
            </Label>
            <p className="font-geist-sans text-neutral-600 text-sm dark:text-neutral-400">
              Permanently delete all your data. This action cannot be undone.
            </p>
            <Button
              className="font-geist-sans"
              onClick={onDeleteAllData}
              variant="destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete All Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
