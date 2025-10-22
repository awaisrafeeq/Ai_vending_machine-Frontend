export interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  rating: number;
  description: string;
  flavor: { color: string; label: string }[];
  stock: number;
  ingredients: string[];
  category?: string;
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    console.log('Attempting to fetch products from API...');
    const response = await fetch('https://ai-vending-machine-4fwl.onrender.com/products', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true' // This skips the XML/HTML response
      },
      mode: 'cors', // Enable CORS
    });
    
    if (!response.ok) {
      const text = await response.text();
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: text.substring(0, 500) // Log first 500 chars of response
      });
      throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Invalid content type:', contentType);
      console.error('Response body:', text.substring(0, 500));
      throw new Error(`Invalid content type: ${contentType}`);
    }

    const data = await response.json();
    console.log('Successfully fetched products from API');
    
    // Map products to use local images and parse JSON strings
    const cleanedData = data.map((product: any) => {
      // Helper function to safely parse JSON strings
      const safeParse = (value: any, fallback: any = []) => {
        if (typeof value === 'string') {
          try {
            return JSON.parse(value);
          } catch (error) {
            console.warn('Failed to parse JSON string:', value, error);
            return fallback;
          }
        }
        return value;
      };

      return {
        ...product,
        // Parse JSON strings for arrays
        flavor: safeParse(product.flavor, [{ color: 'bg-gray-500', label: 'Unknown' }]),
        ingredients: safeParse(product.ingredients, ['Unknown ingredients']),
        // Use local images instead of the malformed JSON string
        images: [`/images/products/Lays (${Math.floor(Math.random() * 9) + 1}).png`]
      };
    });

    return cleanedData;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // Re-throw the error to be handled by the component
  }
}

// Export empty array as initial state
export const products: Product[] = []; 