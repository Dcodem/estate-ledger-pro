export interface TxnEntry {
  id: string;
  vendor: string;
  date: string;
  amount: string;
  icon: string;
  method: string;
  property: string;
  category: string;
  bankAccount: string;
  description: string;
}

export interface DuplicatePair {
  label: string;
  match: number;
  level: "high" | "medium" | "low";
  reason: string;
  a: TxnEntry;
  b: TxnEntry;
}

export const pairs: DuplicatePair[] = [
  {
    label: "Pair #1",
    match: 98,
    level: "high",
    reason: "Same vendor, date, amount, and bank account — likely a bank feed sync error.",
    a: { id: "TR-8821", vendor: "L'Avenue Luxury Property Mgmt", date: "Oct 24, 2023", amount: "$12,450.00", icon: "receipt", method: "Bank Transfer", property: "Bel Air Estate", category: "Property Management", bankAccount: "Chase Platinum (***8842)", description: "Monthly property management fee for the Bel Air Estate covering October 2023. Includes concierge services, maintenance coordination, and tenant relations." },
    b: { id: "TR-8822", vendor: "L'Avenue Luxury Property Mgmt", date: "Oct 24, 2023", amount: "$12,450.00", icon: "description", method: "Bank Transfer", property: "Bel Air Estate", category: "Property Management", bankAccount: "Chase Platinum (***8842)", description: "Duplicate entry from bank feed sync. Same vendor, date, and amount as TR-8821. Likely a processing error during the October batch import." },
  },
  {
    label: "Pair #2",
    match: 74,
    level: "medium",
    reason: "Same vendor and date, but amounts differ by $50 and different payment methods were used.",
    a: { id: "TR-9104", vendor: "Bel Air Gardens & Pool", date: "Nov 02, 2023", amount: "$2,100.00", icon: "park", method: "Auto-Pay", property: "Bel Air Estate", category: "Maintenance", bankAccount: "Wells Fargo (***3391)", description: "Monthly landscaping and pool maintenance service for the Bel Air Estate property. Covers lawn care, hedge trimming, and pool chemical balancing." },
    b: { id: "TR-9107", vendor: "Bel Air Gardens & Pool", date: "Nov 02, 2023", amount: "$2,150.00", icon: "pool", method: "Amex Platinum", property: "Bel Air Estate", category: "Maintenance", bankAccount: "Amex Platinum (***7724)", description: "Pool servicing and emergency filter replacement for the Bel Air Estate. $50 surcharge for after-hours service call to repair filtration unit." },
  },
  {
    label: "Pair #3",
    match: 42,
    level: "low",
    reason: "Same amount and category, but different vendors and dates — likely separate transactions.",
    a: { id: "TR-8950", vendor: "Aria Private Jets Ltd", date: "Oct 15, 2023", amount: "$45,000.00", icon: "flight", method: "Wire Transfer", property: "N/A — Personal", category: "Travel", bankAccount: "Chase Platinum (***8842)", description: "Private charter flight booking for property inspection trip. Round trip Beverly Hills to Aspen, 2 passengers. Includes crew standby fees." },
    b: { id: "TR-8973", vendor: "NetJets Executive", date: "Oct 18, 2023", amount: "$45,000.00", icon: "flight_takeoff", method: "Wire Transfer", property: "N/A — Personal", category: "Travel", bankAccount: "Chase Platinum (***8842)", description: "Fractional jet ownership quarterly usage fee. Pre-paid block hours for Q4 2023 through NetJets executive program." },
  },
  {
    label: "Pair #4",
    match: 91,
    level: "high",
    reason: "Same vendor, same amount, and same bank account — appears to be a duplicate insurance premium payment processed twice.",
    a: { id: "TR-9210", vendor: "Chubb Elite Property Insurance", date: "Nov 10, 2023", amount: "$8,750.00", icon: "shield", method: "Auto-Pay", property: "Bel Air Estate", category: "Insurance", bankAccount: "Chase Platinum (***8842)", description: "Quarterly property insurance premium for the Bel Air Estate. Comprehensive coverage including earthquake, flood, and high-value contents protection." },
    b: { id: "TR-9211", vendor: "Chubb Elite Property Insurance", date: "Nov 10, 2023", amount: "$8,750.00", icon: "verified_user", method: "Auto-Pay", property: "Bel Air Estate", category: "Insurance", bankAccount: "Chase Platinum (***8842)", description: "Duplicate auto-pay trigger for Chubb quarterly premium. System processed payment twice due to bank confirmation delay on Nov 10." },
  },
  {
    label: "Pair #5",
    match: 65,
    level: "medium",
    reason: "Same vendor and similar amounts, but transactions are 12 days apart — could be a late re-billing or a separate service call.",
    a: { id: "TR-9305", vendor: "Sterling HVAC & Climate Systems", date: "Nov 15, 2023", amount: "$3,200.00", icon: "ac_unit", method: "Bank Transfer", property: "Malibu Beach House", category: "Maintenance", bankAccount: "Wells Fargo (***3391)", description: "Scheduled annual HVAC maintenance and filter replacement for the Malibu Beach House. Includes inspection of all three climate zones." },
    b: { id: "TR-9342", vendor: "Sterling HVAC & Climate Systems", date: "Nov 27, 2023", amount: "$3,400.00", icon: "thermostat", method: "Bank Transfer", property: "Malibu Beach House", category: "Maintenance", bankAccount: "Wells Fargo (***3391)", description: "Emergency HVAC repair call for Malibu Beach House master suite zone. Compressor replacement and refrigerant recharge. $200 after-hours surcharge included." },
  },
  {
    label: "Pair #6",
    match: 38,
    level: "low",
    reason: "Different vendors and different dates, but identical amount and category — most likely coincidental.",
    a: { id: "TR-9088", vendor: "Artisan Stone & Marble Co.", date: "Nov 01, 2023", amount: "$18,500.00", icon: "countertops", method: "Wire Transfer", property: "Aspen Ski Lodge", category: "Renovation", bankAccount: "Chase Platinum (***8842)", description: "Custom Italian marble countertop installation for the Aspen Ski Lodge kitchen remodel. Includes Calacatta Gold slab sourcing and precision cutting." },
    b: { id: "TR-9155", vendor: "Prescott Custom Cabinetry", date: "Nov 08, 2023", amount: "$18,500.00", icon: "kitchen", method: "Wire Transfer", property: "Aspen Ski Lodge", category: "Renovation", bankAccount: "Chase Platinum (***8842)", description: "Handcrafted walnut cabinetry for the Aspen Ski Lodge kitchen renovation. Phase 2 of 3 — upper cabinets, island build-out, and hardware fitting." },
  },
  {
    label: "Pair #7",
    match: 95,
    level: "high",
    reason: "Exact match on vendor, amount, category, and bank account — strong indicator of a double-posted monthly fee.",
    a: { id: "TR-9401", vendor: "Montecito Security Services", date: "Dec 01, 2023", amount: "$6,800.00", icon: "security", method: "Auto-Pay", property: "Bel Air Estate", category: "Security", bankAccount: "Wells Fargo (***3391)", description: "Monthly 24/7 security patrol and monitoring fee for the Bel Air Estate. Includes armed response team, CCTV monitoring, and perimeter checks." },
    b: { id: "TR-9402", vendor: "Montecito Security Services", date: "Dec 01, 2023", amount: "$6,800.00", icon: "local_police", method: "Auto-Pay", property: "Bel Air Estate", category: "Security", bankAccount: "Wells Fargo (***3391)", description: "Duplicate auto-pay entry for Montecito Security monthly fee. Same amount and date as TR-9401 — likely triggered by a billing system retry." },
  },
];
