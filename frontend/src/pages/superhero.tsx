import { Loader } from '@/assets/Loader';
import {
	useGetSuperheroDetails,
	useSetSuperheroDetails,
} from '@/query/hooks/useSuperhero';
import { useParams } from 'react-router-dom';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useUser } from '@/query/hooks/useUser';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';

export function Superhero() {
	const { name } = useParams();
	const { data, isLoading } = useGetSuperheroDetails(name as string);
	const { data: user } = useUser();
	const mutation = useSetSuperheroDetails();
	const { toast } = useToast();

	const formSchema = z.object({
		name: z.string().min(2, {
			message: 'Superhero name must be at least 2 characters.',
		}),
		id: z.string().min(1, {
			message: 'Id is not editable.',
		}),
		imageUrl: z.string().url({ message: 'Image must have a valid url.' }),
		relatives: z.string().optional(),
		groupAffiliation: z.string().optional(),
		occupation: z.string().min(2, {
			message: 'There must be an occupation for the superhero.',
		}),
		base: z.string().optional(),
		gender: z.enum(['Male', 'Female']),
		race: z.string().min(2, {
			message: 'Superhero must have a race.',
		}),
		heightFt: z.string().regex(/^\d{1,2}'\d{1,2}$/, {
			message: "Height must be in the format of feet'inches, e.g., 6'3",
		}),
		heightCm: z.string().regex(/^\d{2,3}\s?cm$/, {
			message:
				'Height must be in the format of centimeters, e.g., 183cm or 183 cm',
		}),
		weightLb: z.string().regex(/^\d{2,3}\s?lb$/, {
			message: 'Weight must be in the format of pounds, e.g., 165lb or 165 lb',
		}),
		weightKg: z.string().regex(/^\d{2,3}\s?kg$/, {
			message: 'Weight must be in the format of kilograms, e.g., 65kg or 65 kg',
		}),
		eyeColor: z.string().optional(),
		hairColor: z.string().optional(),
		aliases: z.array(z.string()),
		fullName: z.string().min(2, {
			message: 'Full Name must have at least 2 characters.',
		}),
		alterEgo: z.string().optional(),
		placeOfBirth: z.string().optional(),
		firstAppearance: z.string(),
		publisher: z.string(),
		alignment: z.enum(['good', 'bad']),
		intelligence: z.coerce.number(),
		strength: z.coerce.number(),
		speed: z.coerce.number(),
		durability: z.coerce.number(),
		power: z.coerce.number(),
		combat: z.coerce.number(),
	});

	type FormValues = z.infer<typeof formSchema>;

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: data?.data.name,
			id: data?.data.id,
			imageUrl: data?.data.image.url,
			relatives: data?.data.connections.relatives,
			groupAffiliation: data?.data.connections['group-affiliation'],
			occupation: data?.data.work.occupation,
			base: data?.data.work.base,
			gender: data?.data.appearance.gender,
			race: data?.data.appearance.race,
			heightFt: data?.data.appearance.height[0],
			heightCm: data?.data.appearance.height[1],
			weightLb: data?.data.appearance.weight[0],
			weightKg: data?.data.appearance.weight[1],
			eyeColor: data?.data.appearance['eye-color'],
			hairColor: data?.data.appearance['hair-color'],
			fullName: data?.data.biography['full-name'],
			alterEgo: data?.data.biography['alter-egos'],
			aliases: data?.data.biography.aliases,
			placeOfBirth: data?.data.biography['place-of-birth'],
			firstAppearance: data?.data.biography['first-appearance'],
			publisher: data?.data.biography.publisher,
			alignment: data?.data.biography.alignment,
			intelligence: data?.data.powerstats.intelligence,
			strength: data?.data.powerstats.strength,
			speed: data?.data.powerstats.speed,
			durability: data?.data.powerstats.durability,
			power: data?.data.powerstats.power,
			combat: data?.data.powerstats.combat,
		},
	});

	const { fields, append, remove } = useFieldArray<FormValues>({
		control: form.control,
		name: 'aliases' as never,
	});

	function onSubmit(values: FormValues) {
		mutation.mutate(values);
	}

	useEffect(() => {
		if (mutation.isSuccess) {
			toast({
				title: 'Successful submission!',
				description: 'Form has been submitted successfully.',
				action: <ToastAction altText='Close'>Close</ToastAction>,
			});
		}
	}, [mutation.isSuccess]);

	useEffect(() => {
		if (Object.keys(form.formState.errors).length > 0) {
			toast({
				variant: 'destructive',
				title: 'Uh oh! Could not submit the form.',
				description: 'Your form has errors!',
				action: <ToastAction altText='Close'>Close</ToastAction>,
			});
		}
	}, [Object.keys(form.formState.errors).length]);

	useEffect(() => {
		if (data)
			form.reset({
				name: data?.data.name,
				id: data?.data.id,
				imageUrl: data?.data.image.url,
				relatives: data?.data.connections.relatives,
				groupAffiliation: data?.data.connections['group-affiliation'],
				occupation: data?.data.work.occupation,
				base: data?.data.work.base,
				gender: data?.data.appearance.gender,
				race: data?.data.appearance.race,
				heightFt: data?.data.appearance.height[0],
				heightCm: data?.data.appearance.height[1],
				weightLb: data?.data.appearance.weight[0],
				weightKg: data?.data.appearance.weight[1],
				eyeColor: data?.data.appearance.eyeColor,
				hairColor: data?.data.appearance.hairColor,
				fullName: data?.data.biography['full-name'],
				alterEgo: data?.data.biography['alter-egos'],
				aliases: data?.data.biography.aliases,
				placeOfBirth: data?.data.biography['place-of-birth'],
				firstAppearance: data?.data.biography['first-appearance'],
				publisher: data?.data.biography.publisher,
				alignment: data?.data.biography.alignment,
				intelligence: data?.data.powerstats.intelligence,
				strength: data?.data.powerstats.strength,
				speed: data?.data.powerstats.speed,
				durability: data?.data.powerstats.durability,
				power: data?.data.powerstats.power,
				combat: data?.data.powerstats.combat,
			});
	}, [data]);

	if (isLoading) {
		return (
			<div className='w-full flex justify-center items-center'>
				<Loader />
			</div>
		);
	}
	return (
		<div>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href='/'>Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink>Superhero</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className='lg:w-3/5 md:w-4/5 flex-col sm:flex-row mx-auto flex gap-x-3'>
				<section className='w-full'>
					<img
						src={data?.data.image.url}
						className='object-cover rounded-md w-full'
					/>
				</section>
				<section className='w-full'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
							<FormField
								control={form.control}
								name='id'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>ID</FormLabel>
										<FormControl>
											<Input placeholder='id' {...field} disabled />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem className='w-full mt-2'>
										<FormLabel>Superhero Name</FormLabel>
										<FormControl>
											<Input
												disabled={user?.data.role === 'USER'}
												placeholder='name'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Accordion type='single' collapsible>
								<AccordionItem value='image'>
									<AccordionTrigger className='text-zinc-700'>
										Image
									</AccordionTrigger>
									<AccordionContent className='px-1'>
										<FormField
											control={form.control}
											name='imageUrl'
											render={({ field }) => (
												<FormItem className='w-full'>
													<FormLabel>Image Url</FormLabel>
													<FormControl>
														<Input
															disabled={user?.data.role === 'USER'}
															placeholder='image url'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</AccordionContent>
								</AccordionItem>
							</Accordion>

							<Accordion type='single' collapsible>
								<AccordionItem value='connections'>
									<AccordionTrigger className='text-zinc-700'>
										Connections
									</AccordionTrigger>
									<AccordionContent className='px-1'>
										<FormField
											control={form.control}
											name='relatives'
											render={({ field }) => (
												<FormItem className='w-full'>
													<FormLabel>Relatives</FormLabel>
													<FormControl>
														<Input
															disabled={user?.data.role === 'USER'}
															placeholder='relatives'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='groupAffiliation'
											render={({ field }) => (
												<FormItem className='w-full mt-2'>
													<FormLabel>Group Affiliation</FormLabel>
													<FormControl>
														<Input
															disabled={user?.data.role === 'USER'}
															placeholder='group affiliation'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</AccordionContent>
								</AccordionItem>
							</Accordion>

							<Accordion type='single' collapsible>
								<AccordionItem value='work'>
									<AccordionTrigger className='text-zinc-700'>
										Work
									</AccordionTrigger>
									<AccordionContent className='px-1'>
										<FormField
											control={form.control}
											name='occupation'
											render={({ field }) => (
												<FormItem className='w-full'>
													<FormLabel>Occupation</FormLabel>
													<FormControl>
														<Input
															disabled={user?.data.role === 'USER'}
															placeholder='occupation'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='base'
											render={({ field }) => (
												<FormItem className='w-full mt-1'>
													<FormLabel>Base</FormLabel>
													<FormControl>
														<Input
															disabled={user?.data.role === 'USER'}
															placeholder='base'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</AccordionContent>
								</AccordionItem>
							</Accordion>

							<Accordion type='single' collapsible>
								<AccordionItem value='appearance'>
									<AccordionTrigger className='text-zinc-700'>
										Appearance
									</AccordionTrigger>
									<AccordionContent className='px-1'>
										<FormField
											control={form.control}
											name='gender'
											render={({ field }) => (
												<FormItem className='w-full'>
													<FormLabel>Gender</FormLabel>
													<FormControl>
														<Input
															disabled={user?.data.role === 'USER'}
															placeholder='gender'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='race'
											render={({ field }) => (
												<FormItem className='w-full mt-2'>
													<FormLabel>Race</FormLabel>
													<FormControl>
														<Input
															disabled={user?.data.role === 'USER'}
															placeholder='race'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<div className='mt-2'>
											<FormLabel>Height</FormLabel>
											<div className='flex gap-x-2 mt-1'>
												<FormField
													control={form.control}
													name='heightCm'
													render={({ field }) => (
														<FormItem className='w-full'>
															<FormControl>
																<Input
																	disabled={user?.data.role === 'USER'}
																	placeholder='height-cm'
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name='heightFt'
													render={({ field }) => (
														<FormItem className='w-full'>
															<FormControl>
																<Input
																	disabled={user?.data.role === 'USER'}
																	placeholder='height-ft'
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
										</div>

										<div className='mt-2'>
											<FormLabel>Weight</FormLabel>
											<div className='flex gap-x-2 mt-1'>
												<FormField
													control={form.control}
													name='weightLb'
													render={({ field }) => (
														<FormItem className='w-full'>
															<FormControl>
																<Input
																	disabled={user?.data.role === 'USER'}
																	placeholder='weight-lb'
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name='weightKg'
													render={({ field }) => (
														<FormItem className='w-full'>
															<FormControl>
																<Input
																	disabled={user?.data.role === 'USER'}
																	placeholder='weight-kg'
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
										</div>

										<FormField
											control={form.control}
											name='eyeColor'
											render={({ field }) => (
												<FormItem className='w-full mt-2'>
													<FormLabel>Eye Color</FormLabel>
													<FormControl>
														<Input
															disabled={user?.data.role === 'USER'}
															placeholder='eye color'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='hairColor'
											render={({ field }) => (
												<FormItem className='w-full mt-2'>
													<FormLabel>Hair Color</FormLabel>
													<FormControl>
														<Input
															disabled={user?.data.role === 'USER'}
															placeholder='hair color'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</AccordionContent>
								</AccordionItem>
							</Accordion>

							<Accordion type='single' collapsible>
								<AccordionItem value='biography'>
									<AccordionTrigger className='text-zinc-700'>
										Biography
									</AccordionTrigger>
									<AccordionContent className='px-1'>
										<FormField
											control={form.control}
											name='fullName'
											render={({ field }) => (
												<FormItem className='w-full'>
													<FormLabel>Full Name</FormLabel>
													<FormControl>
														<Input
															disabled={user?.data.role === 'USER'}
															placeholder='fullName'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='alterEgo'
											render={({ field }) => (
												<FormItem className='w-full mt-2'>
													<FormLabel>Alter Ego</FormLabel>
													<FormControl>
														<Input
															disabled={user?.data.role === 'USER'}
															placeholder='alter ego'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='aliases'
											render={() => (
												<FormItem className='w-full mt-2'>
													<FormLabel>Aliases</FormLabel>
													<div className='space-y-2'>
														{fields.map((field, index) => (
															<div key={field.id} className='flex items-center'>
																<Input
																	disabled={user?.data.role === 'USER'}
																	{...form.register(
																		`aliases.${index}` as const
																	)}
																	placeholder={`Alias ${index + 1}`}
																/>
																<Button
																	type='button'
																	variant='outline'
																	size='sm'
																	onClick={() => remove(index)}
																	className='ml-2'
																	disabled={user?.data.role === 'USER'}
																>
																	Remove
																</Button>
															</div>
														))}
													</div>
													<Button
														type='button'
														variant='outline'
														size='sm'
														onClick={() => append('')}
														className='mt-2'
														disabled={user?.data.role === 'USER'}
													>
														Add Alias
													</Button>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='placeOfBirth'
											render={({ field }) => (
												<FormItem className='w-full mt-2'>
													<FormLabel>Place of Birth</FormLabel>
													<FormControl>
														<Input
															disabled={user?.data.role === 'USER'}
															placeholder='place of birth'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='firstAppearance'
											render={({ field }) => (
												<FormItem className='w-full mt-2'>
													<FormLabel>First Appearance</FormLabel>
													<FormControl>
														<Input
															disabled={user?.data.role === 'USER'}
															placeholder='first appearance'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='publisher'
											render={({ field }) => (
												<FormItem className='w-full mt-2'>
													<FormLabel>Publisher</FormLabel>
													<FormControl>
														<Input
															disabled={user?.data.role === 'USER'}
															placeholder='publisher'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='alignment'
											render={({ field }) => (
												<FormItem className='w-full mt-2'>
													<FormLabel>Alignment</FormLabel>
													<FormControl>
														<Input
															disabled={user?.data.role === 'USER'}
															placeholder='alignment'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</AccordionContent>
								</AccordionItem>
							</Accordion>

							<Accordion type='single' collapsible>
								<AccordionItem value='powerstats'>
									<AccordionTrigger className='text-zinc-700'>
										Powerstats
									</AccordionTrigger>
									<AccordionContent className='px-1'>
										<FormField
											control={form.control}
											name='intelligence'
											render={({ field }) => (
												<FormItem className='w-full'>
													<FormLabel>Intelligence</FormLabel>
													<FormControl>
														<Input
															disabled={user?.data.role === 'USER'}
															placeholder='intelligence'
															type='number'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='strength'
											render={({ field }) => (
												<FormItem className='w-full mt-2'>
													<FormLabel>Strength</FormLabel>
													<FormControl>
														<Input
															disabled={user?.data.role === 'USER'}
															placeholder='strength'
															type='number'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='speed'
											render={({ field }) => (
												<FormItem className='w-full mt-2'>
													<FormLabel>Speed</FormLabel>
													<FormControl>
														<Input
															disabled={user?.data.role === 'USER'}
															placeholder='speed'
															type='number'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='durability'
											render={({ field }) => (
												<FormItem className='w-full mt-2'>
													<FormLabel>Durability</FormLabel>
													<FormControl>
														<Input
															disabled={user?.data.role === 'USER'}
															placeholder='durability'
															type='number'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='power'
											render={({ field }) => (
												<FormItem className='w-full mt-2'>
													<FormLabel>Power</FormLabel>
													<FormControl>
														<Input
															disabled={user?.data.role === 'USER'}
															placeholder='power'
															type='number'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='combat'
											render={({ field }) => (
												<FormItem className='w-full mt-2'>
													<FormLabel>Combat</FormLabel>
													<FormControl>
														<Input
															disabled={user?.data.role === 'USER'}
															placeholder='combat'
															type='number'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
							{user?.data.role === 'ADMIN' && (
								<Button
									type='submit'
									className='w-full'
									disabled={mutation.isPending}
								>
									Submit
								</Button>
							)}
						</form>
					</Form>
				</section>
			</div>
		</div>
	);
}
