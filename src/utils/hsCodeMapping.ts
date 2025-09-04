// Basic mapping of product names to HS codes
// This can be expanded with a more comprehensive database later

export const productToHSCode: Record<string, string> = {
  // Spices and herbs
  'turmeric': '0910',
  'pepper': '0904',
  'black pepper': '090411',
  'white pepper': '090412',
  'ginger': '091010',
  'cardamom': '090830',
  'cinnamon': '090611',
  'cloves': '090700',
  'nutmeg': '090811',
  'cumin': '090931',
  'coriander': '090920',
  'fennel': '090930',
  'fenugreek': '091099',
  'mustard seeds': '120750',
  'sesame seeds': '120740',
  
  // Grains and cereals
  'rice': '1006',
  'wheat': '1001',
  'corn': '1005',
  'barley': '1003',
  'oats': '1004',
  'quinoa': '100850',
  'millet': '100820',
  'sorghum': '100700',
  
  // Fruits
  'bananas': '0803',
  'apples': '0808',
  'oranges': '080510',
  'grapes': '0806',
  'mangoes': '080450',
  'pineapples': '080430',
  'avocados': '080440',
  'coconuts': '080110',
  'dates': '080410',
  'figs': '080420',
  
  // Vegetables
  'tomatoes': '070200',
  'onions': '070310',
  'potatoes': '070190',
  'carrots': '070610',
  'cabbage': '070490',
  'lettuce': '070511',
  'spinach': '070970',
  'broccoli': '070490',
  
  // Nuts
  'almonds': '080211',
  'cashews': '080130',
  'walnuts': '080231',
  'pistachios': '080251',
  'hazelnuts': '080221',
  'brazil nuts': '080121',
  'pecans': '080290',
  
  // Oils and fats
  'palm oil': '151110',
  'coconut oil': '151311',
  'olive oil': '150910',
  'sunflower oil': '151211',
  'soybean oil': '150710',
  'peanut oil': '150810',
  
  // Beverages
  'coffee': '0901',
  'tea': '0902',
  'cocoa': '1801',
  'coffee beans': '090111',
  'green coffee': '090111',
  'black tea': '090240',
  'green tea': '090220',
  
  // Textiles
  'cotton': '5201',
  'wool': '5101',
  'silk': '5002',
  'linen': '5309',
  'hemp': '5302',
  
  // Common industrial products
  'steel': '7208',
  'aluminum': '7601',
  'copper': '7403',
  'plastic': '3901',
  'rubber': '4001',
  'paper': '4802',
  'glass': '7005',
  'cement': '2523',
  
  // Electronics (common categories)
  'smartphones': '851712',
  'laptops': '847130',
  'tablets': '847130',
  'televisions': '852872',
  'cameras': '850630',
  'batteries': '850760',
  
  // Chemicals
  'fertilizers': '3104',
  'pesticides': '3808',
  'pharmaceuticals': '3004',
  'soap': '340111',
  'detergents': '340220',
  
  // Automotive
  'cars': '8703',
  'trucks': '8704',
  'motorcycles': '8711',
  'auto parts': '8708',
  'tires': '401110',
  
  // Furniture
  'wooden furniture': '9403',
  'metal furniture': '9401',
  'chairs': '9401',
  'tables': '9403',
  'beds': '9403'
};

export const hsCodeToProduct: Record<string, string> = {
  // Reverse mapping for common codes
  '0910': 'Turmeric, saffron, bay leaves, curry and other spices',
  '0904': 'Pepper of the genus Piper',
  '091010': 'Ginger',
  '090830': 'Cardamoms',
  '090611': 'Cinnamon and cinnamon-tree flowers',
  '090700': 'Cloves (whole fruit, cloves and stems)',
  '090811': 'Nutmeg',
  '090931': 'Seeds of coriander',
  '090920': 'Seeds of coriander',
  '120750': 'Mustard seeds',
  '120740': 'Sesamum seeds',
  
  '1006': 'Rice',
  '1001': 'Wheat and meslin',
  '1005': 'Maize (corn)',
  '1003': 'Barley',
  '1004': 'Oats',
  '100850': 'Quinoa',
  '100820': 'Millet',
  '100700': 'Grain sorghum',
  
  '0803': 'Bananas, including plantains',
  '0808': 'Apples, pears and quinces',
  '080510': 'Oranges',
  '0806': 'Grapes, fresh or dried',
  '080450': 'Guavas, mangoes and mangosteens',
  '080430': 'Pineapples',
  '080440': 'Avocados',
  '080110': 'Coconuts',
  '080410': 'Dates',
  '080420': 'Figs',
  
  '0901': 'Coffee',
  '0902': 'Tea',
  '1801': 'Cocoa beans',
  '090111': 'Coffee, not roasted, not decaffeinated',
  '090240': 'Black tea (fermented)',
  '090220': 'Green tea (not fermented)',
};

export function getHSCodeFromProduct(productName: string): string | null {
  const normalizedProduct = productName.toLowerCase().trim();
  
  // Direct match
  if (productToHSCode[normalizedProduct]) {
    return productToHSCode[normalizedProduct];
  }
  
  // Partial match
  for (const [product, code] of Object.entries(productToHSCode)) {
    if (normalizedProduct.includes(product) || product.includes(normalizedProduct)) {
      return code;
    }
  }
  
  return null;
}

export function getProductFromHSCode(hsCode: string): string | null {
  const normalizedCode = hsCode.trim();
  
  // Direct match
  if (hsCodeToProduct[normalizedCode]) {
    return hsCodeToProduct[normalizedCode];
  }
  
  // Try shorter codes (first 4 digits, first 2 digits)
  const shortCode4 = normalizedCode.substring(0, 4);
  const shortCode2 = normalizedCode.substring(0, 2);
  
  if (hsCodeToProduct[shortCode4]) {
    return hsCodeToProduct[shortCode4];
  }
  
  if (hsCodeToProduct[shortCode2]) {
    return hsCodeToProduct[shortCode2];
  }
  
  return null;
}

export function isValidHSCode(code: string): boolean {
  const cleanCode = code.replace(/\D/g, ''); // Remove non-digits
  return cleanCode.length >= 2 && cleanCode.length <= 10;
}