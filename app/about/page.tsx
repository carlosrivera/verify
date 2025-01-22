import { PageTitle } from "@/components/page-title";

/**
 * About page component describing the platform and its mission
 */
export default function AboutPage() {
    return (
        <div className="mx-auto max-w-4xl">
            <PageTitle
                title="About VerifyInfluencers"
            />

            <div className="space-y-8">
                <section className="prose prose-invert max-w-none">
                    <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                    <p className="text-gray-300 leading-relaxed">
                        VerifyInfluencers is dedicated to promoting transparency and accountability in the health and wellness influencer space. 
                        We utilize advanced AI and machine learning technologies to analyze health-related claims and provide evidence-based verification.
                    </p>
                </section>

                <section className="prose prose-invert max-w-none">
                    <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="rounded-lg border border-gray-700/30 bg-gray-900/70 p-6">
                            <h3 className="text-lg font-semibold mb-2">Research</h3>
                            <p className="text-gray-400">Automated collection and analysis of influencer content and claims</p>
                        </div>
                        <div className="rounded-lg border border-gray-700/30 bg-gray-900/70 p-6">
                            <h3 className="text-lg font-semibold mb-2">Verify</h3>
                            <p className="text-gray-400">Cross-reference with scientific journals and medical research</p>
                        </div>
                        <div className="rounded-lg border border-gray-700/30 bg-gray-900/70 p-6">
                            <h3 className="text-lg font-semibold mb-2">Report</h3>
                            <p className="text-gray-400">Generate comprehensive reports with evidence-based analysis</p>
                        </div>
                    </div>
                </section>

                <section className="prose prose-invert max-w-none">
                    <h2 className="text-2xl font-semibold mb-4">Our Impact</h2>
                    <p className="text-gray-300 leading-relaxed">
                        By providing transparent, evidence-based analysis of health claims, we help consumers make informed decisions 
                        and encourage influencers to maintain high standards of accuracy in their content.
                    </p>
                </section>
            </div>
        </div>
    );
} 