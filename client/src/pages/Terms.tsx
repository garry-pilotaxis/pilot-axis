export default function Terms() {
  return (
    <div className="min-h-screen">
      <section className="pt-24 pb-12 px-4 border-b border-black/10 bg-[#fcfcfc]">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Terms of Service</h1>
          <p className="text-black/60">
            Clear terms. No surprises.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl" data-testid="text-terms-body">
          <div className="space-y-10 text-sm leading-relaxed text-black/70">
            <div>
              <h2 className="text-lg font-bold text-black mb-2">Use of the site</h2>
              <p>
                You may use this site to learn about Pilot Axis and request a consultation. Do not attempt to disrupt or
                misuse the site.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-black mb-2">No guarantees</h2>
              <p>
                We aim for high reliability, but outcomes depend on your business, call volume, and operational constraints.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-black mb-2">Confidentiality</h2>
              <p>
                Information you share may be used to evaluate and design a proposed system. We treat sensitive operational
                details with care.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-black mb-2">Contact</h2>
              <p>
                Questions about these terms can be sent via the Contact page.
              </p>
            </div>
            <p className="text-xs text-black/40">Last updated: February 25, 2026</p>
          </div>
        </div>
      </section>
    </div>
  );
}
