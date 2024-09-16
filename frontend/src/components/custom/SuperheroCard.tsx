import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckIcon, PlusIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { useAddTeamMember, useDeleteTeamMember } from '@/query/hooks/useTeam';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useEffect } from 'react';
import axios from 'axios';

export function SuperheroCard({
	url,
	name,
	fullname,
	superheroId,
	teamIds,
	helperFns,
}: {
	url: string;
	name: string;
	fullname: string;
	superheroId: string;
	teamIds: [string];
	helperFns?: any;
}) {
	const mutation = useAddTeamMember();
	const deleteMutation = useDeleteTeamMember();
	const { toast } = useToast();

	useEffect(() => {
		if (mutation.isError) {
			toast({
				variant: 'destructive',
				title: 'Uh oh! Cannot add superhero.',
				description:
					axios.isAxiosError(mutation.error) &&
					mutation.error.response &&
					mutation.error.response.data.message,
				action: <ToastAction altText='Close'>Close</ToastAction>,
			});
		}
	}, [mutation.isError]);

	return (
		<Card className='w-[350px]'>
			<CardContent className='mt-5'>
				<img
					src={url}
					alt=''
					className='object-cover rounded-lg h-[400px] w-full'
				/>
			</CardContent>
			<CardHeader className='pt-0'>
				<CardTitle>{name}</CardTitle>
				<CardDescription>{fullname}</CardDescription>
			</CardHeader>
			<CardFooter className='flex justify-between'>
				<Button variant='outline' asChild>
					<Link to={`/superhero/${name}`}>Details</Link>
				</Button>

				{teamIds?.includes(superheroId) ? (
					<Button
						variant='secondary'
						onClick={() => deleteMutation.mutate(superheroId)}
						disabled={deleteMutation.isPending}
					>
						<CheckIcon className='mr-1 h-4 w-4' /> Added
					</Button>
				) : (
					<Button
						variant='outline'
						onClick={() => {
							mutation.mutate(superheroId);
							if (!mutation.isError) {
								helperFns(superheroId);
							}
						}}
						disabled={mutation.isPending}
					>
						<PlusIcon className='mr-1 h-4 w-4' /> Add
					</Button>
				)}
			</CardFooter>
		</Card>
	);
}
