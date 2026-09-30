<!-- PROJECT LOGO OR BANNER -->
<br />
<div align="center">
  <a href="https://github.com/MGuyF/Bus-Driver-FullStack">
    <img src="busdriver-app/src/assets/images/busDRIVER_logo.png" alt="BusDriver logo" width="80" height="80">
  </a>

  <h3 align="center">BusDriver — Full-Stack Bus &amp; Tour Management</h3>

  <p align="center">
    A full-stack platform to register bus drivers and plan, assign and review their tours.
    <br />
    <a href="https://github.com/MGuyF/Bus-Driver-FullStack/issues/new?labels=bug">Report Bug</a>
    ·
    <a href="https://github.com/MGuyF/Bus-Driver-FullStack/issues/new?labels=enhancement">Request Feature</a>
    ·
    <a href="https://bus-driver-full-stack.vercel.app/">View Live Demo</a>
  </p>
</div>

<!-- BADGES -->
<div align="center">

[![License][license-shield]][license-url]
[![GitHub Issues][issues-shield]][issues-url]
[![Live Demo][demo-shield]][demo-url]
[![API][api-shield]][api-url]

</div>

---

### About The Project

BusDriver helps transport operators keep their fleet organised in one place. It stores each driver's
profile (contact details, licence, bus and employment information) and lets you schedule the tours they
run, then review the full history. Authentication is JWT-based, and every record is scoped to its owner.

**Demo account:** `demo@busdriver.com` / `Demo123456&78` — records created with it are automatically
deleted after 30 minutes.

#### Built With

* [![Django][django-shield]][django-url]
* [![Django REST Framework][drf-shield]][drf-url]
* [![React][react-shield]][react-url]
* [![Material UI][mui-shield]][mui-url]

---

### Getting Started

#### Prerequisites

* Python 3.10+
* Node.js 18+ (20 recommended)
* PostgreSQL (optional — SQLite is used by default)

```sh
python --version
node --version
```

#### Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/MGuyF/Bus-Driver-FullStack.git
   cd Bus-Driver-FullStack
   ```
2. Install and migrate the backend:
   ```sh
   cd backend
   python -m venv ../venv
   source ../venv/bin/activate   # Windows: ..\venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py createcachetable
   ```
3. Install the frontend dependencies:
   ```sh
   cd ../busdriver-app
   npm install
   ```
4. Configure your local environment variables in a `.env` file:
   ```env
   # backend/.env
   DJANGO_DEBUG=True
   DATABASE_URL="postgres://postgres:public@localhost:5432/busdriver"  # optional

   # busdriver-app/.env.local
   REACT_APP_API_URL=http://localhost:8000/api
   ```
5. Start the backend and the frontend (two terminals):
   ```sh
   cd backend && python manage.py runserver        # http://localhost:8000
   cd busdriver-app && npm start                   # http://localhost:3000
   ```

---

### Usage

```javascript
// Log in to obtain a JWT, then list the drivers
const { access } = await fetch("http://localhost:8000/api/auth/login/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username: "demo@busdriver.com", password: "Demo123456&78" }),
}).then((res) => res.json());

const drivers = await fetch("http://localhost:8000/api/busdrivers/", {
  headers: { Authorization: `Bearer ${access}` },
}).then((res) => res.json());
```

_For the full endpoint list, see the [API root](https://bus-driver-fullstack.onrender.com/api/)._

---

### Roadmap

- [x] JWT authentication with email-based login
- [x] Bus driver management (create, list, search, view, edit)
- [x] Tour planning and history
- [x] Automatic cleanup of demo data


---

### Contributing

This project is a personal showcase and its source is **not open for code contributions**. The
[License](#license) reserves all rights, so forking or modifying the code is not permitted.

Feedback is still welcome:

1. Found a bug or unexpected behaviour? [Open an issue](https://github.com/MGuyF/Bus-Driver-FullStack/issues/new?labels=bug).
2. Have an idea or suggestion? [Request a feature](https://github.com/MGuyF/Bus-Driver-FullStack/issues/new?labels=enhancement).
3. Please report issues only — pull requests containing code changes will not be accepted.

---

### License

Copyright © 2026 MGuyF. All rights reserved.
This project is for personal showcase only. Unauthorized copying or modification of this code is strictly prohibited.

---

### Contact

MGuyF - [@MGuyF](https://github.com/MGuyF) - 2000291gf@gmail.com

Project Link: [https://github.com/MGuyF/Bus-Driver-FullStack](https://github.com/MGuyF/Bus-Driver-FullStack)

<!-- MARKDOWN LINK & BADGE REFERENCES -->
[license-shield]: https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge
[license-url]: https://github.com/MGuyF/Bus-Driver-FullStack#license
[issues-shield]: https://img.shields.io/github/issues/MGuyF/Bus-Driver-FullStack?style=for-the-badge
[issues-url]: https://github.com/MGuyF/Bus-Driver-FullStack/issues
[demo-shield]: https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel
[demo-url]: https://bus-driver-full-stack.vercel.app/
[api-shield]: https://img.shields.io/badge/API-Render-46E3B7?style=for-the-badge&logo=render
[api-url]: https://bus-driver-fullstack.onrender.com/
[django-shield]: https://img.shields.io/badge/Django_5.2-092E20?style=for-the-badge&logo=django&logoColor=white
[django-url]: https://www.djangoproject.com/
[drf-shield]: https://img.shields.io/badge/Django_REST_Framework-A30000?style=for-the-badge&logo=django&logoColor=white
[drf-url]: https://www.django-rest-framework.org/
[react-shield]: https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black
[react-url]: https://react.dev/
[mui-shield]: https://img.shields.io/badge/MUI_6-007FFF?style=for-the-badge&logo=mui&logoColor=white
[mui-url]: https://mui.com/
