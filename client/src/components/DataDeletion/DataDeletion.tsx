import React from "react";

const DataDeletion: React.FC = () => {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Data Deletion Instructions</h1>
      <p>To request deletion of your account and associated data:</p>

      <section style={{ marginTop: "2rem" }}>
        <h2>Option 1: Email Request</h2>
        <p>Send an email to sgoodrickjr@gmail.com with:</p>
        <ul>
          <li>Subject: "Data Deletion Request"</li>
          <li>Your registered email address</li>
          <li>Request for account deletion</li>
        </ul>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Option 2: Account Settings</h2>
        <p>When logged in:</p>
        <ol>
          <li>Go to Account Settings</li>
          <li>Scroll to "Delete Account" section</li>
          <li>Follow the prompts to confirm deletion</li>
        </ol>
      </section>

      <p style={{ marginTop: "2rem" }}>
        Note: Data deletion will be processed within 30 days of request receipt.
      </p>
    </div>
  );
};

export default DataDeletion;
