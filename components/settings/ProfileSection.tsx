import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Profile } from "@/lib/types/settings";

interface ProfileSectionProps {
  profile: Profile;
  onUpdate?: (updates: Partial<Profile>) => void;
}

export function ProfileSection({ profile, onUpdate }: ProfileSectionProps) {
  const handleAvatarUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // In production, this would upload the file and get a URL
        const reader = new FileReader();
        reader.onload = (event) => {
          onUpdate?.({ avatarUrl: event.target?.result as string });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-geist-sans font-semibold text-lg text-neutral-900 dark:text-neutral-100">
          Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
            {profile.avatarUrl ? (
              <img
                alt={profile.name}
                className="h-full w-full object-cover"
                src={profile.avatarUrl}
              />
            ) : (
              <User className="h-8 w-8 text-neutral-400" />
            )}
          </div>
          <div>
            <Button
              className="font-geist-sans"
              onClick={handleAvatarUpload}
              size="sm"
              variant="outline"
            >
              Change Avatar
            </Button>
            {profile.avatarUrl && (
              <Button
                className="ml-2 font-geist-sans"
                onClick={() => onUpdate?.({ avatarUrl: null })}
                size="sm"
                variant="ghost"
              >
                Remove
              </Button>
            )}
          </div>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label className="font-geist-sans" htmlFor="profile-name">
            Name
          </Label>
          <Input
            className="font-geist-sans"
            id="profile-name"
            onChange={(e) => onUpdate?.({ name: e.target.value })}
            value={profile.name}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label className="font-geist-sans" htmlFor="profile-email">
            Email
          </Label>
          <Input
            className="font-geist-sans"
            id="profile-email"
            onChange={(e) => onUpdate?.({ email: e.target.value })}
            type="email"
            value={profile.email}
          />
        </div>
      </CardContent>
    </Card>
  );
}
