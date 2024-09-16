import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '@/query/api/auth';
import Cookies from 'js-cookie';

export function SignIn() {
	const navigate = useNavigate();

	const formSchema = z.object({
		email: z.string().email({
			message: 'Email address is incorrect.',
		}),
		password: z.string().min(8, {
			message: 'Password must be at least 8 characters.',
		}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const userInfo = {
			email: values.email,
			password: values.password,
		};
		const { data } = await signIn(userInfo);
		Cookies.set('token', data.token);
		navigate('/');
	}

	return (
		<section className='mt-10'>
			<h2 className='font-bold text-3xl text-center'>Superhero app</h2>
			<h3 className='font-bold text-2xl text-center mt-4'>Sign In</h3>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-4 max-w-xl mx-auto mt-10'
				>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder='email' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input placeholder='password' type='password' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormDescription>
						Don't have an account? go to{' '}
						<Link to='/sign-up' className='underline text-zinc-800'>
							Sign Up
						</Link>{' '}
						page
					</FormDescription>
					<Button type='submit' className='w-full'>
						Submit
					</Button>
				</form>
			</Form>
		</section>
	);
}
