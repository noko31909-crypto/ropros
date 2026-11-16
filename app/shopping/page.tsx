import type { Metadata } from "next";
import { ShoppingCart } from "lucide-react";
import { Container, PageHeader } from "@/components/ui/container";
import { ShoppingList } from "@/components/shopping/shopping-list";
import { getLocale } from "@/lib/i18n/server";
import { workbenchMessages } from "@/lib/i18n/messages/workbench";
import { allGuideSlugs, getGuide, localizeGuide } from "@/lib/guides";
import { toShoppingGuide } from "@/lib/shopping";

export async function generateMetadata(): Promise<Metadata> {
  const t = workbenchMessages[await getLocale()].shop;
  return { title: t.metaTitle, description: t.lead };
}

/** The parts of every guide, in the page's language. Which guides are planned is known only in the browser. */
export default async function ShoppingPage() {
  const locale = await getLocale();
  const t = workbenchMessages[locale].shop;
  const guides = allGuideSlugs().flatMap((slug) => {
    const g = getGuide(slug);
    return g ? [toShoppingGuide(localizeGuide(g, locale))] : [];
  });
  return (
    <>
      <PageHeader eyebrowIcon={<ShoppingCart className="h-5 w-5 text-accent" aria-hidden />} title={t.title} description={t.lead} />
      <Container className="py-10 sm:py-12"><ShoppingList guides={guides} /></Container>
    </>
  );
}
