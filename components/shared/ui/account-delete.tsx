const AccountDelete = () => {
  return (
    <>
      {/* Header Section */}
      <section className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-balance text-black sm:text-2xl md:text-3xl">
            Bhartiyam – Account Deletion Policy
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-gray-900">1. Purpose</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-700">
            This policy explains how users of Bhartiyam can delete their account, what happens when they do so, what
            data is removed or retained, and under what conditions. Our goal is to give users control over their
            personal data and ensure transparency.
          </p>

          <h2 className="mt-8 text-lg font-semibold text-gray-900">2. Scope</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-700">
            This policy applies to all users who have created an account in the Bhartiyam (mobile/website) and any
            associated services (orders, loyalty points, app settings, etc.).
          </p>

          <h2 className="mt-8 text-lg font-semibold text-gray-900">3. How to Delete Your Account</h2>
          <ul className="mt-4 space-y-3 pl-6 text-base leading-relaxed text-gray-700">
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <div>
                <p>Users can request deletion through the app:</p>
                <p className="mt-1">
                  Go to <strong>Settings → Account → Delete Account</strong>
                </p>
              </div>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>
                Alternatively, users may submit a deletion request via our support email/portal: care@bhartiyam.in (or
                similar).
              </span>
            </li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold text-gray-900">4. Verification</h2>
          <ul className="mt-4 space-y-3 pl-6 text-base leading-relaxed text-gray-700">
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>
                Before deleting an account, the user may need to re-authenticate (password, OTP, or similar) to confirm
                identity.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>
                We may ask for confirmation that the user really wants to delete the account, explaining consequences
                (loss of data, inability to recover past orders, etc.).
              </span>
            </li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold text-gray-900">5. What Data Gets Deleted</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-700">
            When an account is deleted, we will permanently remove:
          </p>
          <ul className="mt-4 space-y-3 pl-6 text-base leading-relaxed text-gray-700">
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>Personal profile information (name, email, phone, etc.)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>Login credentials & authentication tokens</span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>App usage data, preferences, settings</span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>Any loyalty/points balances</span>
            </li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold text-gray-900">6. What Data May Be Retained</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-700">
            There are some exceptions. Certain data may be retained if:
          </p>
          <ul className="mt-4 space-y-3 pl-6 text-base leading-relaxed text-gray-700">
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>Required by law or regulation (e.g. tax, audit, fraud prevention)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>Needed for unresolved issues (e.g. pending payments, disputes)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>Retention is necessary for us to detect or prevent abuse/fraud</span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>Order history</span>
            </li>
          </ul>
          <p className="mt-4 text-base leading-relaxed text-gray-700">
            If any data is to be retained, we will inform the user at the time of deletion request (or via our Privacy
            Policy) which data will remain and for how long.
          </p>

          <h2 className="mt-8 text-lg font-semibold text-gray-900">7. Timeframe</h2>
          <ul className="mt-4 space-y-3 pl-6 text-base leading-relaxed text-gray-700">
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>
                Once a deletion request is confirmed, we aim to complete the deletion of personal data within{' '}
                <strong>30 days</strong>
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>Some data removal (e.g. backups, logs) may take longer.</span>
            </li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold text-gray-900">8. Effect of Deletion</h2>
          <ul className="mt-4 space-y-3 pl-6 text-base leading-relaxed text-gray-700">
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>
                After deletion, user will no longer be able to log in or access past orders / loyalty rewards.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>Deletion is irreversible (unless specifically stated otherwise).</span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>Notifications or subscriptions related to the account will cease.</span>
            </li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold text-gray-900">9. Third-Party Data</h2>
          <ul className="mt-4 space-y-3 pl-6 text-base leading-relaxed text-gray-700">
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>
                If user data has been shared with trusted third-parties (e.g. payment processors, delivery partners), we
                will request those third parties to delete user data as permitted under their policies.
              </span>
            </li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold text-gray-900">10. Legal Rights & Compliance</h2>
          <ul className="mt-4 space-y-3 pl-6 text-base leading-relaxed text-gray-700">
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>
                Our policy is in accordance with applicable laws (e.g. data protection/privacy laws, consumer
                protection) in India or other jurisdictions where we operate.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>
                Users have rights under laws such as the{' '}
                <strong>IT Act / Personal Data Protection (if in force)</strong>, etc.
              </span>
            </li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold text-gray-900">11. Exceptions & Limitations</h2>
          <ul className="mt-4 space-y-3 pl-6 text-base leading-relaxed text-gray-700">
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>
                If user has active subscriptions, outstanding payments, or pending disputes, we may require those to be
                resolved before deletion.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>
                Some data cannot be deleted immediately because of technical or regulatory reasons, but will be
                scheduled for deletion as soon as possible.
              </span>
            </li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold text-gray-900">12. Contact & Support</h2>
          <ul className="mt-4 space-y-3 pl-6 text-base leading-relaxed text-gray-700">
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>
                If you have questions about deleting your account or want to know what data remains, contact us at
                [support email / phone].
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>We provide confirmation when the deletion is complete.</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default AccountDelete;
