<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

## Project rules

- Single landing page at `/` with anchor sections; each section is a component in `src/components/site/` so blocks can be edited independently.
- All copy, prices, services and demo contacts live in `src/data/site.ts` — edit content there, not inside components.
- Booking buttons use `useBooking().openBooking(serviceId?)` (BookingProvider in the index route) to scroll to the form and preselect a service; there is no backend, so the form validates with `src/lib/booking-schema.ts` and shows a "not sent" demo message.
- Photos are CDN assets (`src/assets/*.asset.json`), imported and used via `.url`.
