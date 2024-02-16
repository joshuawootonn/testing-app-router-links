import Link from "next/link";
type Params = { lang: string }

let locales = ['en-US', 'en-FR', 'fr-FR']

export async function generateStaticParams() {
  return locales.map((locale) => ({
    lang: locale,
  }))
}

async function getNewTime(): Promise<Date>{

  return new Promise<Date>((resolve, reject) => {
    setTimeout(() => {
      resolve(new Date());
    }, 1000);
  })
}

export default async  function Home({ params }: { params: Params}) {

  const nextDate = await getNewTime()

  return (
    <main>
      <h1>{params.lang}</h1>
      <h2>{nextDate.toISOString()}</h2>
      <Link href={"/asdf"}>ASDf</Link>
      <ul>
        {locales.map((locale) => (
          <li>
            <Link href={`/${locale}`} locale={locale}>Home at {locale}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
