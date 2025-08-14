import StaticPageLayout from "@/components/StaticPageLayout";
import Seo from "@/components/Seo";

const PrivacyPolicyPage = () => {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="Read the Toollab privacy policy. Learn how we handle your data with our 100% client-side tools, ensuring your information never leaves your browser."
        keywords="privacy policy, data protection, client-side, security"
        canonicalPath="/privacy-policy"
      />
      <StaticPageLayout title="Privacy Policy">
        <p>Last updated: October 17, 2023</p>
        <p>
          Your privacy is critically important to us. At Toollab, we have a few fundamental principles:
        </p>
        <ul>
          <li>We don't ask you for personal information unless we truly need it.</li>
          <li>We don't share your personal information with anyone except to comply with the law, develop our products, or protect our rights.</li>
          <li>We don't store personal information on our servers unless required for the on-going operation of one of our services.</li>
        </ul>
        <h2>Client-Side Operations</h2>
        <p>
          <strong>All tools offered on Toollab are client-side.</strong> This means that any data you input or files you use with our tools are processed directly in your web browser. Your data is never sent to, or stored on, our servers. We have no access to the information you work with.
        </p>
        <h2>Website Visitors</h2>
        <p>
          Like most website operators, Toollab may collect non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request. Our purpose in collecting non-personally identifying information is to better understand how our visitors use the website.
        </p>
      </StaticPageLayout>
    </>
  );
};

export default PrivacyPolicyPage;