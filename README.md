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

## Co zmieniono w tej wersji

- nowy tekst w hero (własny warsztat, zero podwykonawców)
- kolejność usług 01–09: litery 3D → projekty niestandardowe → ledony → kasetony → wayfinding → wyklejanie folią → naklejki → druk wielkoformatowy → systemy wystawiennicze (również w stopce)
- nowe opisy: wayfinding, naklejki, wyklejanie folią, systemy wystawiennicze
- nowe teksty kroków procesu 01–04
- usunięta marka „Roland" (sekcja warsztatu, tag karty druku, krok 03, dane strukturalne)
- FAQ: 8 nowych pytań, zsynchronizowane ze schema.org FAQPage
- kafelek statystyk: 3–15 dni roboczych
- 5 nowych realizacji jako kafelki „ZDJĘCIA WKRÓTCE" (Tabliczki Eurostyl, Dombi / Metalzbyt, Vcruiser, Lody Insta, Stand Exlantix) — do podmiany po sesji zdjęciowej

## Do zrobienia

- zdjęcia do 5 realizacji powyżej; po wgraniu zamienić `<div class="portfolio-card ...">` na `<a href="…" class="portfolio-card portfolio-card-project glightbox">` wg wzoru istniejących kafelków
- formularz kontaktowy używa Cloudflare Turnstile (`data-sitekey` w `index.html`) — klucz produkcyjny musi zgadzać się z domeną
