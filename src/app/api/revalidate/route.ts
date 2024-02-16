import {revalidatePath} from "next/cache";
import {NextResponse} from "next/server";
import {locales} from "@/middleware";

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request) {
  console.log('revalidating /')

  const localizedPages = locales.map((locale) => {

    revalidatePath(`/${locale}`)

    return { locale, path: `/${locale}` }
  })
  return Response.json(localizedPages)
}
