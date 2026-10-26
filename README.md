# Znakownia — strona www (statyczny build)

Kompletny, gotowy do wdrożenia build strony jednostronicowej znakownia.pl.
Zawiera poprawki z dokumentu „Znakownia poprawki do www" (wrzesień 2026).

## Struktura

```
index.html                 cała strona (HTML + CSS + dane strukturalne schema.org)
assets/                    grafiki usług, hero, logo, og:image
assets/realizacje/         zdjęcia realizacji (cover + galeria + miniatury)
fonts/                     Barlow Condensed, DM Sans, ikony podsez
_astro/                    skrypty: nawigacja/FAQ/formularz + GLightbox
robots.txt, sitemap.xml
.nojekyll                  wymagane dla GitHub Pages (katalog _astro)
```

## Wdrożenie

Statyczny hosting — wgrywasz zawartość katalogu do roota.

**GitHub Pages:** push na `main`, Settings → Pages → Deploy from branch → `main` / `root`.
Plik `.nojekyll` musi zostać, inaczej Pages pominie katalog `_astro`.

## Poprawki z 23.10 („Znakownia.pl — poprawki strony”)

- menu: „Realizacje” jako druga pozycja (desktop i mobile)
- odcięcie od Sezmoo: usunięty „Blog” (sezmoo.com/blog), w stopce tylko credit „Strona: Sezmoo”
- stopka: „O nas” → „Własny warsztat” (sekcja `#o-nas`), czas odpowiedzi 48 godzin wszędzie
- CTA: „Zamów bezpłatną wycenę” (hero, sekcja kontaktu); przycisk w menu zostaje „Wycena”
- formularz: bez emoji i bez zdania o „skierowaniu do właściwej osoby”
- social: ikony ukryte (zakomentowane w HTML, „SOCIAL UKRYTE”), usunięte `sameAs` z schema.org — przywrócić po założeniu profili
- usługi: Ledony „LED IP68”; litery 3D „PCV, styrodur, dibond” (też w sekcji warsztatu); „halo / front” ujednolicone; linki do realizacji przy Ledonach, Kasetonach (Sztuka Kebab) i Wayfindingu (Baltic Towers)
- statystyki: „2–3 tygodnie od akceptacji projektu” i „15 lat doświadczenia” zamiast „3–15 dni” i „3x Trójmiasto”
- FAQ (strona + schema.org): kaseton — sprawdzanie uchwały krajobrazowej przed wyceną; cała realizacja — zwykle 2–3 tygodnie od akceptacji projektu
- portfolio: równe kafle 4:3, nowa kolejność (World of Warships, Baltic Towers, Sante, Dombi / Metalzbyt, Stand Exlantix, Eurostyl, Sztuka Kebab, Kapka Cafe, Lody Insta), usunięty Vcruiser, dodany placeholder Sante
- portfolio: każda galeria otwiera się od zdjęcia z okładki; nowa okładka Sztuki Kebab z widocznym szyldem
- portfolio: pod każdym kaflem `<p class="portfolio-desc"></p>` na 2–3 linijki opisu (puste = niewidoczne); kafle mają `id="realizacja-…"`
- poprawka: usunięte `content-visibility:auto` z sekcji — przez nie linki do sekcji (np. „Zobacz realizacje”) przewijały za daleko

## Wcześniejsze zmiany (wrzesień 2026)

- nowy tekst w hero (własny warsztat, zero podwykonawców)
- kolejność usług 01–09: litery 3D → projekty niestandardowe → ledony → kasetony → wayfinding → wyklejanie folią → naklejki → druk wielkoformatowy → systemy wystawiennicze (również w stopce)
- nowe opisy: wayfinding, naklejki, wyklejanie folią, systemy wystawiennicze
- nowe teksty kroków procesu 01–04
- usunięta marka „Roland" (sekcja warsztatu, tag karty druku, krok 03, dane strukturalne)
- FAQ: 8 nowych pytań, zsynchronizowane ze schema.org FAQPage
- 5 nowych realizacji jako kafelki „ZDJĘCIA WKRÓTCE”

## Do zrobienia

- zdjęcia: Sante, Dombi / Metalzbyt (do końca października), Stand Exlantix, Eurostyl (mockupy), Lody Insta (z Instagrama); po wgraniu zamienić `<div class="portfolio-card ...">` na `<a href="…" class="portfolio-card portfolio-card-project glightbox">` wg wzoru istniejących kafelków
- opisy realizacji (Olga) → wkleić do `<p class="portfolio-desc">` pod kaflem
- dane spółki w stopce i pełna firma w „©” — czeka na KRS/NIP
- polityka prywatności Znakowni — dziś stopka i zgoda w formularzu nadal prowadzą do sezmoo.com/polityka-prywatnosci
- formularz pod szybką wycenę (usługa, lokalizacja, wymiary, zdjęcie, termin) — wymaga zmian w skrypcie i backendzie
- formularz wysyła na `/api/contact` lub `/.netlify/functions/contact` — na GitHub Pages żaden z nich nie istnieje
- formularz kontaktowy używa Cloudflare Turnstile (`data-sitekey` w `index.html`) — klucz produkcyjny musi zgadzać się z domeną
