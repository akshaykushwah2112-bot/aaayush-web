# Style Structure Studio Backend

This backend is designed specifically for the existing premium architecture and interior design studio website. It supports lead generation, consultant booking, admin review, and WhatsApp-based contact workflows without adding unnecessary features.

## What the frontend actually needs

From the existing frontend, the website already has:

- Portfolio/project browsing on the portfolio page and project sections
- CTA buttons that open WhatsApp or call the studio
- A contact page with direct contact actions
- Consultation CTA blocks that invite visitors to book a consultation
- Package/service sections that encourage enquiry

The backend therefore only needs to support:

1. Enquiry submissions from site visitors
2. Consultation/appointment requests
3. Admin login and read-only management of records
4. WhatsApp redirect links and configurable WhatsApp number
5. Basic spam protection and rate limiting

No CMS, e-commerce, account system, or public registration is required.

## Backend stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT authentication
- Zod validation
- Rate limiting and security middleware

This is the simplest production-appropriate stack for a lead-gen architecture site and avoids unnecessary complexity.

## Database schema

The schema contains:

- `Admin`: secure admin login records
- `Enquiry`: leads submitted from the site
- `Appointment`: consultation booking requests and status tracking

Supported enums:

- `ContactMethod`: `WHATSAPP`, `PHONE`, `EMAIL`
- `ProjectType`: `ARCHITECTURE`, `INTERIOR`, `COMMERCIAL`, `RESIDENTIAL`, `RENOVATION`, `LANDSCAPE`, `OTHER`
- `AppointmentStatus`: `PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`

See [backend/prisma/schema.prisma](prisma/schema.prisma) for the full schema.

## Environment variables

Copy [.env.example](.env.example) to `.env` and configure these values:

```bash
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/style_structure_studio?schema=public"
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@stylestructurestudio.com
ADMIN_PASSWORD=ChangeThisStrongPassword123!
ADMIN_NAME="Style Structure Studio Admin"
WHATSAPP_NUMBER=917987836849
EMAIL_PROVIDER=none
RESEND_API_KEY=
MAIL_FROM=no-reply@yourdomain.com
```

## API documentation

### POST /api/enquiries

Submit a lead enquiry.

Request body:

```json
{
  "name": "Amit Sharma",
  "phone": "+91 9876543210",
  "email": "amit@example.com",
  "projectType": "INTERIOR",
  "message": "We want to design a 3BHK apartment with a warm minimal palette.",
  "preferredContactMethod": "WHATSAPP"
}
```

Response:

```json
{
  "success": true,
  "message": "Enquiry submitted successfully",
  "data": { "id": "..." },
  "whatsappLink": "https://wa.me/917987836849?text=..."
}
```

### POST /api/appointments

Submit a consultation booking request.

Request body:

```json
{
  "name": "Ritika Verma",
  "phone": "+91 9876543210",
  "email": "ritika@example.com",
  "preferredDate": "2026-09-15",
  "preferredTime": "17:00",
  "projectType": "ARCHITECTURE",
  "message": "We want to discuss a villa concept."
}
```

### POST /api/admin/login

Admin login.

Request body:

```json
{
  "email": "admin@stylestructurestudio.com",
  "password": "ChangeThisStrongPassword123!"
}
```

Response includes a JWT token.

### GET /api/admin/enquiries

Requires admin JWT bearer token.

### GET /api/admin/appointments

Requires admin JWT bearer token.

### PATCH /api/admin/appointments/:id/status

Update the appointment status. Allowed values:

- `PENDING`
- `CONFIRMED`
- `CANCELLED`
- `COMPLETED`

### DELETE /api/admin/enquiries/:id

Delete a spam or unwanted enquiry.

## Local development instructions

1. Install PostgreSQL locally or use a managed DB.
2. Create a database called `style_structure_studio`.
3. In the backend folder, copy `.env.example` to `.env` and update credentials.
4. Run:

```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run seed:admin
npm run dev
```

The API will run at:

```text
http://localhost:4000
```

## PostgreSQL setup and migration

Run the database migration from the backend folder:

```bash
npx prisma migrate dev --name init
```

To deploy migrations in production:

```bash
npx prisma migrate deploy
```

To inspect the database:

```bash
npx prisma studio
```

## Production deployment

Recommended deployment pattern:

- Backend: Render, Railway, or Vercel Node server
- Database: Neon or Supabase PostgreSQL

### For Render / Railway

1. Deploy the `backend` folder as a Node app.
2. Set the environment variables from `.env.example`.
3. Ensure `DATABASE_URL` points to your managed Postgres instance.
4. Run migration command in the deployment environment:

```bash
npx prisma migrate deploy
```

### For Vercel

Use Vercel for the frontend and deploy the backend separately to a Node-compatible host. Keep the database on Neon/Supabase and store secrets in environment variables only.

## Exact frontend changes required to connect the existing site

The frontend already has CTA and contact patterns. To connect the backend with the least disruption:

1. Add a contact form on the contact page or a lightweight modal that submits to `POST /api/enquiries`.
2. Add a consultation form on the consultation CTA flow that submits to `POST /api/appointments`.
3. Keep the existing WhatsApp and call buttons as primary UX; add a fallback API-based submission for users who prefer the form flow.
4. Do not redesign the existing styling or page layout.
5. Keep the WhatsApp number in environment config, not in the frontend.
6. Use the backend response `whatsappLink` to redirect after successful form submission when desired.

This keeps the current design intact while enabling the lead-generation workflow.

## Security notes

The backend includes:

- input validation with Zod
- rate limiting for public forms
- password hashing with bcrypt
- JWT authentication middleware
- CORS configuration
- environment-based secrets
- spam detection heuristics for obvious junk submissions
- Prisma parameterized queries to avoid SQL injection risk

## Important implementation note

The project is intentionally minimal and production-safe for a design studio website. It does not include payments, customer accounts, or a CMS because those are outside the business objective described by the existing frontend.
