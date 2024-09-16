import { SuperheroCard } from '@/components/custom/SuperheroCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetBouts, useGetTeam, useGetTeamIds } from '@/query/hooks/useTeam';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useGetRecommendations } from '@/query/hooks/useSuperhero';
import { Bout } from '@/components/custom/Bout';

export default function Team() {
	const { data, isLoading } = useGetTeam();
	const { data: teamIdsData } = useGetTeamIds();
	const { recommendations, recommendationsLoading, useRecommendedHero } =
		useGetRecommendations();
	const { data: bouts } = useGetBouts();

	return (
		<>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href='/'>Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink>Team</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<section>
				<h2 className='font-bold text-3xl mb-3'>Team</h2>
				<div className='grid justify-items-center 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-5'>
					{!isLoading ? (
						<>
							{data?.data.map((team: any) => (
								<SuperheroCard
									url={team.superhero.image.url}
									name={team.superhero.name}
									fullname={team.superhero.biography['full-name']}
									key={team.superhero.id}
									teamIds={teamIdsData?.data}
									superheroId={team.superhero._id}
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
			</section>
			<section className='mt-8'>
				<h2 className='font-bold text-3xl mb-3'>Recommended Members</h2>
				<div className='grid justify-items-center 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-5'>
					{!recommendationsLoading ? (
						<>
							{recommendations?.data?.map((superhero: any) => (
								<SuperheroCard
									url={superhero.image.url}
									name={superhero.name}
									fullname={superhero.biography['full-name']}
									key={superhero.id}
									teamIds={teamIdsData?.data}
									superheroId={superhero._id}
									helperFns={useRecommendedHero}
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
			</section>
			<section className='mt-8'>
				<h2 className='font-bold text-3xl'>Bouts</h2>
				{bouts?.data.map((bout: any) => (
					<Bout
						userEmail={bout.userEmail}
						userTeam={bout.userTeam}
						powerDiff={bout.powerDiff}
						boutResult={bout.boutResult}
					/>
				))}
			</section>
		</>
	);
}
