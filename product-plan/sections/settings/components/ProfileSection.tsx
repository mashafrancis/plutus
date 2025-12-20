import { User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import type { Profile } from '../types'

interface ProfileSectionProps {
  profile: Profile
  onUpdate?: (updates: Partial<Profile>) => void
}

export function ProfileSection({
  profile,
  onUpdate,
}: ProfileSectionProps) {
  const handleAvatarUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        // In production, this would upload the file and get a URL
        const reader = new FileReader()
        reader.onload = (event) => {
          onUpdate?.({ avatarUrl: event.target?.result as string })
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 font-geist-sans">
          Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center overflow-hidden">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              <User className="h-8 w-8 text-neutral-400" />
            )}
          </div>
          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAvatarUpload}
              className="font-geist-sans"
            >
              Change Avatar
            </Button>
            {profile.avatarUrl && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onUpdate?.({ avatarUrl: null })}
                className="ml-2 font-geist-sans"
              >
                Remove
              </Button>
            )}
          </div>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="profile-name" className="font-geist-sans">
            Name
          </Label>
          <Input
            id="profile-name"
            value={profile.name}
            onChange={(e) => onUpdate?.({ name: e.target.value })}
            className="font-geist-sans"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="profile-email" className="font-geist-sans">
            Email
          </Label>
          <Input
            id="profile-email"
            type="email"
            value={profile.email}
            onChange={(e) => onUpdate?.({ email: e.target.value })}
            className="font-geist-sans"
          />
        </div>
      </CardContent>
    </Card>
  )
}

