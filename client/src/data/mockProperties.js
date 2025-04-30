const mockProperties = [
  // ================= INDIVIDUAL PROPERTIES (PI_[StateInitial]_[Number]) =================
  {
    id: "PI_D1",
    propertyId: "PR12345678",
    _id: "68112a791ff2d1411b66809e",
    address: "45 Green Park Apartments, Sector 15, New Delhi - 110016",
    addressLine1: "45 Green Park Apartments",
    addressLine2: "Sector 15",
    pinCode: "110016",
    stateUT: "Delhi",
    districtCity: "New Delhi",
    villageTown: "Green Park",
    propertyType: "Urban",
    registryReference: "DL/SRO-New Delhi South/B-1245/2015",
    status: "mortgaged",
    latitude: 28.5400,
    longitude: 77.2167,
    surveyNumber: "SN78542",
    plotNo: "G-45",
    sro: "New Delhi South",
    registrationYear: 2015,
    bookNumber: "B-1245",
    deedType: "Sale Deed",
    subDeedType: "Freehold",
    assetCategory: "Residential",
    natureOfProperty: "Freehold",
    searchType: "person",
    ownerDetails: {
      name: "Rahul Sharma",
      id: "AADHAAR1234876543",
      contact: "+91-9876543210"
    },
    encumbrance: {
      hasEncumbrance: true,
      encumbranceId: "ENC789456123",
      type: "mortgage",
      bank: "State Bank of India",
      loanAmount: "₹1,20,00,000",
      duration: "15 years",
      startDate: "15/03/2015"
    }
  },
  {
    id: "PI_M1",
    propertyId: "PR44455566",
    address: "Sea View Apartments, Marine Drive, Mumbai - 400002",
    addressLine1: "Sea View Apartments",
    addressLine2: "Marine Drive",
    pinCode: "400002",
    stateUT: "Maharashtra",
    districtCity: "Mumbai",
    villageTown: "Churchgate",
    propertyType: "Urban",
    registryReference: "MH/SRO-Mumbai Central/2020/B-7890",
    status: "clear",
    latitude: 18.9442,
    longitude: 72.8228,
    surveyNumber: "SN44556",
    plotNo: "SV-501",
    sro: "Mumbai Central",
    registrationYear: 2020,
    bookNumber: "B-7890",
    deedType: "Sale Deed",
    subDeedType: "Apartment",
    assetCategory: "Residential",
    natureOfProperty: "Freehold",
    searchType: "person",
    ownerDetails: {
      name: "Priya Patel",
      id: "AADHAAR2345987654",
      contact: "+91-8765432109"
    },
    encumbrance: {
      hasEncumbrance: false
    }
  },
  {
    "id": "PI_HR1",
    "propertyId": "PR15935748",
    "address": "Agricultural Plot No. 45, Sonipat - 131021",
    "addressLine1": "Agricultural Plot No. 45",
    "pinCode": "131021",
    "stateUT": "Haryana",
    "districtCity": "Sonipat",
    "villageTown": "Murthal",
    "propertyType": "Rural",
    "registryReference": "HR/SRO-Sonipat/2018/B-3344",
    "status": "clear",
    "latitude": 28.9956,
    "longitude": 77.0065,
    "surveyNumber": "SN15935",
    "plotNo": "AP-45",
    "sro": "Sonipat",
    "registrationYear": 2018,
    "bookNumber": "B-3344",
    "deedType": "Sale Deed",
    "subDeedType": "Agricultural",
    "assetCategory": "Agricultural",
    "natureOfProperty": "Freehold",
    "searchType": "person",
    "ownerDetails": {
      "name": "Harjeet Singh",
      "id": "AADHAAR1593574862",
      "contact": "+91-9876541230"
    },
    "encumbrance": {
      "hasEncumbrance": false
    }
  },
  {
    "id": "PI_KA1",
    "propertyId": "PR24681357",
    "address": "Tower B, Prestige Shantiniketan, Whitefield, Bangalore - 560066",
    "addressLine1": "Tower B, Prestige Shantiniketan",
    "addressLine2": "Whitefield",
    "pinCode": "560066",
    "stateUT": "Karnataka",
    "districtCity": "Bangalore",
    "propertyType": "Urban",
    "registryReference": "KA/SRO-Whitefield/2019/B-1122",
    "status": "mortgaged",
    "latitude": 12.9716,
    "longitude": 77.5946,
    "surveyNumber": "SN24681",
    "plotNo": "PS-B-1203",
    "sro": "Whitefield",
    "registrationYear": 2019,
    "bookNumber": "B-1122",
    "deedType": "Sale Deed",
    "subDeedType": "Apartment",
    "assetCategory": "Residential",
    "natureOfProperty": "Freehold",
    "searchType": "person",
    "ownerDetails": {
      "name": "Arjun Reddy",
      "id": "AADHAAR2468135790",
      "contact": "+91-8765432190"
    },
    "encumbrance": {
      "hasEncumbrance": true,
      "encumbranceId": "ENC246813579",
      "bank": "HDFC Bank",
      "loanAmount": "₹85,00,000",
      "duration": "12 years",
      "startDate": "15/07/2019"
    }
  },{
    "id": "CM_MH1",
    "propertyId": "PR65432198",
    "address": "Industrial Zone, Plot 7, Chakan, Pune - 411057",
    "addressLine1": "Industrial Zone, Plot 7",
    "pinCode": "411057",
    "stateUT": "Maharashtra",
    "districtCity": "Pune",
    "villageTown": "Chakan",
    "propertyType": "Industrial",
    "registryReference": "MH/SRO-Pune Rural/2016/B-5566",
    "status": "clear",
    "latitude": 18.7522,
    "longitude": 73.8550,
    "surveyNumber": "SN65432",
    "plotNo": "IZ-07",
    "sro": "Pune Rural",
    "registrationYear": 2016,
    "bookNumber": "B-5566",
    "deedType": "Sale Deed",
    "subDeedType": "Industrial",
    "assetCategory": "Industrial",
    "natureOfProperty": "Freehold",
    "searchType": "company",
    "ownerDetails": {
      "legalName": "Steelkraft Manufacturing LLP",
      "id": "AAB-6543",
      "contact": "+91-2023456789"
    },
    "companyDetails": {
      "cinLlpin": "AAB-6543",
      "companyType": "LLP",
      "registrationDate": "10/05/2016"
    },
    "encumbrance": {
      "hasEncumbrance": false
    }
  },
  {
    "id": "PI_UP1",
    "propertyId": "PR2024UP001",
    "address": "Villa No. 12, Palm Greens, Sector 128, Noida - 201304",
    "addressLine1": "Villa No. 12, Palm Greens",
    "addressLine2": "Sector 128",
    "pinCode": "201304",
    "stateUT": "Uttar Pradesh",
    "districtCity": "Gautam Buddh Nagar",
    "villageTown": "Noida",
    "propertyType": "Urban",
    "registryReference": "UP/SRO-Noida/2022/B-2024",
    "status": "mortgaged",
    "latitude": 28.4962,
    "longitude": 77.5360,
    "surveyNumber": "SNUP2024",
    "plotNo": "PG-12",
    "sro": "Noida",
    "registrationYear": 2022,
    "bookNumber": "B-2024",
    "deedType": "Sale Deed",
    "subDeedType": "Villa",
    "assetCategory": "Residential",
    "natureOfProperty": "Freehold",
    "searchType": "person",
    "ownerDetails": {
      "name": "Vikramaditya Singh",
      "id": "AADHAAR2024000001",
      "contact": "+91-9876542024",
      "email": "vikram.singh@example.com"
    },
    "encumbrance": {
      "hasEncumbrance": true,
      "encumbranceId": "ENCUP2024001",
      "type": "home-loan",
      "bank": "HDFC Bank",
      "loanAmount": "₹2,75,00,000",
      "duration": "20 years",
      "startDate": "15/03/2022",
      "interestRate": "8.4%"
    },
    "amenities": ["Swimming Pool", "Gym", "24/7 Security"]
  },
  {
    "id": "PI_TN1",
    "propertyId": "PR2024TN001",
    "address": "No. 5, Silver Sands Beach Road, ECR, Chennai - 600119",
    "addressLine1": "No. 5, Silver Sands Beach Road",
    "addressLine2": "ECR",
    "pinCode": "600119",
    "stateUT": "Tamil Nadu",
    "districtCity": "Chennai",
    "villageTown": "Neelankarai",
    "propertyType": "Urban",
    "registryReference": "TN/SRO-Chennai South/2021/B-2021",
    "status": "clear",
    "latitude": 12.8992,
    "longitude": 80.2548,
    "surveyNumber": "SNTN2021",
    "plotNo": "SS-5",
    "sro": "Chennai South",
    "registrationYear": 2021,
    "bookNumber": "B-2021",
    "deedType": "Gift Deed",
    "subDeedType": "Bungalow",
    "assetCategory": "Residential",
    "natureOfProperty": "Freehold",
    "searchType": "person",
    "ownerDetails": {
      "name": "Meenakshi Sundaram",
      "id": "AADHAAR2021000002",
      "contact": "+91-8765432021",
      "email": "meena.s@example.com"
    },
    "encumbrance": {
      "hasEncumbrance": false
    },
    "specialFeatures": ["Direct Beach Access", "Private Dock", "Solar Panels"]
  },

  // ================= COMPANY PROPERTIES (CM_[StateInitial]_[Number]) =================
  {
    id: "CM_T1",
    propertyId: "PR98712345",
    _id: "68112ba21ff2d1411b6680a7",
    address: "Beach Road, Egmore, Chennai - 600005",
    addressLine1: "Beach Road",
    addressLine2: "",
    pinCode: "600005",
    stateUT: "Tamil Nadu",
    districtCity: "Chennai",
    villageTown: "Egmore",
    propertyType: "Commercial",
    registryReference: "TN/SRO-Chennai Central/2015/B-6677",
    status: "mortgaged",
    latitude: 13.0827,
    longitude: 80.2707,
    surveyNumber: "SN78912",
    plotNo: "BR-45",
    sro: "Chennai Central",
    registrationYear: 2015,
    bookNumber: "B-6677",
    deedType: "Sale Deed",
    subDeedType: "Hotel",
    assetCategory: "Commercial",
    natureOfProperty: "Freehold",
    searchType: "company",
    ownerDetails: {
      legalName: "Grand Hospitality Limited",
      id: "U55100TN2015PLC123456",
      contact: "+91-4423456789"
    },
    companyDetails: {
      cinLlpin: "U55100TN2015PLC123456",
      companyType: "Public Limited",
      registrationDate: "12/05/2015"
    },
    encumbrance: {
      hasEncumbrance: true,
      encumbranceId: "ENC789456789",
      type: "corporate-loan",
      bank: "ICICI Bank",
      loanAmount: "₹5,00,00,000",
      duration: "10 years",
      startDate: "15/06/2015"
    }
  },
  {
    id: "CM_K1",
    propertyId: "PR94061728",
    _id: "68112c561ff2d1411b6680aa",
    address: "Education Hub, Block C, South Delhi - 110020",
    addressLine1: "Education Hub",
    addressLine2: "Block C",
    pinCode: "110020",
    stateUT: "Delhi",
    districtCity: "South Delhi",
    villageTown: "",
    propertyType: "Commercial",
    registryReference: "DL/SRO-Delhi South/2020/B-4680",
    status: "leased",
    latitude: 28.5245,
    longitude: 77.2065,
    surveyNumber: "SN94061",
    plotNo: "EH-C",
    sro: "Delhi South",
    registrationYear: 2020,
    bookNumber: "B-4680",
    deedType: "Lease Deed",
    subDeedType: "Institutional",
    assetCategory: "Commercial",
    natureOfProperty: "Leasehold",
    searchType: "company",
    ownerDetails: {
      legalName: "EduSmart Learning Solutions Private Limited",
      id: "U80302DL2020PTC123456",
      contact: "+91-1123456789"
    },
    companyDetails: {
      cinLlpin: "U80302DL2020PTC123456",
      companyType: "Private Limited",
      registrationDate: "05/08/2020"
    },
    encumbrance: {
      hasEncumbrance: false
    },
    leaseDetails: {
      lessor: "Delhi Development Authority",
      leasePeriod: "15 years",
      annualRent: "₹25,00,000"
    }
  },
  {
    "id": "CM_WB1",
    "propertyId": "PR77788899",
    "address": "Technopolis Building, Salt Lake Sector V, Kolkata - 700091",
    "addressLine1": "Technopolis Building",
    "addressLine2": "Salt Lake Sector V",
    "pinCode": "700091",
    "stateUT": "West Bengal",
    "districtCity": "Kolkata",
    "propertyType": "Commercial",
    "registryReference": "WB/SRO-Salt Lake/2019/B-7788",
    "status": "mortgaged",
    "latitude": 22.5726,
    "longitude": 88.3639,
    "surveyNumber": "SN77788",
    "plotNo": "TL-501",
    "sro": "Salt Lake",
    "registrationYear": 2019,
    "bookNumber": "B-7788",
    "deedType": "Lease Deed",
    "subDeedType": "Office Space",
    "assetCategory": "Commercial",
    "natureOfProperty": "Leasehold",
    "searchType": "company",
    "ownerDetails": {
      "legalName": "TechSolutions Pvt Ltd",
      "id": "U72300WB2019PTC123456",
      "contact": "+91-3323456789"
    },
    "companyDetails": {
      "cinLlpin": "U72300WB2019PTC123456",
      "companyType": "Private Limited",
      "registrationDate": "20/11/2019"
    },
    "encumbrance": {
      "hasEncumbrance": true,
      "encumbranceId": "ENC777888999",
      "bank": "Axis Bank",
      "loanAmount": "₹2,50,00,000",
      "duration": "8 years",
      "startDate": "01/12/2019"
    },
    "leaseDetails": {
      "lessor": "West Bengal Industrial Development Corporation",
      "leasePeriod": "10 years",
      "annualRent": "₹15,00,000"
    }
  },
  {
    "id": "CM_GA1",
    "propertyId": "PR2024GA001",
    "address": "Coastal Greens Resort, Ashwem Beach, North Goa - 403519",
    "addressLine1": "Coastal Greens Resort",
    "addressLine2": "Ashwem Beach",
    "pinCode": "403519",
    "stateUT": "Goa",
    "districtCity": "North Goa",
    "villageTown": "Ashwem",
    "propertyType": "Commercial",
    "registryReference": "GA/SRO-Mapusa/2023/B-2023",
    "status": "leased",
    "latitude": 15.6186,
    "longitude": 73.8039,
    "surveyNumber": "SNGA2023",
    "plotNo": "CG-1",
    "sro": "Mapusa",
    "registrationYear": 2023,
    "bookNumber": "B-2023",
    "deedType": "Lease Deed",
    "subDeedType": "Resort",
    "assetCategory": "Commercial",
    "natureOfProperty": "Leasehold",
    "searchType": "company",
    "ownerDetails": {
      "legalName": "Sun & Sand Hospitality Pvt. Ltd.",
      "id": "U55100GA2023PTC123456",
      "contact": "+91-8322456789",
      "website": "www.sunsandgoa.com"
    },
    "companyDetails": {
      "cinLlpin": "U55100GA2023PTC123456",
      "companyType": "Private Limited",
      "registrationDate": "10/01/2023",
      "gstin": "30AABCS1234D1ZG"
    },
    "encumbrance": {
      "hasEncumbrance": false
    },
    "leaseDetails": {
      "lessor": "Goa Tourism Development Corporation",
      "leasePeriod": "25 years",
      "annualRent": "₹35,00,000",
      "renewalTerms": "Every 10 years"
    },
    "facilities": ["50 Rooms", "Beachfront Restaurant", "Spa", "Conference Hall"]
  },
  {
    "id": "PI_MP1",
    "propertyId": "PR2024MP001",
    "address": "Survey No. 45, Village Khajuri, Sehore - 466001",
    "addressLine1": "Survey No. 45",
    "pinCode": "466001",
    "stateUT": "Madhya Pradesh",
    "districtCity": "Sehore",
    "villageTown": "Khajuri",
    "propertyType": "Rural",
    "registryReference": "MP/SRO-Sehore/2023/B-AGRI-124",
    "status": "clear",
    "latitude": 23.2000,
    "longitude": 77.0833,
    "surveyNumber": "SNMP45",
    "plotNo": "AG-45",
    "sro": "Sehore",
    "registrationYear": 2023,
    "bookNumber": "B-AGRI-124",
    "deedType": "Sale Deed",
    "subDeedType": "Agricultural",
    "assetCategory": "Agricultural",
    "natureOfProperty": "Freehold",
    "searchType": "person",
    "ownerDetails": {
      "name": "Rameshwar Patel",
      "id": "AADHAAR2023MP001",
      "contact": "+91-7896541230"
    },
    "landDetails": {
      "area": "4.5 acres",
      "soilType": "Black Cotton Soil",
      "irrigation": ["Well", "Rainfed"],
      "cropsGrown": ["Soybean", "Wheat"],
      "access": "Metal Road Access"
    },
    "encumbrance": {
      "hasEncumbrance": false
    }
  },{
    "id": "PI_RJ1",
    "propertyId": "PR2024RJ002",
    "address": "Plot No. D-12, Jaisalmer Industrial Corridor - 345001",
    "addressLine1": "Plot No. D-12",
    "pinCode": "345001",
    "stateUT": "Rajasthan",
    "districtCity": "Jaisalmer",
    "villageTown": "Pokhran",
    "propertyType": "Industrial",
    "registryReference": "RJ/SRO-Jaisalmer/2022/B-SOLAR-55",
    "status": "clear",
    "latitude": 26.9157,
    "longitude": 70.9083,
    "surveyNumber": "SNRJ-D12",
    "plotNo": "SOLAR-D12",
    "sro": "Jaisalmer",
    "registrationYear": 2022,
    "bookNumber": "B-SOLAR-55",
    "deedType": "Sale Deed",
    "subDeedType": "Barren",
    "assetCategory": "Industrial",
    "natureOfProperty": "Freehold",
    "searchType": "person",
    "ownerDetails": {
      "name": "Devendra Singh Rathore",
      "id": "AADHAAR2022RJ002",
      "contact": "+91-8765432102"
    },
    "landDetails": {
      "area": "10 hectares",
      "topography": "Flat Desert",
      "solarPotential": "6.5 kWh/m²/day",
      "access": "NH-15 Highway (500m)",
      "environmentalClearance": "Obtained"
    },
    "encumbrance": {
      "hasEncumbrance": false
    },
    "developmentPotential": {
      "zoning": "Renewable Energy Park",
      "approvalsNeeded": ["MNRE Certification", "CEA Clearance"]
    }
  },{
    "id": "CM_KA1",
    "propertyId": "PR2024KA003",
    "address": "Survey No. 78, Whitefield Layout, Bangalore - 560066",
    "addressLine1": "Survey No. 78",
    "pinCode": "560066",
    "stateUT": "Karnataka",
    "districtCity": "Bangalore",
    "villageTown": "Whitefield",
    "propertyType": "Urban",
    "registryReference": "KA/SRO-Whitefield/2021/B-RE-789",
    "status": "mortgaged",
    "latitude": 12.9698,
    "longitude": 77.7500,
    "surveyNumber": "SNKA78",
    "plotNo": "WF-78",
    "sro": "Whitefield",
    "registrationYear": 2021,
    "bookNumber": "B-RE-789",
    "deedType": "Sale Deed",
    "subDeedType": "Residential Plot",
    "assetCategory": "Residential",
    "natureOfProperty": "Freehold",
    "searchType": "company",
    "ownerDetails": {
      "legalName": "Bangalore Developers Pvt. Ltd.",
      "id": "U70100KA2021PTC123456",
      "contact": "+91-8023456789"
    },
    "companyDetails": {
      "cinLlpin": "U70100KA2021PTC123456",
      "gstin": "29AABCD1234D1ZK"
    },
    "landDetails": {
      "area": "2400 sq.yds",
      "dimensions": "40m x 60m",
      "fencing": "Compound Wall",
      "approvals": ["BBMP Layout Approval", "BDA NOC"],
      "soilTestReport": true
    },
    "encumbrance": {
      "hasEncumbrance": true,
      "encumbranceId": "ENCKA2021003",
      "bank": "Karnataka Bank",
      "loanAmount": "₹1,20,00,000",
      "purpose": "Land Development"
    },
    "developmentRestrictions": {
      "FSI": 1.5,
      "setback": "3m all sides"
    }
  },{
    "id": "PI_AP1",
    "propertyId": "PR2024AP004",
    "address": "Survey No. 33, Coastal Regulation Zone, Nellore - 524004",
    "addressLine1": "Survey No. 33",
    "pinCode": "524004",
    "stateUT": "Andhra Pradesh",
    "districtCity": "Nellore",
    "villageTown": "Mypadu",
    "propertyType": "Coastal",
    "registryReference": "AP/SRO-Nellore/2020/B-CRZ-33",
    "status": "clear",
    "latitude": 14.4426,
    "longitude": 80.1464,
    "surveyNumber": "SNAP33",
    "plotNo": "CRZ-33",
    "sro": "Nellore",
    "registrationYear": 2020,
    "bookNumber": "B-CRZ-33",
    "deedType": "Gift Deed",
    "subDeedType": "Beachfront",
    "assetCategory": "Special Zone",
    "natureOfProperty": "Freehold",
    "searchType": "person",
    "ownerDetails": {
      "name": "Lakshmi Narsimha Reddy",
      "id": "AADHAAR2020AP004",
      "contact": "+91-8569741230"
    },
    "landDetails": {
      "area": "2 acres",
      "distanceFromHTL": "150m",
      "crzCategory": "CRZ-III",
      "restrictions": ["No Permanent Construction", "Only Temporary Structures"]
    },
    "encumbrance": {
      "hasEncumbrance": false
    }
  }
  // ... (13 more records following same pattern)
];

export default mockProperties;