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

- Keep customer and operations screens in a shared route experience with role-filtered data; this follows the connected-workspace presentation while keeping signed-out demonstration records separate from private cases.
- Keep all LC documents in a private bucket scoped to application IDs; trade documents must never be publicly addressable.
- Use separate user_roles and database-enforced decision functions for staff privileges; UI labels alone must not authorize trade decisions.
- Keep uploaded-document processing behind a server-side adapter; demo processing labels form-derived fields explicitly and never claims OCR inference.
