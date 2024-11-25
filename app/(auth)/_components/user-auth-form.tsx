'use client';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import * as z from 'zod';
import { useState } from 'react'; // Import useState for managing loading state
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'admin@example.com',
      password: 'password123'
    }
  });

  // Add loading state
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true); // Start loading animation

    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password
    });

    setLoading(false); // Stop loading animation

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Logged in successfully!');
      window.location.href = '/dashboard'; // Redirect after login
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="ml-auto w-full"
          type="submit"
          disabled={loading} // Disable the button when loading
        >
          {loading ? (
            <span className="loader"></span> // Add a loading spinner here
          ) : (
            'Log In'
          )}
        </Button>
      </form>
    </Form>
  );
}
