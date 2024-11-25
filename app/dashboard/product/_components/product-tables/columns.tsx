'use client';
import { Product } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'image',
    header: 'IMAGE',
    cell: ({ row }) => {
      return (
        <div className="relative aspect-square">
          <Image
            src={row.getValue('image')}
            alt={row.getValue('name') || 'Unknown'}
            fill
            className="rounded-lg"
          />
        </div>
      );
    }
  },
  {
    accessorKey: 'name',
    header: 'NAME',
    cell: ({ row }) => row.getValue('name') || 'Unknown'
  },
  {
    accessorKey: 'code',
    header: 'CODE'
  },
  {
    accessorKey: 'categoryName',
    header: 'CATEGORY',
    cell: ({ row }) => row.getValue('categoryName') || 'Unknown'
  },
  {
    accessorKey: 'supplierName',
    header: 'SUPPLIER',
    cell: ({ row }) => row.getValue('supplierName') || 'Unknown'
  },
  {
    accessorKey: 'price',
    header: 'PRICE',
    cell: ({ row }) =>
      `Rp ${parseFloat(row.getValue('price')).toLocaleString('id-ID')}`
  },
  {
    accessorKey: 'stock',
    header: 'STOCK'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
