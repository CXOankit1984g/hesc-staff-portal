import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export default function Settings() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage system and user preferences</p>
      </div>

      {/* User Profile Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">User Profile</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
              <input
                type="text"
                placeholder="Admin"
                className="w-full px-4 py-2 border border-border rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
              <input
                type="text"
                placeholder="User"
                className="w-full px-4 py-2 border border-border rounded-lg text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email"
              placeholder="admin@hesc.ny.gov"
              className="w-full px-4 py-2 border border-border rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Role</label>
            <select className="w-full px-4 py-2 border border-border rounded-lg text-sm bg-white">
              <option>Administrator</option>
              <option>Program Manager</option>
              <option>Aid Specialist</option>
              <option>Support Staff</option>
            </select>
          </div>
          <Button className="bg-primary hover:bg-primary/90 gap-2">
            <Save size={18} />
            Save Changes
          </Button>
        </div>
      </Card>

      {/* System Preferences */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">System Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive email alerts for important updates</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
          <div className="border-t border-border pt-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Enhance account security</p>
            </div>
            <input type="checkbox" className="w-5 h-5" />
          </div>
          <div className="border-t border-border pt-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Data Export</p>
              <p className="text-sm text-muted-foreground">Allow automated data exports</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Notification Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Application Updates</p>
              <p className="text-sm text-muted-foreground">Notify when applications are updated</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
          <div className="border-t border-border pt-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Payment Confirmations</p>
              <p className="text-sm text-muted-foreground">Notify when payments are processed</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
          <div className="border-t border-border pt-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Report Generation</p>
              <p className="text-sm text-muted-foreground">Notify when reports are ready</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
          <div className="border-t border-border pt-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">System Alerts</p>
              <p className="text-sm text-muted-foreground">Notify about system maintenance and issues</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Security</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-border rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-border rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-border rounded-lg text-sm"
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90 gap-2">
            <Save size={18} />
            Update Password
          </Button>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-red-200 bg-red-50">
        <h3 className="text-lg font-semibold mb-4 text-red-900">Danger Zone</h3>
        <p className="text-sm text-red-700 mb-4">These actions cannot be undone.</p>
        <div className="flex gap-3">
          <Button variant="destructive">Clear Cache</Button>
          <Button variant="destructive">Reset to Defaults</Button>
        </div>
      </Card>
    </div>
  );
}
