import Container from '@/components/shared/ui/container';

const TermsCondition = () => {
  return (
    <>
      {/* Header Section */}
      <section className="bg-gray-100">
        <Container className="mx-auto px-5 py-10 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-balance text-black sm:text-2xl md:text-3xl">Terms of Use</h1>
        </Container>
      </section>

      {/* Content Section */}
      <section className="bg-white py-12 md:py-16">
        <Container className="mx-auto px-5 sm:px-6 lg:px-8">
          <div className="prose prose-gray max-w-none">
            <p className="text-base leading-relaxed text-gray-700">
              Welcome to Bhartiyam, a proud brand of Kamna Mart Private Limited ('Company', 'we', 'our', 'us'). By
              accessing or using our website, mobile application, or services (collectively, the 'Platform'), you agree
              to be bound by these Terms of Use ('Terms'). If you don't agree, please do not use our Platform.
            </p>

            <h2 className="mt-8 text-xl font-semibold text-gray-900">
              Bhartiyam offers a 30-minute return and exchange service for all products
            </h2>

            <p className="mt-4 text-base leading-relaxed text-gray-700">
              A standard 'Term & Conditions' return policy will be applicable for other issues which states that
              products are non-returnable unless they are:
            </p>

            <h3 className="mt-8 text-lg font-semibold text-gray-900">1. Eligibility</h3>
            <p className="mt-4 text-base leading-relaxed text-gray-700">
              You must be at least 18 years old or accessing under the supervision of a legal guardian. You agree to
              provide accurate and complete information while creating an account or placing orders.
            </p>

            <h3 className="mt-8 text-lg font-semibold text-gray-900">2. Account & Responsibilities</h3>
            <ul className="mt-4 space-y-3 pl-6 text-base leading-relaxed text-gray-700">
              <li className="flex gap-2">
                <span className="mt-1.5 text-black">•</span>
                <span>You are responsible for maintaining the confidentiality of your login details.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-black">•</span>
                <span>Any activity under your account will be deemed as your responsibility.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-black">•</span>
                <span>
                  Misuse, fraudulent activity, or breach of these 'Terms' may result in suspension or termination of
                  your account.
                </span>
              </li>
            </ul>

            <h3 className="mt-8 text-lg font-semibold text-gray-900">3. Products & Services</h3>
            <ul className="mt-4 space-y-3 pl-6 text-base leading-relaxed text-gray-700">
              <li className="flex gap-2">
                <span className="mt-1.5 text-black">•</span>
                <span>All products and services listed are subject to availability.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-black">•</span>
                <span>Prices, offers, and product descriptions may change without prior notice.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-black">•</span>
                <span>We reserve the right to limit quantities of certain items purchased.</span>
              </li>
            </ul>

            <h3 className="mt-8 text-lg font-semibold text-gray-900">4. Orders & Payments</h3>
            <ul className="mt-4 space-y-3 pl-6 text-base leading-relaxed text-gray-700">
              <li className="flex gap-2">
                <span className="mt-1.5 text-black">•</span>
                <span>
                  By placing an order, you agree to provide accurate information and authorize us to charge the selected
                  payment method.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-black">•</span>
                <span>
                  Payment methods include credit/debit cards, UPI, net banking, cash on delivery (COD) (where
                  available), and other options displayed at checkout.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-black">•</span>
                <span>
                  Orders may be canceled or refused at our discretion due to pricing errors, stock unavailability, or
                  fraudulent activity.
                </span>
              </li>
            </ul>

            <h3 className="mt-8 text-lg font-semibold text-gray-900">5. Delivery & Shipping</h3>
            <ul className="mt-4 space-y-3 pl-6 text-base leading-relaxed text-gray-700">
              <li className="flex gap-2">
                <span className="mt-1.5 text-black">•</span>
                <span>
                  We strive to deliver products within the estimated timelines. However, delays may occur due to
                  logistics or any unforeseen circumstances.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-black">•</span>
                <span>Shipping charges (if any) will be displayed at checkout.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-black">•</span>
                <span>Risk of loss passes to you once the product is delivered.</span>
              </li>
            </ul>

            <h3 className="mt-8 text-lg font-semibold text-gray-900">6. Returns & Refunds</h3>
            <ul className="mt-4 space-y-3 pl-6 text-base leading-relaxed text-gray-700">
              <li className="flex gap-2">
                <span className="mt-1.5 text-black">•</span>
                <span>Our 'Return & Exchange Policy' governs all returns, replacements, and refunds.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-black">•</span>
                <span>Products must be returned in original condition, unused, and with tags/packaging intact.</span>
              </li>
            </ul>

            <h3 className="mt-8 text-lg font-semibold text-gray-900">7. Acceptable Use</h3>
            <p className="mt-4 text-base leading-relaxed text-gray-700">You agree 'not to':</p>
            <ul className="mt-4 space-y-3 pl-6 text-base leading-relaxed text-gray-700">
              <li className="flex gap-2">
                <span className="mt-1.5 text-black">•</span>
                <span>Use the Platform for unlawful purposes.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-black">•</span>
                <span>Distribute viruses, spam, or harmful content.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-black">•</span>
                <span>Resell, duplicate, or exploit the Platform for unauthorized purposes.</span>
              </li>
            </ul>

            <h3 className="mt-8 text-lg font-semibold text-gray-900">8. Intellectual Property</h3>
            <ul className="mt-4 space-y-3 pl-6 text-base leading-relaxed text-gray-700">
              <li className="flex gap-2">
                <span className="mt-1.5 text-black">•</span>
                <span>
                  All content, including logos, designs, text, graphics, and software, is the property of Bhartiyam or
                  its licensors.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-black">•</span>
                <span>You may not reproduce, copy, or use our intellectual property without written consent.</span>
              </li>
            </ul>

            <h3 className="mt-8 text-lg font-semibold text-gray-900">9. Limitation of Liability</h3>
            <ul className="mt-4 space-y-3 pl-6 text-base leading-relaxed text-gray-700">
              <li className="flex gap-2">
                <span className="mt-1.5 text-black">•</span>
                <span>
                  Bhartiyam will not be liable for indirect, incidental, or consequential damages arising out of your
                  use of the Platform.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-black">•</span>
                <span>Our total liability shall not exceed the value of the product purchased.</span>
              </li>
            </ul>

            <h3 className="mt-8 text-lg font-semibold text-gray-900">10. Privacy Policy</h3>
            <p className="mt-4 text-base leading-relaxed text-gray-700">
              Your use of the Platform is also governed by our Privacy Policy, which outlines how we collect, use, and
              protect your information.
            </p>

            <h3 className="mt-8 text-lg font-semibold text-gray-900">11. Changes to Terms</h3>
            <p className="mt-4 text-base leading-relaxed text-gray-700">
              We may update these Terms from time to time. Continued use of the Platform after updates constitutes
              acceptance of the revised Terms.
            </p>

            <h3 className="mt-8 text-lg font-semibold text-gray-900">12. Governing Law & Jurisdiction</h3>
            <ul className="mt-4 space-y-3 pl-6 text-base leading-relaxed text-gray-700">
              <li className="flex gap-2">
                <span className="mt-1.5 text-black">•</span>
                <span>These Terms are as per the laws of India.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-black">•</span>
                <span>
                  Any disputes will be subject to the exclusive jurisdiction of the courts of [Insert City, e.g.,
                  Lucknow/Delhi].
                </span>
              </li>
            </ul>

            <h3 className="mt-8 text-lg font-semibold text-gray-900">13. Contact Us</h3>
            <p className="mt-4 text-base leading-relaxed text-gray-700">
              Please feel free to contact us for any queries, feedback, or complaints:
            </p>
            <p className="mt-4 text-base leading-relaxed text-gray-700">'Bhartiyam – Kamna Mart Private Limited'</p>
            <p className="mt-2 text-base leading-relaxed text-gray-700">
              <strong>Email:</strong>{' '}
              <a href="mailto:care@bhartiyam.in" className="font-semibold text-black">
                care@bhartiyam.in
              </a>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default TermsCondition;
