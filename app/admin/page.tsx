import { PageTitle } from "@/components/page-title";

/**
 * Admin dashboard page for managing system settings and user permissions
 */
export default function AdminPage() {
    return (
        <div className="mx-auto max-w-4xl">
            <PageTitle
                title="Admin Dashboard"
                description="Manage system settings and user permissions"
            />

            <div className="grid gap-6 md:grid-cols-2">
                {/* User Management Card */}
                <div className="rounded-lg border border-gray-700/30 bg-gray-900/70 p-6">
                    <h2 className="text-lg font-semibold mb-4">User Management</h2>
                    <p className="text-gray-400">Manage user accounts and permissions</p>
                </div>

                {/* System Settings Card */}
                <div className="rounded-lg border border-gray-700/30 bg-gray-900/70 p-6">
                    <h2 className="text-lg font-semibold mb-4">System Settings</h2>
                    <p className="text-gray-400">Configure system parameters and defaults</p>
                </div>

                {/* Analytics Card */}
                <div className="rounded-lg border border-gray-700/30 bg-gray-900/70 p-6">
                    <h2 className="text-lg font-semibold mb-4">Analytics</h2>
                    <p className="text-gray-400">View system usage and performance metrics</p>
                </div>

                {/* API Management Card */}
                <div className="rounded-lg border border-gray-700/30 bg-gray-900/70 p-6">
                    <h2 className="text-lg font-semibold mb-4">API Management</h2>
                    <p className="text-gray-400">Manage API keys and access controls</p>
                </div>
            </div>
        </div>
    );
} 