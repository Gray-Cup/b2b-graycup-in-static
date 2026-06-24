export interface BulkCity {
  city: string;
  citySlug: string;
  state: string;
  stateSlug: string;
  transitDays: string;
  moq: string;
  cityContext: string;
  buyerTypes: string[];
  products: string[];
  nearbyAreas: string[];
  coordinates: { lat: number; lng: number };
  faqs: { question: string; answer: string }[];
}

export const bulkCities: BulkCity[] = [
  {
    city: "New Delhi",
    citySlug: "new-delhi",
    state: "Delhi NCR",
    stateSlug: "delhi-ncr",
    transitDays: "2–3 days",
    moq: "25 kg",
    cityContext:
      "Delhi NCR is India's largest B2B hub for bulk tea and coffee. Corporate campuses, hotel chains, airline caterers, and specialty cafés across the NCR source in bulk from us.",
    buyerTypes: ["Corporate Offices", "Hotel Chains", "Café Chains", "Caterers", "Distributors"],
    products: ["Bulk CTC Tea", "Green Coffee Beans", "Roasted Coffee", "Loose Leaf Tea"],
    nearbyAreas: ["Gurgaon", "Noida", "Faridabad", "Ghaziabad"],
    coordinates: { lat: 28.6139, lng: 77.209 },
    faqs: [
      {
        question: "What products can Delhi NCR businesses buy in bulk from B2B Gray Cup?",
        answer:
          "We supply bulk CTC tea, green coffee beans, roasted coffee, and loose-leaf tea to corporate offices, hotels, and cafés across Delhi, Gurgaon, Noida, and Faridabad. GST invoice provided.",
      },
      {
        question: "What is the minimum order for bulk tea or coffee delivery to Delhi NCR?",
        answer:
          "Minimum order is 25 kg per SKU for Delhi NCR. Regular buyers can negotiate flexible terms. First-time buyers can request trial packs before committing.",
      },
    ],
  },
  {
    city: "Mumbai",
    citySlug: "mumbai",
    state: "Maharashtra",
    stateSlug: "maharashtra",
    transitDays: "3–4 days",
    moq: "25 kg",
    cityContext:
      "Mumbai's concentration of five-star hotels, restaurant chains, FMCG distributors, and corporate campuses makes it one of India's largest bulk tea and coffee markets.",
    buyerTypes: ["Hotel Chains", "Restaurant Groups", "FMCG Distributors", "Corporate Campuses", "Café Chains"],
    products: ["Bulk CTC Tea", "Roasted Coffee", "Green Coffee Beans", "Loose Leaf Tea"],
    nearbyAreas: ["Thane", "Navi Mumbai", "Kalyan", "Pune"],
    coordinates: { lat: 19.076, lng: 72.8777 },
    faqs: [
      {
        question: "Do you supply bulk tea and coffee to Mumbai's five-star hotels?",
        answer:
          "Yes — we supply CTC tea, loose-leaf tea, and roasted coffee to Mumbai's hospitality sector including five-star hotels and restaurant chains. Contact us for institutional pricing.",
      },
    ],
  },
  {
    city: "Bengaluru",
    citySlug: "bengaluru",
    state: "Karnataka",
    stateSlug: "karnataka",
    transitDays: "4–5 days",
    moq: "25 kg",
    cityContext:
      "Bengaluru's massive tech campus ecosystem, specialty café scene, and startup culture create one of India's most dynamic bulk beverage markets. Roasters, cafés, and corporate offices are our primary buyers.",
    buyerTypes: ["Tech Campus F&B", "Specialty Cafés", "Corporate Offices", "Roasters", "Hotel Chains"],
    products: ["Green Coffee Beans", "Roasted Coffee", "Bulk CTC Tea", "Loose Leaf Tea"],
    nearbyAreas: ["Whitefield", "Electronic City", "Koramangala", "Indiranagar"],
    coordinates: { lat: 12.9716, lng: 77.5946 },
    faqs: [
      {
        question: "Can Bengaluru tech campuses buy bulk tea and coffee from B2B Gray Cup?",
        answer:
          "Yes — we supply to IT campuses, cafeteria operators, and café chains across Bengaluru. Products include CTC chai, roasted coffee, and green beans. Flexible MOQ from 25 kg.",
      },
    ],
  },
  {
    city: "Hyderabad",
    citySlug: "hyderabad",
    state: "Telangana",
    stateSlug: "telangana",
    transitDays: "3–5 days",
    moq: "25 kg",
    cityContext:
      "Hyderabad's HITEC City tech corridor, large hospitality sector, and growing café culture make it a strong market for bulk tea and coffee supply across multiple buyer categories.",
    buyerTypes: ["Tech Campus F&B", "Hotel Chains", "Restaurant Groups", "Corporate Offices", "Distributors"],
    products: ["Bulk CTC Tea", "Roasted Coffee", "Green Coffee Beans", "Loose Leaf Tea"],
    nearbyAreas: ["Secunderabad", "Cyberabad", "Gachibowli", "Banjara Hills"],
    coordinates: { lat: 17.385, lng: 78.4867 },
    faqs: [
      {
        question: "What is the delivery timeline for bulk tea to Hyderabad?",
        answer:
          "Standard delivery to Hyderabad is 3–5 days from order confirmation. We supply bulk CTC tea, roasted coffee, and green beans to corporate campuses, hotels, and distributors.",
      },
    ],
  },
  {
    city: "Chennai",
    citySlug: "chennai",
    state: "Tamil Nadu",
    stateSlug: "tamil-nadu",
    transitDays: "4–5 days",
    moq: "25 kg",
    cityContext:
      "Chennai's deep filter coffee culture, large HORECA sector, and manufacturing campuses create a diverse bulk beverage market. We supply both CTC chai and coffee to Chennai's institutional and hospitality buyers.",
    buyerTypes: ["HORECA Distributors", "Hotel Chains", "Corporate Campuses", "Café Chains", "Wholesale Traders"],
    products: ["Bulk CTC Tea", "Roasted Coffee", "Green Coffee Beans", "Loose Leaf Tea"],
    nearbyAreas: ["Tambaram", "Perumbur", "OMR", "Old Mahabalipuram Road"],
    coordinates: { lat: 13.0827, lng: 80.2707 },
    faqs: [
      {
        question: "Do you supply bulk coffee and tea to Chennai's hotel chains?",
        answer:
          "Yes — we supply bulk CTC tea, roasted coffee, and green beans to Chennai hospitality and HORECA sector. GST invoice with HSN codes provided on every order.",
      },
    ],
  },
  {
    city: "Pune",
    citySlug: "pune",
    state: "Maharashtra",
    stateSlug: "maharashtra",
    transitDays: "3–4 days",
    moq: "25 kg",
    cityContext:
      "Pune's IT parks, manufacturing clusters, and vibrant café scene make it a fast-growing bulk beverage market. Corporate campuses and café chains are the primary institutional buyers.",
    buyerTypes: ["IT Campus F&B", "Café Chains", "Manufacturing Canteens", "Hotel Groups", "Distributors"],
    products: ["Bulk CTC Tea", "Roasted Coffee", "Green Coffee Beans", "Loose Leaf Tea"],
    nearbyAreas: ["Hinjewadi", "Pimpri-Chinchwad", "Kothrud", "Viman Nagar"],
    coordinates: { lat: 18.5204, lng: 73.8567 },
    faqs: [
      {
        question: "What bulk tea and coffee options are available for Pune IT parks?",
        answer:
          "We supply bulk CTC chai, roasted coffee, and green beans to IT campus cafeterias across Pune. Flexible packaging from 10 kg trial packs to 50 kg bulk bags.",
      },
    ],
  },
  {
    city: "Kolkata",
    citySlug: "kolkata",
    state: "West Bengal",
    stateSlug: "west-bengal",
    transitDays: "3–4 days",
    moq: "25 kg",
    cityContext:
      "Kolkata's strong tea culture, large hospitality sector, and wholesale distribution networks make it a natural hub for bulk CTC tea and coffee distribution across eastern India.",
    buyerTypes: ["Wholesale Distributors", "Hotel Chains", "Restaurant Groups", "Government Institutions", "Café Chains"],
    products: ["Bulk CTC Tea", "Roasted Coffee", "Loose Leaf Tea", "Green Coffee Beans"],
    nearbyAreas: ["Howrah", "Salt Lake", "Durgapur", "Asansol"],
    coordinates: { lat: 22.5726, lng: 88.3639 },
    faqs: [
      {
        question: "Do you distribute bulk CTC tea wholesale from Kolkata?",
        answer:
          "Yes — Kolkata serves as a distribution hub for eastern India. Wholesale buyers can source large quantities of bulk CTC tea and roasted coffee through B2B Gray Cup.",
      },
    ],
  },
  {
    city: "Ahmedabad",
    citySlug: "ahmedabad",
    state: "Gujarat",
    stateSlug: "gujarat",
    transitDays: "3–5 days",
    moq: "25 kg",
    cityContext:
      "Ahmedabad's thriving MSME economy, large textile industry, and growing hospitality sector create strong bulk tea and coffee demand from factory canteens, hotels, and wholesale distributors.",
    buyerTypes: ["Textile Industry Canteens", "Wholesale Distributors", "Hotel Groups", "Corporate Offices", "Café Chains"],
    products: ["Bulk CTC Tea", "Roasted Coffee", "Loose Leaf Tea", "Green Coffee Beans"],
    nearbyAreas: ["Gandhinagar", "Surat", "Vadodara", "Anand"],
    coordinates: { lat: 23.0225, lng: 72.5714 },
    faqs: [
      {
        question: "Can Ahmedabad textile factories buy bulk CTC tea for canteens?",
        answer:
          "Yes — we supply to industrial canteens across Gujarat. Bulk CTC tea in 25–50 kg bags with GST invoice and delivery challans for factory procurement departments.",
      },
    ],
  },
  {
    city: "Jaipur",
    citySlug: "jaipur",
    state: "Rajasthan",
    stateSlug: "rajasthan",
    transitDays: "4–5 days",
    moq: "25 kg",
    cityContext:
      "Jaipur's heritage tourism, large hotel corridor, and strong wholesale distribution network make it a key buyer of bulk tea and coffee for both hospitality and institutional use.",
    buyerTypes: ["Heritage Hotel Chains", "Wholesale Distributors", "Government Institutions", "Café Chains", "Catering Companies"],
    products: ["Bulk CTC Tea", "Roasted Coffee", "Loose Leaf Tea", "Green Coffee Beans"],
    nearbyAreas: ["Jodhpur", "Ajmer", "Alwar", "Sikar"],
    coordinates: { lat: 26.9124, lng: 75.7873 },
    faqs: [
      {
        question: "Do you supply bulk tea and coffee to Jaipur heritage hotels?",
        answer:
          "Yes — we supply CTC chai, loose-leaf tea, and roasted coffee to Jaipur's heritage and luxury hospitality sector. Contact us for institutional pricing and sampling.",
      },
    ],
  },
  {
    city: "Kochi",
    citySlug: "kochi",
    state: "Kerala",
    stateSlug: "kerala",
    transitDays: "5–7 days",
    moq: "25 kg",
    cityContext:
      "Kochi's port economy, active export community, and thriving hospitality sector make it a significant buyer of bulk tea and coffee for both domestic consumption and export-linked trade.",
    buyerTypes: ["Export Traders", "Hotel Chains", "Restaurant Groups", "Wholesale Distributors", "Café Chains"],
    products: ["Green Coffee Beans", "Bulk CTC Tea", "Roasted Coffee", "Loose Leaf Tea"],
    nearbyAreas: ["Ernakulam", "Thrissur", "Alappuzha", "Kozhikode"],
    coordinates: { lat: 9.9312, lng: 76.2673 },
    faqs: [
      {
        question: "Can Kochi export traders source bulk green coffee from B2B Gray Cup?",
        answer:
          "Yes — we supply export-grade green coffee to traders in Kochi with full documentation (APEDA, phytosanitary, ICO stamp). Contact us for export lot pricing and availability.",
      },
    ],
  },
  {
    city: "Lucknow",
    citySlug: "lucknow",
    state: "Uttar Pradesh",
    stateSlug: "uttar-pradesh",
    transitDays: "3–4 days",
    moq: "25 kg",
    cityContext:
      "Lucknow's large government institutions, hospitality belt, and growing café culture create consistent demand for bulk tea and coffee from offices, hotels, and retail chains.",
    buyerTypes: ["Government Institutions", "Hotel Chains", "Corporate Offices", "Café Chains", "Wholesale Distributors"],
    products: ["Bulk CTC Tea", "Roasted Coffee", "Loose Leaf Tea", "Green Coffee Beans"],
    nearbyAreas: ["Kanpur", "Agra", "Varanasi", "Allahabad"],
    coordinates: { lat: 26.8467, lng: 80.9462 },
    faqs: [
      {
        question: "Can Lucknow government offices buy bulk CTC tea from B2B Gray Cup?",
        answer:
          "Yes — we supply to government institutions with proper GST invoicing and delivery challans. Bulk CTC tea, loose-leaf, and roasted coffee available from 25 kg onwards.",
      },
    ],
  },
  {
    city: "Chandigarh",
    citySlug: "chandigarh",
    state: "Chandigarh",
    stateSlug: "chandigarh",
    transitDays: "3–5 days",
    moq: "25 kg",
    cityContext:
      "Chandigarh Tricity's high income levels, government institutions, and discerning hospitality sector create premium demand for quality bulk tea and coffee across offices, hotels, and cafés.",
    buyerTypes: ["Government Institutions", "Hotel Chains", "Corporate Offices", "Specialty Cafés", "Distributors"],
    products: ["Bulk CTC Tea", "Roasted Coffee", "Loose Leaf Tea", "Green Coffee Beans"],
    nearbyAreas: ["Mohali", "Panchkula", "Zirakpur", "Ambala"],
    coordinates: { lat: 30.7333, lng: 76.7794 },
    faqs: [
      {
        question: "What bulk tea and coffee products are available for Chandigarh offices?",
        answer:
          "We supply bulk CTC chai, premium loose-leaf tea, and roasted coffee beans to corporate offices and government institutions in Chandigarh Tricity. GST invoice included.",
      },
    ],
  },
  {
    city: "Indore",
    citySlug: "indore",
    state: "Madhya Pradesh",
    stateSlug: "madhya-pradesh",
    transitDays: "3–5 days",
    moq: "25 kg",
    cityContext:
      "Indore's food industry ecosystem, growing café scene, and large corporate sector make it a dynamic bulk tea and coffee market in central India.",
    buyerTypes: ["Food Processing Companies", "Corporate Offices", "Café Chains", "Hotel Groups", "Wholesale Distributors"],
    products: ["Bulk CTC Tea", "Roasted Coffee", "Green Coffee Beans", "Loose Leaf Tea"],
    nearbyAreas: ["Bhopal", "Ujjain", "Dewas", "Pithampur"],
    coordinates: { lat: 22.7196, lng: 75.8577 },
    faqs: [
      {
        question: "Do you supply bulk tea and coffee to Indore's food processing companies?",
        answer:
          "Yes — we supply to food industry players, café chains, and corporate offices in Indore. Delivery in 3–5 days with proper GST documentation for business procurement.",
      },
    ],
  },
  {
    city: "Bhubaneswar",
    citySlug: "bhubaneswar",
    state: "Odisha",
    stateSlug: "odisha",
    transitDays: "2–3 days",
    moq: "25 kg",
    cityContext:
      "Bhubaneswar is the nearest major city to our Koraput coffee sourcing region. Fast logistics and fresh supply make it ideal for local institutions, hotels, and distributors sourcing both tea and coffee.",
    buyerTypes: ["IT Campus F&B", "Government Institutions", "Hotel Chains", "Wholesale Distributors", "Café Chains"],
    products: ["Green Coffee Beans", "Bulk CTC Tea", "Roasted Coffee", "Loose Leaf Tea"],
    nearbyAreas: ["Cuttack", "Puri", "Khurda", "Rourkela"],
    coordinates: { lat: 20.2961, lng: 85.8245 },
    faqs: [
      {
        question: "What is the fastest delivery time for bulk tea and coffee to Bhubaneswar?",
        answer:
          "Bhubaneswar gets some of our fastest delivery — typically 2–3 days. As the gateway to Koraput, local buyers also benefit from the freshest coffee lots direct from the farms.",
      },
    ],
  },
  {
    city: "Surat",
    citySlug: "surat",
    state: "Gujarat",
    stateSlug: "gujarat",
    transitDays: "3–5 days",
    moq: "25 kg",
    cityContext:
      "Surat's diamond and textile industries create large institutional canteen demand. The city's growing hospitality and food service sector adds further bulk beverage buyers.",
    buyerTypes: ["Diamond Industry Canteens", "Textile Industry Canteens", "Hotel Groups", "Wholesale Distributors", "Café Chains"],
    products: ["Bulk CTC Tea", "Roasted Coffee", "Loose Leaf Tea"],
    nearbyAreas: ["Vadodara", "Vapi", "Navsari", "Bharuch"],
    coordinates: { lat: 21.1702, lng: 72.8311 },
    faqs: [
      {
        question: "Do you supply bulk chai to Surat's diamond and textile industry canteens?",
        answer:
          "Yes — industrial canteens in Surat's diamond and textile sectors are key buyers of bulk CTC tea. We supply in 25–50 kg bags with GST invoice for industrial procurement.",
      },
    ],
  },
  {
    city: "Visakhapatnam",
    citySlug: "visakhapatnam",
    state: "Andhra Pradesh",
    stateSlug: "andhra-pradesh",
    transitDays: "4–6 days",
    moq: "25 kg",
    cityContext:
      "Vizag's port economy, steel industry, and pharma campuses create large institutional bulk beverage demand. A growing café culture in RUSH Vizag adds specialty coffee buyers.",
    buyerTypes: ["Steel Industry Canteens", "Port Workers", "Pharma Campus F&B", "Hotel Chains", "Wholesale Distributors"],
    products: ["Bulk CTC Tea", "Green Coffee Beans", "Roasted Coffee", "Loose Leaf Tea"],
    nearbyAreas: ["Anakapalli", "Vizianagaram", "Bheemunipatnam"],
    coordinates: { lat: 17.6868, lng: 83.2185 },
    faqs: [
      {
        question: "Can Vizag's steel plant canteens buy bulk tea from B2B Gray Cup?",
        answer:
          "Yes — industrial canteens across Visakhapatnam's steel and port sectors are regular bulk CTC buyers. We supply in bulk with proper GST documentation for industrial procurement.",
      },
    ],
  },
];

export function getCityBySlug(slug: string): BulkCity | undefined {
  return bulkCities.find((c) => c.citySlug === slug);
}

export function getRelatedCities(slug: string): BulkCity[] {
  return bulkCities.filter((c) => c.citySlug !== slug).slice(0, 4);
}
