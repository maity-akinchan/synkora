export const CompanyLogos = () => {
  const companies = ["Pinterest", "Duolingo", "J.P.Morgan", "Revolut", "Mobbin"];

  return (
    <section className="py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-muted-foreground text-lg">Already chosen by the leaders</p>
        </div>

        <div className="relative">
          <div className="marquee whitespace-nowrap flex w-max animate-marquee">
            {/* Original + duplicate for seamless loop */}
            {[...companies, ...companies].map((company, index) => (
              <div
                key={index}
                className="text-2xl font-medium text-muted-foreground opacity-60 hover:opacity-100 transition-opacity duration-300 mx-8 flex-shrink-0"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};