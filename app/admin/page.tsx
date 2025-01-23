import { PageTitle } from "@/components/page-title";
import Link from "next/link";

/**
 * Admin dashboard page for managing system settings and user permissions
 */
export default function AdminPage() {
    return (
        <div className="mx-auto max-w-4xl">
            <PageTitle title="Admin Dashboard" description="Manage system settings and user permissions" />

            <div className="grid gap-6 md:grid-cols-2">
                {/* System Settings Card */}
                <Link href="/admin/research">
                    <div className="rounded-lg border border-gray-700/30 bg-gray-900/70 hover:bg-gray-800/80 hover:border-emerald-500/50 transition-colors duration-300 p-6">
                        <h2 className="text-lg font-semibold mb-4">Research Settings</h2>
                        <p className="text-gray-400">Configure research settings</p>
                    </div>
                </Link>

                {/* API Management Card */}
                <Link href="/admin/api-keys">
                    <div className="rounded-lg border border-gray-700/30 bg-gray-900/70 hover:bg-gray-800/80 hover:border-emerald-500/50 transition-colors duration-300 p-6">
                        <h2 className="text-lg font-semibold mb-4">API Management</h2>
                        <p className="text-gray-400">Manage API keys and access controls</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
