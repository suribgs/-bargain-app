\# Bargain App — Vendor-Customer Bargaining Platform



A location-based marketplace where customers can discover nearby vendors, browse products, and negotiate prices directly through a bargaining system.



\## Features



\- \*\*Vendor Web App\*\*: Login, manage shop profile, add/edit products, view and respond to customer bargain offers

\- \*\*Customer Mobile App\*\*: Discover nearby vendors by location, browse products, send price offers

\- \*\*Real-time bargaining flow\*\*: Customers propose a price, vendors accept/reject/counter



\## Tech Stack



\- \*\*Frontend (Web)\*\*: React, React Router, Axios

\- \*\*Frontend (Mobile)\*\*: React Native, Expo, React Navigation

\- \*\*Backend\*\*: Node.js, Express.js

\- \*\*Database\*\*: MySQL

\- \*\*Auth\*\*: JWT (JSON Web Tokens)



\## Project Structure



bargain-app/

&#x20; backend/     - Express API server

&#x20; web/         - Vendor web application (React)

&#x20; mobile/      - Customer mobile app (React Native/Expo)

&#x20; database/    - SQL schema



\## Getting Started



\### Backend

cd backend

npm install

npm run dev



\### Web App

cd web

npm install

npm start



\### Mobile App

cd mobile

npm install

npx expo start



\## API Endpoints



| Method | Endpoint | Description |

|--------|----------|-------------|

| POST | /api/auth/register | Register a new user |

| POST | /api/auth/login | Login and receive JWT |

| POST | /api/vendors | Create vendor profile |

| GET | /api/vendors/nearby | Find vendors near a location |

| POST | /api/products | Add a product |

| GET | /api/products/vendor/:vendorId | Get products for a vendor |

| POST | /api/bargains | Send a bargain offer |

| PUT | /api/bargains/:id | Respond to an offer |

| GET | /api/bargains/vendor/:vendorId | View offers for a vendor |



\## Author



Surya M P

