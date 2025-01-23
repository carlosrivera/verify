import { PageTitle } from "@/components/page-title";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle, FileText, Users, TrendingUp, Shield } from "lucide-react";

/**
 * About page component describing the platform and its mission
 */
export default function AboutPage() {
    return (
        <div className="mx-auto max-w-4xl mb-20">
            <PageTitle
                title="About VerifyInfluencers"
                description="Bringing truth and transparency to health & wellness content"
            />

            {/* Stats section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {[
                    { label: "Influencers Analyzed", value: "10,000+" },
                    { label: "Claims Verified", value: "50,000+" },
                    { label: "Scientific Sources", value: "1,000+" },
                    { label: "Monthly Users", value: "100,000+" },
                ].map((stat) => (
                    <div key={stat.label} className="text-center p-4 rounded-lg border border-gray-700/30 bg-gray-900/70">
                        <div className="text-2xl font-bold text-primary">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="space-y-16">
                <section className="prose prose-invert max-w-none">
                    <div className="flex items-center gap-2 mb-4">
                        <Shield className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-semibold m-0">Our Mission</h2>
                    </div>
                    <div className="relative">
                        <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-primary/80 to-primary/20 rounded-full" />
                        <p className="text-gray-300 leading-relaxed pl-4">
                            VerifyInfluencers is dedicated to promoting transparency and accountability in the health and
                            wellness influencer space. We utilize advanced AI and machine learning technologies to analyze
                            health-related claims and provide evidence-based verification.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                        <Badge variant="secondary">AI-Powered</Badge>
                        <Badge variant="secondary">Evidence-Based</Badge>
                        <Badge variant="secondary">Transparency</Badge>
                    </div>
                </section>

                <section className="prose prose-invert max-w-none">
                    <div className="flex items-center gap-2 mb-6">
                        <BookOpen className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-semibold m-0">How It Works</h2>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            {
                                icon: <FileText className="w-8 h-8 text-primary mb-4" />,
                                title: "Research",
                                description: "Automated collection and analysis of influencer content and claims",
                                features: ["AI-powered scanning", "Content categorization", "Trend analysis"],
                            },
                            {
                                icon: <CheckCircle className="w-8 h-8 text-primary mb-4" />,
                                title: "Verify",
                                description: "Cross-reference with scientific journals and medical research",
                                features: ["Peer-reviewed sources", "Expert validation", "Accuracy scoring"],
                            },
                            {
                                icon: <TrendingUp className="w-8 h-8 text-primary mb-4" />,
                                title: "Report",
                                description: "Generate comprehensive reports with evidence-based analysis",
                                features: ["Detailed insights", "Citation tracking", "Regular updates"],
                            },
                        ].map((step) => (
                            <div
                                key={step.title}
                                className="rounded-lg border border-gray-700/30 bg-gray-900/70 p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                            >
                                {step.icon}
                                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                                <p className="text-gray-400 mb-4">{step.description}</p>
                                <ul className="text-sm text-gray-500">
                                    {step.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2 mb-1">
                                            <div className="w-1 h-1 rounded-full bg-primary" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="prose prose-invert max-w-none">
                    <div className="flex items-center gap-2 mb-4">
                        <Users className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-semibold m-0">Our Impact</h2>
                    </div>
                    <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 rounded-lg border border-primary/20">
                        <p className="text-gray-300 leading-relaxed">
                            By providing transparent, evidence-based analysis of health claims, we help consumers make informed
                            decisions and encourage influencers to maintain high standards of accuracy in their content.
                        </p>
                        <div className="mt-4 flex flex-wrap gap-4">
                            {[
                                "100% Evidence-Based Analysis",
                                "Real-time Monitoring",
                                "Community-Driven",
                                "Continuous Learning",
                            ].map((feature) => (
                                <div key={feature} className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-primary" />
                                    <span className="text-sm text-gray-400">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
