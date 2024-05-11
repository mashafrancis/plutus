import MarketingHeader from '@/components/layout/marketing-header'
import HighlightColumns from '@/components/sections/highlight-columns'
import { page } from '@/data/home/page'

// export const runtime = 'edge'

export default async function HomePage() {
  // const parsedCity = headers().get('x-vercel-ip-city')
  // const city = !parsedCity || parsedCity === 'null' ? 'Nairobi' : parsedCity
  // const _data = await getWeatherData(city)
  // const [_session, _user] = await Promise.all([getSession(), getUserDetails()])

  return (
    <MarketingHeader
      {...page.heroSection}
      footer={
        <HighlightColumns highlights={page.highlightsSection.highlights} />
      }
    />

    // <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
    //   <div className="hidden h-full bg-slate-100 lg:block" />
    //   <div className={heroStyles.main} />
    //   <RightSection data={data} session={session} />
    //   <div className="hidden md:block lg:p-8">
    //     <div className="mx-auto flex w-full flex-col justify-center space-y-6">
    //       <div className="flex flex-col items-center text-center">
    //         <Icons.logo className="mx-auto h-14 w-14" />
    //         <h1 className="text-3xl font-bold">Plutus</h1>
    //         <h4 className="my-6 text-slate-500 dark:text-slate-400">
    //           Track and manage your expenses with ease.
    //         </h4>
    //
    //         {session ? (
    //           <Link href={user ? '/app' : '/onboarding'}>
    //             <Button className="mt-6" size="lg">
    //               Manage you expenses
    //               <ArrowIcon direction="right" />
    //             </Button>
    //           </Link>
    //         ) : (
    //           <LoginButton />
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}
