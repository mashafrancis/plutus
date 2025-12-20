import { Download, Upload, Trash2 } from 'lucide-react'
import { Button } from '../../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'
import { Switch } from '../../ui/switch'
import { PreferencesSection } from './PreferencesSection'
import { ProfileSection } from './ProfileSection'
import type { Preferences, Profile } from '../types'

interface GeneralTabProps {
  preferences: Preferences
  profile: Profile
  onUpdatePreferences?: (updates: Partial<Preferences>) => void
  onUpdateProfile?: (updates: Partial<Profile>) => void
  onExportData?: (format: 'csv' | 'json' | 'pdf', options?: any) => void
  onImportData?: (format: 'csv' | 'json', file: File) => void
  onDeleteAllData?: () => void
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
  const handleExport = (format: 'csv' | 'json' | 'pdf') => {
    onExportData?.(format)
  }

  const handleImport = (format: 'csv' | 'json') => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = format === 'csv' ? '.csv' : '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        onImportData?.(format, file)
      }
    }
    input.click()
  }

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <ProfileSection
        profile={profile}
        onUpdate={onUpdateProfile}
      />

      {/* Preferences Section */}
      <PreferencesSection
        preferences={preferences}
        onUpdate={onUpdatePreferences}
      />

      {/* Data Management Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 font-geist-sans">
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Export */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-neutral-900 dark:text-neutral-100 font-geist-sans">
              Export Data
            </Label>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-geist-sans">
              Download your data in various formats for backup or analysis.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => handleExport('csv')}
                className="font-geist-sans"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExport('json')}
                className="font-geist-sans"
              >
                <Download className="h-4 w-4 mr-2" />
                Export JSON
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExport('pdf')}
                className="font-geist-sans"
              >
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>

          {/* Import */}
          <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <Label className="text-sm font-medium text-neutral-900 dark:text-neutral-100 font-geist-sans">
              Import Data
            </Label>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-geist-sans">
              Import transactions and settings from a file.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => handleImport('csv')}
                className="font-geist-sans"
              >
                <Upload className="h-4 w-4 mr-2" />
                Import CSV
              </Button>
              <Button
                variant="outline"
                onClick={() => handleImport('json')}
                className="font-geist-sans"
              >
                <Upload className="h-4 w-4 mr-2" />
                Import JSON
              </Button>
            </div>
          </div>

          {/* Delete All Data */}
          <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <Label className="text-sm font-medium text-red-600 dark:text-red-400 font-geist-sans">
              Danger Zone
            </Label>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-geist-sans">
              Permanently delete all your data. This action cannot be undone.
            </p>
            <Button
              variant="destructive"
              onClick={onDeleteAllData}
              className="font-geist-sans"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete All Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

