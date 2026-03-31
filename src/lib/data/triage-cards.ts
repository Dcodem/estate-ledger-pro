export interface ReviewCard {
  id: number;
  vendor: string;
  date: string;
  icon: string;
  suggestion: string;
  confidence: number;
  confDotClass: string;
  confBgClass: string;
  confTextClass: string;
  amount: string;
  property: string;
  source: string;
  location: string;
  ref: string;
  recommendation: string;
  similarTransactions: { vendor: string; date: string; amount: string }[];
}

export const initialCards: ReviewCard[] = [
  {
    id: 1,
    vendor: "Royal Warrant Florists",
    date: "Mar 13",
    icon: "local_florist",
    suggestion: "Hospitality",
    confidence: 88,
    confDotClass: "bg-green-500",
    confBgClass: "bg-green-50",
    confTextClass: "text-green-700",
    amount: "\u00A38,420.00",
    property: "Kensington Manor",
    source: "Coutts & Co. (***2201)",
    location: "Mayfair, London",
    ref: "#TX-KEN-0044",
    recommendation:
      "This vendor holds a Royal Warrant and has supplied floral arrangements for Kensington Manor events 6 times in the past 12 months. High confidence match to Hospitality.",
    similarTransactions: [
      { vendor: "Royal Warrant Florists", date: "Feb 10, 2024", amount: "\u00A37,800.00" },
      { vendor: "Royal Warrant Florists", date: "Dec 22, 2023", amount: "\u00A312,600.00" },
    ],
  },
  {
    id: 2,
    vendor: "Savills Estate Agency",
    date: "Mar 11",
    icon: "real_estate_agent",
    suggestion: "Estate Management",
    confidence: 96,
    confDotClass: "bg-green-500",
    confBgClass: "bg-green-50",
    confTextClass: "text-green-700",
    amount: "\u00A315,000.00",
    property: "Windsor Lodge",
    source: "Coutts & Co. (***2201)",
    location: "Windsor, Berkshire",
    ref: "#TX-WIN-0041",
    recommendation:
      "Quarterly estate management fee from Savills. This matches the recurring pattern exactly \u2014 same amount, same date window, same account. Auto-classification recommended.",
    similarTransactions: [
      { vendor: "Savills Estate Agency", date: "Dec 11, 2023", amount: "\u00A315,000.00" },
      { vendor: "Savills Estate Agency", date: "Sep 11, 2023", amount: "\u00A315,000.00" },
      { vendor: "Savills Estate Agency", date: "Jun 11, 2023", amount: "\u00A314,500.00" },
    ],
  },
  {
    id: 3,
    vendor: "Garrard & Co. Jewellers",
    date: "Mar 10",
    icon: "diamond",
    suggestion: "Art & Antiques",
    confidence: 52,
    confDotClass: "bg-yellow-500",
    confBgClass: "bg-yellow-50",
    confTextClass: "text-yellow-700",
    amount: "\u00A324,750.00",
    property: "Kensington Manor",
    source: "Drummonds (***5587)",
    location: "Mayfair, London",
    ref: "#TX-KEN-0039",
    recommendation:
      "Garrard holds the oldest Royal Warrant for jewellery. This transaction appears to be a silverware restoration commission. The amount is higher than typical maintenance \u2014 manual verification is recommended to confirm whether this should be Art & Antiques or Capital Improvement.",
    similarTransactions: [
      { vendor: "Garrard & Co.", date: "Oct 15, 2023", amount: "\u00A318,200.00" },
      { vendor: "Asprey London", date: "Aug 3, 2023", amount: "\u00A39,400.00" },
    ],
  },
  {
    id: 4,
    vendor: "Duchy Organic Farm Shop",
    date: "Mar 8",
    icon: "restaurant",
    suggestion: "Hospitality",
    confidence: 94,
    confDotClass: "bg-green-500",
    confBgClass: "bg-green-50",
    confTextClass: "text-green-700",
    amount: "\u00A31,840.00",
    property: "Windsor Lodge",
    source: "Coutts & Co. (***2201)",
    location: "Tetbury, Gloucestershire",
    ref: "#TX-WIN-0036",
    recommendation:
      "Recurring provisions order from the Duchy farm shop. Previous 8 transactions match this vendor and amount range. High confidence classification under Hospitality for estate kitchen supplies.",
    similarTransactions: [
      { vendor: "Duchy Organic Farm Shop", date: "Feb 8, 2024", amount: "\u00A31,680.00" },
      { vendor: "Duchy Organic Farm Shop", date: "Jan 8, 2024", amount: "\u00A31,920.00" },
      { vendor: "Duchy Organic Farm Shop", date: "Dec 8, 2023", amount: "\u00A32,100.00" },
    ],
  },
  {
    id: 5,
    vendor: "Hiscox Private Client",
    date: "Mar 5",
    icon: "shield",
    suggestion: "Insurance",
    confidence: 99,
    confDotClass: "bg-green-500",
    confBgClass: "bg-green-50",
    confTextClass: "text-green-700",
    amount: "\u00A342,500.00",
    property: "Kensington Manor",
    source: "Coutts & Co. (***2201)",
    location: "London, EC3",
    ref: "#TX-KEN-0033",
    recommendation:
      "Annual high-net-worth property and contents insurance premium via Hiscox. Covers fine art, antiques, and listed building restoration. Matches previous year exactly.",
    similarTransactions: [
      { vendor: "Hiscox Private Client", date: "Mar 5, 2023", amount: "\u00A341,800.00" },
      { vendor: "Hiscox Private Client", date: "Mar 5, 2022", amount: "\u00A339,200.00" },
    ],
  },
  {
    id: 6,
    vendor: "Crown Estate Grounds Ltd",
    date: "Mar 3",
    icon: "park",
    suggestion: "Groundskeeping",
    confidence: 100,
    confDotClass: "bg-green-500",
    confBgClass: "bg-green-50",
    confTextClass: "text-green-700",
    amount: "\u00A34,200.00",
    property: "Windsor Lodge",
    source: "Drummonds (***5587)",
    location: "Windsor, Berkshire",
    ref: "#TX-WIN-0030",
    recommendation:
      "Monthly grounds maintenance for the Windsor Lodge estate. Vendor, amount, and cadence match exactly. High confidence auto-classification.",
    similarTransactions: [
      { vendor: "Crown Estate Grounds Ltd", date: "Feb 3, 2024", amount: "\u00A34,200.00" },
      { vendor: "Crown Estate Grounds Ltd", date: "Jan 3, 2024", amount: "\u00A34,200.00" },
    ],
  },
  {
    id: 7,
    vendor: "Berry Bros. & Rudd",
    date: "Mar 1",
    icon: "wine_bar",
    suggestion: "Hospitality",
    confidence: 68,
    confDotClass: "bg-yellow-500",
    confBgClass: "bg-yellow-50",
    confTextClass: "text-yellow-700",
    amount: "\u00A36,750.00",
    property: "Belgravia Townhouse",
    source: "Drummonds (***5587)",
    location: "St James\u2019s, London",
    ref: "#TX-BEL-0028",
    recommendation:
      "Wine cellar replenishment from Britain\u2019s oldest wine merchant (est. 1698). This vendor has been linked to both Hospitality and Art & Antiques in the past. The amount suggests a mixed order \u2014 manual review recommended.",
    similarTransactions: [
      { vendor: "Berry Bros. & Rudd", date: "Dec 18, 2023", amount: "\u00A38,200.00" },
      { vendor: "Justerini & Brooks", date: "Nov 5, 2023", amount: "\u00A34,500.00" },
    ],
  },
];
