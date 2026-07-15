# IRICA Frontend (React + Vite + Tailwind + Axios)

This is the complete React frontend. It expects a Django REST API running
at the address set in `.env` (`VITE_API_URL`).

## How to run

```bash
npm install
npm run dev
```

## ⚠️ Important: the exact API your Django backend must provide

This frontend was built assuming specific endpoint shapes. Match these on
the Django side (or adjust the frontend calls to match yours).

### Auth (`accounts` app)

| Endpoint | Method | Body | Response |
|---|---|---|---|
| `/auth/login/` | POST | `{ email, password }` | `{ access, refresh }` |
| `/auth/refresh/` | POST | `{ refresh }` | `{ access }` |
| `/auth/profile/` | GET | — (JWT header) | `{ full_name, email, phone_number, is_staff }` |
| `/auth/profile/` | PATCH | `{ full_name?, email?, phone_number? }` | updated profile |
| `/auth/change-password/` | POST | `{ old_password, new_password }` | `{ detail: "..." }` |

**Note:** simplejwt's default login expects `username`, not `email`. Either:
- set `USERNAME_FIELD = "email"` on your custom User model, OR
- write a custom login serializer that accepts `email` instead of `username`

### Materials (`materials` app)

| Endpoint | Method | Auth required? | Response |
|---|---|---|---|
| `/materials/public/` | GET | No | Preview only: `{ id, title, description, material_type }` (NO file/url) |
| `/materials/` | GET | Yes | Full list; `file`/`url` fields ONLY included if subscription is active |

### Admin — Materials CRUD (`materials` app, is_staff only)

The admin pages reuse the SAME `/materials/` endpoints as the dashboard,
just with more HTTP methods. Your Django view should allow these methods
ONLY when `request.user.is_staff` is true:

| Endpoint | Method | Auth required? | Body | Response |
|---|---|---|---|---|
| `/materials/` | POST | Yes (is_staff) | multipart: `title, description, material_type, thumbnail?, file?, url?` | created material |
| `/materials/:id/` | GET | Yes | — | single material |
| `/materials/:id/` | PATCH | Yes (is_staff) | multipart, same fields (all optional) | updated material |
| `/materials/:id/` | DELETE | Yes (is_staff) | — | 204 No Content |

**Important:** these requests send `multipart/form-data` (because of the file
uploads), NOT `application/json`. Django REST Framework's `ModelViewSet` +
`MultiPartParser` handles this automatically if your `Material` model uses
`ImageField`/`FileField` — no extra frontend work needed, axios detects the
`FormData` object and sets the right `Content-Type` header itself.

A DRF `ModelViewSet` with `permission_classes` checking `is_staff` for
write methods (and `IsAuthenticated` for read) covers this whole table in
one view class — no need for 4 separate view functions.

### Payments (`payments` app)

| Endpoint | Method | Auth required? | Body | Response |
|---|---|---|---|---|
| `/payments/initiate/` | POST | No | `{ full_name, email, phone_number }` | `{ checkout_url }` |
| `/payments/renew/` | POST | Yes | — | `{ checkout_url }` |
| `/payments/webhook/` | POST | No (Afripay calls this) | Afripay's payload | `{ received: true }` |

### Subscriptions (`subscriptions` app)

| Endpoint | Method | Auth required? | Response |
|---|---|---|---|
| `/subscriptions/me/` | GET | Yes | `{ is_active, expires_at }` |

---

## Folder structure

```
src/
├── api/
│   └── axiosClient.js        ← base URL + JWT auto-attach + auto-refresh
├── hooks/
│   ├── useAuth.jsx            ← login state, shared app-wide via Context
│   └── useFetch.js            ← reusable GET-with-loading/error hook
├── utils/
│   ├── formHandlers.js
│   └── getErrorMessage.js
├── components/
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx      ← blocks /dashboard/* routes if not logged in
│   ├── AdminRoute.jsx           ← blocks /admin/* routes if not is_staff
│   ├── MaterialCard.jsx
│   ├── Loader.jsx
│   ├── ErrorMessage.jsx
│   └── SuccessMessage.jsx
├── pages/
│   ├── Layout.jsx
│   ├── Home.jsx
│   ├── MaterialsPreview.jsx    ← public, locked previews
│   ├── Checkout.jsx             ← payment form = registration
│   ├── PaymentSuccess.jsx       ← where Afripay redirects back to
│   ├── Login.jsx
│   ├── NotFound.jsx
│   ├── Dashboard/
│   │   ├── DashboardLayout.jsx  ← sidebar nav
│   │   ├── Profile.jsx           ← view/edit + change password
│   │   ├── Materials.jsx         ← unlocked content
│   │   └── Subscription.jsx      ← status + renew button
│   └── Admin/
│       ├── AdminLayout.jsx       ← admin sidebar nav
│       ├── AdminMaterialsList.jsx ← list, with edit/delete
│       └── AdminMaterialForm.jsx  ← ONE form used for both create AND edit
├── App.jsx                     ← route map
└── main.jsx                    ← BrowserRouter + AuthProvider wrap
```

## The flow this frontend expects

1. Visitor browses `/materials` (public, locked previews)
2. Clicks Subscribe → `/checkout` → fills name/email/phone → POST `/payments/initiate/`
3. Redirected to Afripay's hosted payment page (the `checkout_url` Django returns)
4. After paying, Afripay redirects the browser to `/payment-success`
5. **Separately**, Afripay calls your Django webhook server-to-server — THIS is what
   actually creates the account, subscription, and sends the credentials email.
   The browser redirect and the webhook are two different things happening around
   the same time — don't create the account based on the browser redirect alone,
   since that can be faked by anyone just visiting the URL.
6. User checks email, gets credentials, goes to `/login`
7. Once logged in, `/dashboard/materials`, `/dashboard/profile`, `/dashboard/subscription`
   all become available (guarded by `ProtectedRoute`)

## Still to customize

- Replace `full_name`/`email`/`phone_number` field names if your Django serializers differ
- Adjust `/auth/login/` body if you use `username` instead of `email`
- Style the Afripay redirect / success flow once you know their exact response shape
- Add a "forgot password" page once your Django reset-password endpoint is ready
