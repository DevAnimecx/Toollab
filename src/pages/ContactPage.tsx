import StaticPageLayout from "@/components/StaticPageLayout";
import Seo from "@/components/Seo";

const ContactPage = () => {
  return (
    <>
      <Seo
        title="Contact Us"
        description="Get in touch with the Toollab team. We'd love to hear your questions, feedback, or suggestions for new tools. Reach out to us via email."
        keywords="contact toollab, feedback, support, suggestions"
        canonicalPath="/contact"
      />
      <StaticPageLayout title="Contact Us">
        <p>
          We'd love to hear from you! Whether you have a question, feedback, or a suggestion for a new tool, please don't hesitate to reach out.
        </p>
        <p>
          You can contact us via email at: <a href="mailto:contact@toollab.com">contact@toollab.com</a>
        </p>
        <p>
          We do our best to respond to all inquiries as quickly as possible.
        </p>
      </StaticPageLayout>
    </>
  );
};

export default ContactPage;