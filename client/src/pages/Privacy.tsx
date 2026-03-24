export default function Privacy() {
  return (
    <div className="min-h-screen">
      <section className="pt-24 pb-12 px-4 border-b border-black/10 bg-[#fcfcfc]">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Privacy Policy</h1>
          <p className="text-black/60">
            We collect only what we need to respond to requests and improve the service.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl" data-testid="text-privacy-body">
          <div className="space-y-10 text-sm leading-relaxed text-black/70">
            <div>
              <h2 className="text-lg font-bold text-black mb-2">Information we collect</h2>
              <p>
                When you submit a form, we may collect your name, business name, email, phone number, and any details you
                include about your workflow.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-black mb-2">How we use information</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>To contact you and schedule a call or demo.</li>
                <li>To evaluate fit and propose an automation plan.</li>
                <li>To maintain security, prevent abuse, and improve reliability.</li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-bold text-black mb-2">Data retention</h2>
              <p>
                We retain information only as long as needed for business purposes, legal requirements, and ongoing
                communications.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-black mb-2">Contact</h2>
              <p>
                For privacy questions, contact us through the Contact page.
              </p>
            </div>
            <p className="text-xs text-black/40">Last updated: February 25, 2026</p>
          </div>
        </div>
      </section>
    </div>
  );
}
