// export const CompanyLogos = () => {
//   const companies = [
//     { name: "Headspace", url: "https://cdn.simpleicons.org/headspace/6b7280" },
//     { name: "Shopify", url: "https://cdn.simpleicons.org/shopify/6b7280" },
//     { name: "Volvo", url: "https://cdn.simpleicons.org/volvo/6b7280" },
//     { name: "Pinterest", url: "https://cdn.simpleicons.org/pinterest/6b7280" },
//     { name: "Duolingo", url: "https://cdn.simpleicons.org/duolingo/6b7280" },
//   ];

//   return (
//     <section className="py-16 bg-background overflow-hidden">
//       <div className="container mx-auto px-6">
//         <div className="text-center mb-8">
//           <p className="text-muted-foreground text-sm md:text-base">Already chosen by the leaders</p>
//         </div>

//         <div className="relative select-none">
//           <div className="marquee flex w-max items-center gap-14 opacity-60 hover:opacity-90 transition-opacity duration-300 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
//             {[...companies, ...companies].map((company, index) => (
//               <div key={`${company.name}-${index}`} className="flex-shrink-0">
//                 <img
//                   src={company.url}
//                   alt={`${company.name} logo`}
//                   className="h-8 w-auto md:h-9 grayscale brightness-125"
//                   loading="lazy"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

export const CompanyLogos = () => {
  const companies = [
    { name: "Headspace", url: "https://cdn.simpleicons.org/headspace/6b7280" },
    { name: "Shopify", url: "https://cdn.simpleicons.org/shopify/6b7280" },
    { name: "Volvo", url: "https://cdn.simpleicons.org/volvo/6b7280" },
    { name: "Pinterest", url: "https://cdn.simpleicons.org/pinterest/6b7280" },
    { name: "Duolingo", url: "https://cdn.simpleicons.org/duolingo/6b7280" },
  ];

  return (
    <section className="py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-muted-foreground text-sm md:text-base">Already chosen by the leaders</p>
        </div>

        <div className="relative select-none">
          <div className="marquee flex w-max items-center gap-14 opacity-60 hover:opacity-90 transition-opacity duration-300 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            {[...companies, ...companies].map((company, index) => (
              <div key={`${company.name}-${index}`} className="flex-shrink-0">
                <img
                  src={company.url}
                  alt={`${company.name} logo`}
                  className="h-8 w-auto md:h-9 grayscale brightness-125"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
