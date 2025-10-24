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

// Raw API response interface (before parsing)
interface RawProduct {
  id: number;
  name: string;
  price: number;
  images: string | string[];
  rating: number;
  description: string;
  flavor: string | { color: string; label: string }[];
  stock: number;
  ingredients: string | string[];
  category?: string;
}

// Function to generate random colors
function generateRandomColor(): string {
  const colors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
    'bg-orange-500', 'bg-cyan-500', 'bg-lime-500', 'bg-amber-500',
    'bg-emerald-500', 'bg-violet-500', 'bg-rose-500', 'bg-sky-500'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
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
    const cleanedData = data.map((product: RawProduct): Product => {
      // Helper function to safely parse JSON strings
      const safeParse = <T>(value: string | T, fallback: T): T => {
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

      // Parse flavors and generate random colors if not provided
      const parsedFlavors = safeParse(product.flavor, [{ color: generateRandomColor(), label: 'Unknown' }]);
      const flavorsWithRandomColors = parsedFlavors.map(flavor => ({
        ...flavor,
        color: flavor.color || generateRandomColor()
      }));

      return {
        ...product,
        // Parse JSON strings for arrays with random colors
        flavor: flavorsWithRandomColors,
        ingredients: safeParse(product.ingredients, ['Unknown ingredients']),
        // Parse and use the actual product images from the API
        images: safeParse(product.images, ['/images/products/Lays (1).png'])
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