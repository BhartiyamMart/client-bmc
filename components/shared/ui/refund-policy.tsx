import Container from '@/components/shared/ui/container';

const RefundPolicy = () => {
  return (
    <>
      {/* Header Section */}
      <section className="bg-gray-100">
        <Container className="mx-auto px-5 py-10 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-balance text-black sm:text-2xl md:text-3xl">
            Bhartiyam – Refund Policy
          </h1>
        </Container>
      </section>

      {/* Content Section */}
      <section className="bg-white py-12 md:py-16">
        <Container className="mx-auto px-5 sm:px-6 lg:px-8">
          <p className="text-base leading-relaxed text-gray-700">
            At <strong>Bhartiyam Mart</strong>, customer satisfaction is our top priority. We work hard to provide
            fresh, quality products and a smooth shopping experience. If you are not fully satisfied with your purchase,
            our refund policy is designed to help you.
          </p>

          <h2 className="mt-8 text-lg font-semibold text-gray-900">1. Eligibility for Refunds</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-700">
            You may request a refund in the following cases:
          </p>
          <ul className="mt-4 space-y-3 pl-6 text-base leading-relaxed text-gray-700">
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>
                You received the <strong>wrong product</strong>.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>
                The product was <strong>damaged, expired, or defective</strong> at the time of delivery/purchase.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>
                You were <strong>overcharged</strong> due to a billing or payment error.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>Delivery was not completed due to our service issue.</span>
            </li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold text-gray-900">2. Non-Refundable Items</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-700">Refunds will not be issued for:</p>
          <ul className="mt-4 space-y-3 pl-6 text-base leading-relaxed text-gray-700">
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>Products damaged due to customer mishandling after delivery.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>
                Items that have been <strong>opened, partially used, or consumed</strong>.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>
                Perishable items (like fruits, vegetables, dairy, frozen food){' '}
                <strong>unless delivered damaged/expired</strong>.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>Discounted/offer items marked "No Refund/No Exchange".</span>
            </li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold text-gray-900">3. Refund Request Process</h2>
          <ul className="mt-4 space-y-3 pl-6 text-base leading-relaxed text-gray-700">
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>Customers must raise a refund request within 24 hours of delivery/purchase.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <div>
                <span>You can request through:</span>
                <ul className="mt-2 space-y-2 pl-4">
                  <li className="flex gap-2">
                    <span className="text-orange-600">◦</span>
                    <span>
                      <strong>App/Website:</strong> Go to "My Orders → Refund/Return Request"
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-orange-600">◦</span>
                    <span>
                      <strong>WhatsApp Support/Helpline</strong>
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-orange-600">◦</span>
                    <span>
                      <strong>In-Store Counter</strong> (for offline purchases)
                    </span>
                  </li>
                </ul>
              </div>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>Proof may be required (photo/video of damaged/expired item).</span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>Discounted/offer items marked "No Refund/No Exchange".</span>
            </li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold text-gray-900">4. Refund Method & Timeline</h2>
          <ul className="mt-4 space-y-3 pl-6 text-base leading-relaxed text-gray-700">
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>Refunds will be processed within 7 working days after approval.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <div>
                <span>Refunds may be issued as:</span>
                <ul className="mt-2 space-y-2 pl-4">
                  <li className="flex gap-2">
                    <span className="text-black">•</span>
                    <span>
                      <strong>Original Payment Method</strong> (UPI, card, wallet, etc.)
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-black">•</span>
                    <span>
                      <strong>Store Credit / Wallet Balance</strong> (usable for future purchases)
                    </span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold text-gray-900">5. Exchange Option</h2>
          <ul className="mt-4 space-y-3 pl-6 text-base leading-relaxed text-gray-700">
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>
                Instead of a refund, customers may choose a replacement product of equal value (where available).
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>Exchanges will be completed at the earliest possible delivery slot.</span>
            </li>
          </ul>

          <h2 className="mt-8 text-lg font-semibold text-gray-900">6. Special Conditions</h2>
          <ul className="mt-4 space-y-3 pl-6 text-base leading-relaxed text-gray-700">
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>
                For <strong>cash-on-delivery orders</strong>, refunds will be made via{' '}
                <strong>UPI/Bank Transfer</strong>.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>
                For <strong>bulk/society orders</strong>, refunds may take longer due to settlement.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-black">•</span>
              <span>
                Bhartiyam reserves the right to <strong>reject refund requests</strong> that do not meet policy
                conditions.
              </span>
            </li>
          </ul>
        </Container>
      </section>
    </>
  );
};

export default RefundPolicy;
