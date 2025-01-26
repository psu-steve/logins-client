import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <section style={{ marginTop: "2rem" }}>
        <h2>1. Information We Collect</h2>
        <p>When you use our social login features, we collect:</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Profile picture</li>
          <li>Social media ID</li>
        </ul>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>2. How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        <ul>
          <li>Create and manage your account</li>
          <li>Authenticate you when you sign in</li>
          <li>Provide our services</li>
        </ul>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>3. Data Deletion</h2>
        <p>To request deletion of your data, please:</p>
        <ul>
          <li>Email us at: sgoodrickjr@gmail.com</li>
          <li>
            Visit our <a href="/data-deletion">data deletion page</a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
