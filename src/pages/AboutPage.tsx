import StaticPageLayout from "@/components/StaticPageLayout";

const AboutPage = () => {
  return (
    <StaticPageLayout title="About Toollab">
      <p>
        Welcome to Toollab, your new go-to destination for a comprehensive suite of fast, reliable, and completely client-side web tools. Our mission is to provide internet users with a powerful toolkit that respects your privacy and delivers instant results without ever sending your data to a server.
      </p>
      <h2>Our Vision</h2>
      <p>
        In an era where data privacy is paramount, we saw a need for a tool hub that operates entirely within your browser. Toollab was born from this vision. We believe that you shouldn't have to compromise on security or speed to get your daily tasks done. Whether you're a developer, a designer, a student, or just a curious internet user, Toollab is built for you.
      </p>
      <h2>Why Choose Toollab?</h2>
      <ul>
        <li><strong>Privacy First:</strong> All our tools are 100% client-side. Your files and data never leave your computer.</li>
        <li><strong>Blazing Fast:</strong> Since everything happens in your browser, there are no upload times or server processing delays.</li>
        <li><strong>Completely Free:</strong> Access over 70+ tools without any cost or hidden fees.</li>
        <li><strong>Elegant & Simple:</strong> We've designed our interface to be clean, intuitive, and a pleasure to use.</li>
      </ul>
    </StaticPageLayout>
  );
};

export default AboutPage;