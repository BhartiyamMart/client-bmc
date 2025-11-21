const AccountDelete = () => {
  return (
    <div>
      <section className="bg-gray-100">
        <div className="mx-auto mt-20 max-w-[1539px] px-5 pt-10 pb-10 sm:mt-25 md:mt-25 lg:mt-25 lg:px-25">
          <h1 className="text-2xl font-semibold text-balance text-black sm:text-2xl md:text-3xl">
            Bhartiyam – Account Deletion Policy
          </h1>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1539px] px-5 pt-10 pb-10 leading-loose lg:px-25">
          <div className="w-full leading-loose">
            <p className="text-md mt-2 font-semibold text-black">1. Purpose</p>
            <p>
              This policy explains how users of Bhartiyam can delete their account, what happens when they do so, what
              data is removed or retained, and under what conditions. Our goal is to give users control over their
              personal data and ensure transparency.{' '}
            </p>
          </div>

          <p className="text-md mt-2 font-semibold text-black">2. Scope</p>
          <p>
            This policy applies to all users who have created an account in the Bhartiyam (mobile/website) and any
            associated services (orders, loyalty points, app settings, etc.).
          </p>

          <p className="text-md mt-2 font-semibold text-black">3. How to Delete Your Account</p>
          <div className="w-full pl-5">
            <ul className="list-disc pl-6 leading-loose">
              <li>
                <p>Users can request deletion through the app:</p>
                <p>
                  Go to <b> Settings → Account → Delete Account</b>
                </p>
              </li>
              <li>
                Alternatively, users may submit a deletion request via our support email/portal: [care@bhartiyam.in] (or
                similar).
              </li>
            </ul>
          </div>

          <p className="text-md mt-2 font-semibold text-black">4. Verification</p>
          <div className="w-full pl-5">
            <ul className="list-disc pl-6 leading-loose">
              <li>
                Before deleting an account, the user may need to re-authenticate (password, OTP, or similar) to confirm
                identity.
              </li>
              <li>
                We may ask for confirmation that the user really wants to delete the account, explaining consequences
                (loss of data, inability to recover past orders, etc.).
              </li>
            </ul>
          </div>

          <p className="text-md mt-2 font-semibold text-black">5. What Data Gets Deleted</p>
          <div className="w-full pl-5">
            <p>When an account is deleted, we will permanently remove:</p>
            <ul className="list-disc pl-6 leading-loose">
              <li>Personal profile information (name, email, phone, etc.)</li>
              <li>Login credentials & authentication tokens</li>
              <li>App usage data, preferences, settings</li>
              <li>Any loyalty/points balances</li>
            </ul>
          </div>

          <p className="text-md mt-2 font-semibold text-black">6. What Data May Be Retained</p>
          <div className="w-full pl-5">
            <p>There are some exceptions. Certain data may be retained if:</p>
            <ul className="list-disc pl-6 leading-loose">
              <li>Required by law or regulation (e.g. tax, audit, fraud prevention)</li>
              <li>Needed for unresolved issues (e.g. pending payments, disputes)</li>
              <li>Retention is necessary for us to detect or prevent abuse/fraud</li>
              <li>Order history.</li>
            </ul>
            <p>
              If any data is to be retained, we will inform the user at the time of deletion request (or via our Privacy
              Policy) which data will remain and for how long.
            </p>
          </div>

          <p className="text-md mt-2 font-semibold text-black">7. Timeframe</p>
          <div className="w-full pl-5">
            <ul className="list-disc pl-6 leading-loose">
              <li>
                Once a deletion request is confirmed, we aim to complete the deletion of personal data within{' '}
                <b>30 days </b>{' '}
              </li>
              <li>Some data removal (e.g. backups, logs) may take longer.</li>
            </ul>
          </div>

          <p className="text-md mt-2 font-semibold text-black">7. Timeframe</p>
          <div className="w-full pl-5">
            <ul className="list-disc pl-6 leading-loose">
              <li>
                Once a deletion request is confirmed, we aim to complete the deletion of personal data within{' '}
                <b>30 days </b>{' '}
              </li>
              <li>Some data removal (e.g. backups, logs) may take longer.</li>
            </ul>
          </div>

          <p className="text-md mt-2 font-semibold text-black">8. Effect of Deletion</p>
          <div className="w-full pl-5">
            <ul className="list-disc pl-6 leading-loose">
              <li>After deletion, user will no longer be able to log in or access past orders / loyalty rewards. </li>
              <li>Deletion is irreversible (unless specifically stated otherwise).</li>
              <li>Notifications or subscriptions related to the account will cease.</li>
            </ul>
          </div>
          <p className="text-md mt-2 font-semibold text-black">9. Third-Party Data</p>
          <div className="w-full pl-5">
            <ul className="list-disc pl-6 leading-loose">
              <li>
                If user data has been shared with trusted third-parties (e.g. payment processors, delivery partners), we
                will request those third parties to delete user data as permitted under their policies.{' '}
              </li>
            </ul>
          </div>

          <p className="text-md mt-2 font-semibold text-black">10. Legal Rights & Compliance</p>
          <div className="w-full pl-5">
            <ul className="list-disc pl-6 leading-loose">
              <li>
                Our policy is in accordance with applicable laws (e.g. data protection/privacy laws, consumer
                protection) in India or other jurisdictions where we operate.{' '}
              </li>
              <li>
                Users have rights under laws such as the <b> IT Act / Personal Data Protection (if in force)</b> , etc.
              </li>
            </ul>
          </div>

          <p className="text-md mt-2 font-semibold text-black">11. Exceptions & Limitations</p>
          <div className="w-full pl-5">
            <ul className="list-disc pl-6 leading-loose">
              <li>
                If user has active subscriptions, outstanding payments, or pending disputes, we may require those to be
                resolved before deletion.{' '}
              </li>
              <li>
                Some data cannot be deleted immediately because of technical or regulatory reasons, but will be
                scheduled for deletion as soon as possible.
              </li>
            </ul>
          </div>
          <p className="text-md mt-2 font-semibold text-black">12. Contact & Support</p>
          <div className="w-full pl-5">
            <ul className="list-disc pl-6 leading-loose">
              <li>
                If you have questions about deleting your account or want to know what data remains, contact us at
                [support email / phone].
              </li>
              <li>We provide confirmation when the deletion is complete.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccountDelete;
