import StaticPageLayout from "@/components/StaticPageLayout";
import Seo from "@/components/Seo";
import { getOrganizationSchema } from "@/lib/schema";

const AboutPage = () => {
  return (
    <>
      <Seo
        title="About Toollab - Your Everyday Internet Toolbox"
        description="Learn about Toollab, your one-stop platform for over 70+ powerful, free, and easy-to-use online tools designed for daily internet needs."
        keywords="about toollab, our mission, client-side tools, privacy first, nexobytes, animecx"
        canonicalPath="/about"
        schema={getOrganizationSchema()}
      />
      <StaticPageLayout title="About Toollab">
        <p className="text-xl text-muted-foreground">
          Welcome to Toollab — Your Everyday Internet Toolbox
        </p>
        <p>
          Toollab is your one-stop platform for over 70+ powerful, free, and easy-to-use online tools designed for daily internet needs. Whether you need to convert, edit, optimize, analyze, or create — Toollab delivers a fast, premium, and elegant experience without clutter, distractions, or unnecessary complexity.
        </p>
        <p>
          We built Toollab with speed, simplicity, and productivity in mind. Each tool is crafted for instant access, lightweight performance, and a polished UI that makes your workflow seamless and enjoyable.
        </p>

        <h3 className="mt-8 mb-4 text-2xl font-semibold">Our Vision</h3>
        <p>
          Our goal is to create the world’s most complete and refined online toolkit — where users can find, use, and share tools instantly, without installing software or worrying about privacy. Toollab is built for everyone — from students and freelancers to professionals and businesses.
        </p>

        <h3 className="mt-8 mb-4 text-2xl font-semibold">Core Values</h3>
        <ul className="space-y-3">
          <li><strong>Premium Experience</strong> – Modern, clean, and classy design for effortless use.</li>
          <li><strong>Privacy First</strong> – All tools work client-side whenever possible. Your data stays with you.</li>
          <li><strong>Always Free</strong> – Toollab is free forever, no hidden costs or subscriptions.</li>
          <li><strong>Speed & Reliability</strong> – Instant tool loading, responsive design, and uptime you can trust.</li>
        </ul>

        <h3 className="mt-8 mb-4 text-2xl font-semibold">Credits</h3>
        <ul className="space-y-3">
          <li><strong>Developer:</strong> Animecx</li>
          <li><strong>Made By:</strong> NexoBytes Development</li>
          <li><strong>Powered By:</strong> OpenBytes Technology</li>
        </ul>

        <h3 className="mt-8 mb-4 text-2xl font-semibold">Special Thanks</h3>
        <p>
          We thank our global community of testers, early adopters, and daily users who help us improve Toollab every day.
        </p>
      </StaticPageLayout>
    </>
  );
};

export default AboutPage;