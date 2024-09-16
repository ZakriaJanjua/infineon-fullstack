import { useUser } from '@/query/hooks/useUser';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { logout } from '@/lib/utils';
import { useNavigate } from 'react-router';

export function Header() {
	const { data } = useUser();
	const navigate = useNavigate();
	return (
		<div className='bg-zinc-800 p-3 text-zinc-50 flex justify-between items-center mb-4'>
			<div>
				<span>
					Hello <span className='font-bold'>{data?.data.email}</span>
				</span>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<HamburgerMenuIcon />
				</DropdownMenuTrigger>
				<DropdownMenuContent className='mr-10'>
					<DropdownMenuLabel>{data?.data.role} role</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => navigate('/team')}>
						Team
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
