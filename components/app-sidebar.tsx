import Image from 'next/image';
import Link from 'next/link';
import { getSession } from '@/auth/server';
import { MainMenu } from '@/components/main-menu';
import { NavUser } from '@/components/nav-user';

const logoImage = '/logo.svg';

export async function Sidebar() {
  const session = await getSession();

  const user = {
    name: session?.user.name as string,
    email: session?.user?.email as string,
    avatar: session?.user?.image as string,
  };

  return (
    <aside className="fixed top-0 hidden h-screen w-[70px] flex-shrink-0 flex-col items-center justify-between border-border border-r pb-4 md:flex">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex size-[70px] items-center justify-center border-border border-b">
          <Link href="/">
            <Image
              alt="Plutus"
              className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground"
              height={22}
              src={logoImage}
              width={22}
            />
          </Link>
        </div>

        <MainMenu />
      </div>

      {session ? <NavUser user={user} /> : 'No user'}
    </aside>
    // <Sidebar variant="inset" {...props}>
    //   <SidebarHeader>
    //     <SidebarMenu>
    //       <SidebarMenuItem>
    //         <SidebarMenuButton asChild size="lg">
    //           <Link href="/" prefetch>
    //             <Image
    //               alt="Safaricom"
    //               className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground"
    //               height={22}
    //               src={logoImage}
    //               width={22}
    //             />
    //             <div className="grid flex-1 text-left text-sm leading-tight">
    //               <span className="truncate font-medium">Plutus</span>
    //               <span className="truncate text-muted-foreground text-xs">
    //                 Personal finances
    //               </span>
    //             </div>
    //           </Link>
    //         </SidebarMenuButton>
    //       </SidebarMenuItem>
    //     </SidebarMenu>
    //   </SidebarHeader>
    //   <SidebarContent>
    //     <NavMain items={data.navMain} />
    //     <NavSecondary className="mt-auto" items={data.navSecondary} />
    //   </SidebarContent>
    //   <SidebarFooter>
    //     {session ? <NavUser user={user} /> : 'No user'}
    //   </SidebarFooter>
    // </Sidebar>
  );
}
