import { SuperheroCard } from '@/components/custom/SuperheroCard';
import { useState } from 'react';
import { useGetSuperheroes } from '@/query/hooks/useSuperhero';
import ReactPaginate from 'react-paginate';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';
import { useGetTeamIds } from '@/query/hooks/useTeam';

export function Home() {
	const [page, setPage] = useState(1);
	const { data, isLoading, isError, error } = useGetSuperheroes(page);
	const { data: teamIdsData } = useGetTeamIds();

	function handlePageClick(event: { selected: number }) {
		setPage(event.selected + 1);
	}

	if (isError && axios.isAxiosError(error)) {
		return (
			<div>
				<p>There has been an error</p>
				<p>{error.response ? error.response.data.message : ''}</p>
			</div>
		);
	}

	return (
		<section>
			<div className='grid justify-items-center 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-5'>
				{!isLoading ? (
					<>
						{data?.data.map((superhero: any) => (
							<SuperheroCard
								url={superhero.image.url}
								name={superhero.name}
								fullname={superhero.biography['full-name']}
								key={superhero.id}
								superheroId={superhero._id}
								teamIds={teamIdsData?.data}
							/>
						))}
					</>
				) : (
					<>
						{Array(24)
							.fill(1)
							.map((_, idx) => (
								<div className='flex flex-col space-y-3' key={idx}>
									<Skeleton className='h-[450px] w-[350px] rounded-xl' />
									<div className='space-y-2'>
										<Skeleton className='h-4 w-[250px]' />
										<Skeleton className='h-4 w-[200px]' />
									</div>
								</div>
							))}
					</>
				)}
			</div>

			<div className='py-5'>
				<ReactPaginate
					breakLabel='...'
					nextLabel='Next'
					onPageChange={handlePageClick}
					pageRangeDisplayed={3}
					pageCount={31}
					previousLabel='Previous'
					renderOnZeroPageCount={null}
					containerClassName='flex gap-x-2 justify-center'
					pageLinkClassName='hover:bg-zinc-100 px-2 py-1 rounded-md transition-all'
					previousLinkClassName='hover:bg-zinc-100 border border-zinc-200 px-2 py-1 rounded-md transition-all'
					nextLinkClassName='hover:bg-zinc-100 border border-zinc-200 px-2 py-1 rounded-md transition-all'
					activeLinkClassName='border border-zinc-300 bg-zinc-200'
				/>
			</div>
		</section>
	);
}
