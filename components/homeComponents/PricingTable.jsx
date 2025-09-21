import React from "react";

const PricingTable = () => {
  const plans = [
    {
      title: "Hourly",
      price: "$9",
      subtitle: "Hour Plan",
      features: [
        { text: "One Psd Design", available: true },
        { text: "One Html template", available: true },
        { text: "Responsive Design", available: true },
        { text: "One Time Support", available: true },
        { text: "24/7 Support", available: false },
      ],
    },
    {
      title: "Weekly",
      price: "$59",
      subtitle: "Week Plan",
      features: [
        { text: "5 Psd Designs", available: true },
        { text: "5 Html Templates", available: true },
        { text: "Responsive Design", available: true },
        { text: "One Time Support", available: true },
        { text: "24/7 Support", available: false },
      ],
    },
    {
      title: "Monthly",
      price: "$199",
      subtitle: "Month Plan",
      features: [
        { text: "Unlimited Psd Designs", available: true },
        { text: "Unlimited Html Templates", available: true },
        { text: "Responsive Design", available: true },
        { text: "Unlimited Support", available: true },
        { text: "24/7 Support", available: true },
      ],
    },
  ];

  return (
    <>
      <div className="text-center my-14">
        <h2 className="text-2xl md:text-4xl font-bold">Pricing table</h2>
      </div>

      <div className="flex justify-center items-start flex-wrap ">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="text-center bg-[var(--cardBg)] rounded-lg p-6 w-1/3"
          >
            <h3 className="text-4xl font-semibold mb-15 text-foreground">
              {plan.title}
            </h3>
            <h2 className="text-5xl font-bold mb-1 text-foreground">
              {plan.price}
            </h2>
            <p className="text-base font-normal">{plan.subtitle}</p>
            <ul className="my-10">
              {plan.features.map((feature, i) => (
                <li
                  key={i}
                  className={`mb-4 ${
                    feature.available
                      ? "text-[var(--textColor)]"
                      : "line-through text-gray-600"
                  }`}
                >
                  {feature.text}
                </li>
              ))}
            </ul>
            <button className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition">
              Hire Me
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default PricingTable;
