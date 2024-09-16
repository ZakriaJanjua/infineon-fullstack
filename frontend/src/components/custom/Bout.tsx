import { Separator } from '../ui/separator';

export function Bout({
	boutResult,
	powerDiff,
	userTeam,
	userEmail,
}: {
	boutResult: 'winner' | 'loser' | 'tie';
	powerDiff: Number;
	userTeam: any[];
	userEmail: String;
}) {
	return (
		<section>
			<Separator className='my-4' />
			<h3 className='text-lg'>
				Results after the fight with{' '}
				<span className='font-bold'>{userEmail}</span>
			</h3>
			<h2 className='text-xl mt-1 font-semibold text-zinc-600'>
				{boutResult === 'winner' &&
					'Congratulations! your team has won the bout.'}
				{boutResult === 'loser' && 'So Sorry! your team has lost the bout.'}
				{boutResult === 'tie' && 'Well Played! the bout has been tied.'} The
				aggregate power difference between the teams which caused the result is{' '}
				<span className='text-zinc-950'>{Math.round(powerDiff as any)}</span>.
			</h2>
			<p className='mt-2'>Opposition consisted of the following members:</p>
			<div className='flex gap-x-3 flex-wrap mt-1'>
				{userTeam.map((member) => (
					<div>
						<img
							src={member.superhero.image.url}
							className='w-32 object-cover rounded-md'
						/>
						<span>{member.superhero.name}</span>
					</div>
				))}
			</div>
		</section>
	);
}
