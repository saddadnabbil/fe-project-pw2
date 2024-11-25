import { Product } from '@/constants/data';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './product-tables/columns';
import { auth } from '@/auth';

type ProductListingPage = {};

export default async function ProductListingPage({}: ProductListingPage) {
  const session = await auth();

  if (!session || !session.user?.token) {
    throw new Error('Not authenticated');
  }

  // Fetch data from API
  const response = await fetch(`http://project-pw2.test/api/barangs/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.user.token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const apiResponse = await response.json();

  // Ensure data is in the expected format
  if (!Array.isArray(apiResponse.data)) {
    throw new Error('Unexpected API response format');
  }

  const products: Product[] = apiResponse.data.map((item: any) => ({
    id: item.id,
    name: item.nama,
    code: item.kode,
    stock: item.stok,
    price: parseFloat(item.harga),
    imageUrl: item.image,
    categoryName: item.category?.name || 'Unknown', // Safeguard jika category tidak ada
    supplierName: item.supplier?.nama || 'Unknown', // Safeguard jika supplier tidak ada
    createdAt: item.created_at,
    updatedAt: item.updated_at
  }));

  return (
    <ProductTable
      columns={columns}
      data={products}
      totalItems={products.length} // Assuming no total count from API
    />
  );
}
