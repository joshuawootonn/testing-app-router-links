import Link from "next/link";


type Params = { lang: string }

let locales = ['en-US', 'en-FR', 'fr-FR']


export async function generateStaticParams() {
  return locales.map((locale) => ({
    lang: locale,
  }))
}

export default function Home({ params }: { params: Params}) {

  return (
    <main>
      <h1>{params.lang}</h1>
     <ul>
       {locales.map((locale) => (
         <li>
           <Link href={"/"} locale={locale}>Home at {locale}</Link>
         </li>
       ))}
     </ul>
    </main>
  );
}
