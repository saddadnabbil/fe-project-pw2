import { useEffect, useState } from 'react';

export function useCategoryOptions() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('http://project-pw2.test/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(
          data.map((category: any) => ({
            value: category.name,
            label: category.name
          }))
        );
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);

  return categories;
}
