import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

interface PageTitleProps {
    title: string;
    description?: string;
    backLink?: {
        href: string;
        label: string;
    };
}

/**
 * PageTitle component for consistent page headers
 * @param title - Main page title
 * @param description - Optional description text
 * @param backLink - Optional back navigation link
 */
export const PageTitle = ({ title, description, backLink }: PageTitleProps) => {
    return (
        <div className="py-6">
            <div className="flex flex-col items-start space-y-2">
                <div className="h-8 flex items-center">
                    {backLink && (
                        <Link
                            href={backLink.href}
                            className="inline-flex items-center space-x-2 text-sm font-semibold text-emerald-500 hover:text-emerald-400 transition-colors"
                        >
                            <ArrowLeftIcon className="h-4 w-4" />
                            <span>{backLink.label}</span>
                        </Link>
                    )}
                </div>
                <h1 className="text-2xl font-bold">{title}</h1>
                {description && (
                    <p className="text-gray-400 text-base max-w-xl">{description}</p>
                )}
            </div>
        </div>
    );
}; 